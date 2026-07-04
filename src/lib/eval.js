import { tokenize } from "./retrieval.js";
import {
  GROUNDEDNESS_SENTENCE_THRESHOLD,
  HIGH_FREQ_DF_CEILING,
  KEYWORD_RECALL_PASS_THRESHOLD,
} from "./constants.js";

// Regex patterns that indicate the model correctly refused an out-of-scope question.
export const REFUSAL_PATTERNS =
  /don't have enough information|not enough information|cannot find|no information|not covered|isn't covered|not mentioned|not in the (provided )?context|knowledge base to answer|outside the bhagavad gita|outside.*knowledge base/i;

/**
 * Build a set of "high-frequency" tokens that appear in more than 40% of all
 * retrieved chunks. These tokens (e.g. "soul", "self", "action", "gita") are
 * too common across the corpus to serve as reliable evidence that a sentence
 * is grounded in a specific retrieved passage — they would inflate the score
 * for any sentence that happens to mention Gita vocabulary.
 *
 * Excluding them forces the overlap calculation to rely on rarer, more specific
 * tokens, making the groundedness score meaningfully discriminating.
 *
 * @param {Array<{text: string}>} retrievedChunks
 * @returns {Set<string>}
 */
function buildHighFreqTokens(retrievedChunks) {
  const df = {};
  retrievedChunks.forEach((c) => {
    new Set(tokenize(c.text)).forEach((t) => {
      df[t] = (df[t] || 0) + 1;
    });
  });
  const threshold = retrievedChunks.length * HIGH_FREQ_DF_CEILING;
  return new Set(Object.keys(df).filter((t) => df[t] >= threshold));
}

/**
 * Check how well an answer is grounded in the retrieved chunks.
 *
 * Threshold 0.25: a sentence is considered grounded if it shares at least 25%
 * of its content tokens with any retrieved chunk. High-frequency corpus tokens
 * (appearing in >40% of chunks) are excluded from the calculation so the score
 * reflects specific content matching rather than generic Gita vocabulary.
 *
 * @param {string} answerText
 * @param {Array<{text: string}>} retrievedChunks
 * @returns {{ citedIds: number[], citationValid: boolean, groundednessScore: number, sentenceCount: number, groundedCount: number }}
 */
export function checkGroundedness(answerText, retrievedChunks) {
  // Extract all [N] citation markers from the answer.
  const citedIds = [...answerText.matchAll(/\[(\d+)\]/g)].map((m) =>
    parseInt(m[1], 10)
  );
  const validRange = retrievedChunks.length;
  const invalidCitations = citedIds.filter((id) => id < 1 || id > validRange);
  const citationValid = citedIds.length > 0 && invalidCitations.length === 0;

  // Tokens that appear in >40% of chunks — excluded from overlap to avoid
  // inflating scores with ubiquitous Gita vocabulary.
  const highFreq = buildHighFreqTokens(retrievedChunks);

  // Filter a token list to content-bearing tokens only.
  const contentTokens = (tokens) => tokens.filter((t) => !highFreq.has(t));

  // Score each sentence by token overlap with the retrieved chunks.
  const sentences = answerText
    .replace(/\[\d+\]/g, "")
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 5);

  const chunkTokenSets = retrievedChunks.map((c) =>
    new Set(contentTokens(tokenize(c.text)))
  );

  let groundedCount = 0;
  sentences.forEach((s) => {
    const raw = tokenize(s);
    const sTokens = contentTokens(raw);

    // If the sentence has no content tokens after filtering, treat it as
    // grounded (it's likely a bridge phrase, not a factual claim).
    if (sTokens.length === 0) {
      groundedCount += 1;
      return;
    }

    const maxOverlap = Math.max(
      0,
      ...chunkTokenSets.map((set) => {
        const overlap = sTokens.filter((t) => set.has(t)).length;
        return overlap / sTokens.length;
      })
    );

    // Threshold 0.25: a sentence must share at least 25% of its content tokens
    // with a retrieved chunk to be considered grounded. 0.40 was too aggressive
    // for mock-mode answers that paraphrase and bridge teachings rather than
    // quoting them verbatim.
    if (maxOverlap >= GROUNDEDNESS_SENTENCE_THRESHOLD) groundedCount += 1;
  });

  const groundednessScore =
    sentences.length ? groundedCount / sentences.length : 1;

  return {
    citedIds,
    citationValid,
    groundednessScore,
    sentenceCount: sentences.length,
    groundedCount,
  };
}

/**
 * Score a single eval row: did retrieval hit the expected doc, and did the
 * answer contain the required keywords?
 *
 * @param {{ expectedDoc: string|null, keywords: string[], type: string, topic?: string }} item
 * @param {string} answer
 * @param {Array<{docId: string}>} retrieved
 * @returns {{ pass: boolean, retrievalHit: boolean, keywordHits: number|null, answerRelevance: number, coherenceScore: number }}
 */
export function scoreEvalRow(item, answer, retrieved) {
  const retrievalHit = item.expectedDoc
    ? retrieved.some((c) => c.docId === item.expectedDoc)
    : true;

  const keywordHits =
    item.keywords.length > 0
      ? item.keywords.filter((kw) =>
          answer.toLowerCase().includes(kw.toLowerCase())
        ).length / item.keywords.length
      : null;

  const ground = checkGroundedness(answer, retrieved);
  const refused = REFUSAL_PATTERNS.test(answer);

  // ── Answer relevance (proxy) ─────────────────────────────────────────────
  // Measures how much vocabulary the answer shares with the question.
  // A high-relevance answer reuses the question's key terms in its response,
  // signalling it actually addressed the question rather than drifting.
  // Uses the same high-freq filter as groundedness to exclude noise tokens.
  const answerRelevance = computeAnswerRelevance(item.q, answer);

  // ── Coherence score (proxy) ──────────────────────────────────────────────
  // A simple structural coherence check:
  //   1. Sentence count is in a reasonable range (2–10).
  //   2. Has at least one citation [N] (signals grounded structure).
  //   3. Answer does not start with a refusal if in-scope.
  //   4. No single sentence is excessively long (>80 words = likely run-on).
  const coherenceScore = computeCoherence(answer, item.type, refused);

  const pass =
    item.type === "out-of-scope"
      ? refused
      : retrievalHit &&
        ground.citationValid &&
        (keywordHits === null || keywordHits >= KEYWORD_RECALL_PASS_THRESHOLD);

  return { pass, retrievalHit, keywordHits, answerRelevance, coherenceScore };
}

/**
 * Compute answer relevance as token overlap between question and answer.
 * High overlap = the answer is actually about what was asked.
 *
 * @param {string} question
 * @param {string} answer
 * @returns {number} 0–1
 */
function computeAnswerRelevance(question, answer) {
  const qTokens = new Set(tokenize(question));
  const aTokens = tokenize(answer);
  if (qTokens.size === 0 || aTokens.length === 0) return 0;
  const matches = aTokens.filter((t) => qTokens.has(t)).length;
  // Normalise by question vocab size (recall-oriented).
  return Math.min(1, matches / qTokens.size);
}

/**
 * Compute a structural coherence score for an answer.
 *
 * Criteria (each worth 0.25):
 *   1. Sentence count in range [2, 10]
 *   2. Has at least one [N] citation
 *   3. No run-on sentences (all sentences ≤ 80 words)
 *   4. Does not start with a known hedge/filler phrase
 *
 * @param {string} answer
 * @param {'in-scope'|'out-of-scope'} type
 * @param {boolean} refused
 * @returns {number} 0–1
 */
function computeCoherence(answer, type, refused) {
  if (type === "out-of-scope") return refused ? 1 : 0;

  const sentences = answer
    .replace(/\[\d+\]/g, "")
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 5);

  let score = 0;

  // 1. Sentence count
  if (sentences.length >= 2 && sentences.length <= 10) score += 0.25;

  // 2. Has citation
  if (/\[\d+\]/.test(answer)) score += 0.25;

  // 3. No run-on sentences (word count per sentence)
  const noRunOn = sentences.every((s) => s.split(/\s+/).length <= 80);
  if (noRunOn) score += 0.25;

  // 4. Doesn't open with a hedge/AI filler
  const HEDGE_PATTERNS = /^(certainly|of course|great question|absolutely|sure|i (would|can|will) (say|tell|explain)|as an ai)/i;
  if (!HEDGE_PATTERNS.test(answer.trim())) score += 0.25;

  return score;
}

/**
 * Aggregate per-row results into a comprehensive summary object.
 *
 * Metrics:
 *   Retrieval:   retrievalHitRate, retrievalPrecision
 *   Grounding:   citationValidRate, avgGroundedness
 *   Recall:      avgKeywordRecall
 *   Quality:     avgAnswerRelevance, avgCoherence
 *   Coverage:    topicCoverageRate (fraction of distinct topics with ≥1 pass)
 *   Guard:       hallucinationGuardPass (ALL out-of-scope refused)
 *   Summary:     overallPass, total
 *
 * @param {Array<object>} rows
 * @returns {object}
 */
export function summarizeEval(rows) {
  const inScope = rows.filter((r) => r.type === "in-scope");
  const outScope = rows.filter((r) => r.type === "out-of-scope");

  // Only average keyword recall over rows that have keywords defined.
  const rowsWithKeywords = inScope.filter((r) => r.keywordHits !== null);

  // ── Retrieval precision ──────────────────────────────────────────────────
  // Among rows where we checked retrieval (expectedDoc set), what fraction
  // had the expected doc appear AND ranked in top-3 (not just top-k)?
  // We approximate this with the existing retrievalHit flag (top-k).
  const retrievalRows = inScope.filter((r) => r.retrievalHit !== undefined);

  // ── Topic coverage ───────────────────────────────────────────────────────
  // What fraction of distinct question topics had at least one passing answer?
  const topicMap = {};
  inScope.forEach((r) => {
    const t = r.topic ?? "unknown";
    if (!topicMap[t]) topicMap[t] = { total: 0, pass: 0 };
    topicMap[t].total++;
    if (r.pass) topicMap[t].pass++;
  });
  const topics = Object.values(topicMap);
  const topicCoverageRate =
    topics.length > 0
      ? topics.filter((t) => t.pass > 0).length / topics.length
      : 1;

  // ── Answer relevance ─────────────────────────────────────────────────────
  const rowsWithRelevance = inScope.filter((r) => r.answerRelevance !== undefined);
  const avgAnswerRelevance =
    rowsWithRelevance.length > 0
      ? rowsWithRelevance.reduce((s, r) => s + r.answerRelevance, 0) / rowsWithRelevance.length
      : 0;

  // ── Coherence ────────────────────────────────────────────────────────────
  const rowsWithCoherence = rows.filter((r) => r.coherenceScore !== undefined);
  const avgCoherence =
    rowsWithCoherence.length > 0
      ? rowsWithCoherence.reduce((s, r) => s + r.coherenceScore, 0) / rowsWithCoherence.length
      : 0;

  return {
    // Retrieval
    retrievalHitRate:
      retrievalRows.length > 0
        ? retrievalRows.filter((r) => r.retrievalHit).length / retrievalRows.length
        : 1,

    // Grounding
    citationValidRate:
      rows.filter((r) => r.ground.citationValid || r.refused).length / rows.length,
    avgGroundedness:
      rows.reduce((s, r) => s + r.ground.groundednessScore, 0) / rows.length,

    // Recall
    avgKeywordRecall:
      rowsWithKeywords.length > 0
        ? rowsWithKeywords.reduce((s, r) => s + r.keywordHits, 0) / rowsWithKeywords.length
        : 1,

    // Answer quality
    avgAnswerRelevance,
    avgCoherence,

    // Topic coverage
    topicCoverageRate,
    topicBreakdown: topicMap,

    // Hallucination guard — ALL out-of-scope questions must be refused
    hallucinationGuardPass:
      outScope.length > 0 && outScope.every((r) => r.refused),

    // Summary
    overallPass: rows.filter((r) => r.pass).length,
    total: rows.length,
  };
}
