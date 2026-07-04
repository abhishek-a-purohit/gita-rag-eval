import {
  TOP_K,
  WINDOW_SIZE,
  STRIDE,
  RELEVANCE_THRESHOLD,
  BM25_K1,
  BM25_B,
} from "./constants.js";

// ─── RRF constant ─────────────────────────────────────────────────────────────
//
// Reciprocal Rank Fusion (RRF) merges two ranked lists without needing
// normalised scores. For a chunk ranked at position r in a list:
//   rrf_score = 1 / (RRF_K + r)
// Summing this across TF-IDF and BM25 lists rewards chunks that rank high
// in BOTH scorers, which is a reliable signal of genuine relevance.
// RRF_K = 60 is the widely-used default (Cormack et al., 2009).
const RRF_K = 60;

// ─── Query expansion map ──────────────────────────────────────────────────────
//
// Short, emotional, or conversational queries often contain zero terms that
// appear verbatim in the KB. Query expansion appends synonym/intent tokens
// BEFORE scoring so TF-IDF and BM25 both have content to work with.
//
// Design rules:
//   • Only expand when the query is short (≤ 6 tokens after stopword removal)
//     OR explicitly matches a known thin-query pattern.
//   • Each entry maps a trigger regex to an array of expansion terms.
//   • Expansion terms are injected at weight 0.7× the original query weight
//     (simulated by repeating them once in the token list — BM25 saturation
//     ensures they don't dominate).
//   • Expansions are domain-specific Gita vocabulary so they actually improve
//     recall against the KB rather than adding noise.

const QUERY_EXPANSIONS = [
  // Sadness / grief / despair
  {
    match: /\b(sad|sadness|depress|cry|grief|hopeless|despair|heartbreak|heartache|broken)\b/i,
    expand: ["sorrow", "arjuna", "attachment", "atman", "temporary", "peace", "equanimity"],
  },
  // Failure / setback / bounce back
  {
    match: /\b(fail|failure|failed|bounce|setback|went wrong|didn.t work|recover)\b/i,
    expand: ["equanimity", "samatvam", "duty", "action", "result", "karma", "effort", "nishkama"],
  },
  // Happiness / joy / contentment
  {
    match: /\b(happy|happiness|joy|bliss|content|cheerful|feel good)\b/i,
    expand: ["ananda", "inner", "peace", "santosha", "sattva", "equanimity", "self"],
  },
  // Death / afterlife
  {
    match: /\b(death|die|dying|afterlife|after death|rebirth|reincarnation|soul after)\b/i,
    expand: ["atman", "eternal", "soul", "body", "transition", "liberation", "moksha", "brahman"],
  },
  // Anxiety / overthinking / restless mind
  {
    match: /\b(anxious|anxiety|overthink|overthinking|worry|restless|racing thoughts|peace of mind)\b/i,
    expand: ["mind", "abhyasa", "vairagya", "meditation", "practice", "focus", "present", "stillness"],
  },
  // Fear / courage
  {
    match: /\b(fear|afraid|scared|terrified|courage|fearless)\b/i,
    expand: ["abhaya", "atman", "eternal", "soul", "indestructible", "duty", "brave"],
  },
  // Anger / ego
  {
    match: /\b(anger|angry|rage|ego|arrogance|ahamkara)\b/i,
    expand: ["desire", "attachment", "delusion", "chain", "wisdom", "clarity", "rajas"],
  },
  // Purpose / meaning
  {
    match: /\b(purpose|meaning|why am i|point of life|reason to live)\b/i,
    expand: ["svadharma", "dharma", "atman", "soul", "moksha", "karma", "liberation"],
  },
  // Confidence / self-worth
  {
    match: /\b(confident|confidence|self.worth|believe in myself|not good enough|self.doubt)\b/i,
    expand: ["atman", "soul", "eternal", "friend", "self", "identity", "inner", "strength"],
  },
  // Success / ambition
  {
    match: /\b(success|successful|achieve|ambition|goal|how to succeed)\b/i,
    expand: ["karma", "duty", "nishkama", "action", "result", "dharma", "effort"],
  },
  // Letting go / past / regret
  {
    match: /\b(let go|past|regret|moving on|forgive myself|haunted|stuck in past)\b/i,
    expand: ["surrender", "release", "attachment", "karma", "present", "action", "freedom"],
  },
  // Duty / dharma / decision
  {
    match: /\b(duty|dharma|what should i do|dilemma|decision|confused)\b/i,
    expand: ["svadharma", "arjuna", "krishna", "action", "right", "authentic", "integrity"],
  },
];

/**
 * Expand a query by appending synonym/intent tokens for short or
 * emotionally-phrased queries that would otherwise score near-zero.
 *
 * Expansion tokens are appended once (BM25 k1 saturation prevents them
 * from outweighing the original terms). If multiple expansion rules match,
 * all matched expansions are merged (deduped).
 *
 * @param {string[]} tokens — already-tokenised query tokens
 * @param {string}   raw    — original query string (for regex matching)
 * @returns {string[]}
 */
function expandQuery(tokens, raw) {
  const expanded = [...tokens];
  const seen = new Set(tokens);

  for (const rule of QUERY_EXPANSIONS) {
    if (rule.match.test(raw)) {
      for (const term of rule.expand) {
        if (!seen.has(term)) {
          expanded.push(term);
          seen.add(term);
        }
      }
    }
  }

  return expanded;
}

// ─── Topic-specific retrieval rules ──────────────────────────────────────────
//
// For common question types, we pin certain docs to always appear in the
// retrieved set (MUST_INCLUDE) and we demote docs that are context-specific
// to Arjuna's war situation and could mislead a general life question
// (SOFT_EXCLUDE — score is zeroed so they only surface if nothing else matches).
//
// Format:
//   { match: RegExp, mustInclude: string[], softExclude: string[] }
//
// mustInclude  — doc IDs injected at the front of results regardless of score.
// softExclude  — doc IDs whose score is set to 0 (won't surface unless k
//                is large enough that nothing else fills the slots).

const TOPIC_RULES = [
  // ── Sadness / depression / grief / despair ───────────────────────────────
  {
    match: /\b(sad|sadness|depress|grief|griev|despair|sorrow|hopeless|cry|crying|mourn|heartache|heartbreak|broken heart|broke up|breakup)\b/i,
    mustInclude: ["C1", "C2", "V13", "C6", "D15"],
    softExclude: ["D40", "D41", "V9", "C11"],
  },

  // ── Purpose of life / meaning / why am I here ────────────────────────────
  {
    match: /\b(purpose|meaning|why (am i|are we|do we) (here|alive|born)|point of life|reason (for|to) live|what is life for)\b/i,
    mustInclude: ["D9", "D45", "C3", "C12", "C18", "D7"],
    softExclude: ["V9", "C11", "V7"],
  },

  // ── Anger / ego ───────────────────────────────────────────────────────────
  {
    match: /\b(anger|angry|furious|rage|ego|arrogance|pride|ahamkara)\b/i,
    mustInclude: ["V14", "D27", "E4", "C16"],
    softExclude: [],
  },

  // ── Fear / courage / confidence ──────────────────────────────────────────
  {
    match: /\b(fear|afraid|scared|terrified|courage|confidence|fearless|imposter)\b/i,
    mustInclude: ["D21", "D9", "V11", "D35"],
    softExclude: ["C11", "V9"],
  },

  // ── Duty / what should I do / dilemma / decision ────────────────────────
  {
    match: /\b(duty|dharma|svadharma|dilemma|what should i do|don.t know what to do|confused about|right thing)\b/i,
    mustInclude: ["D45", "E1", "C3", "D52", "E7"],
    softExclude: [],
  },

  // ── Karma / action / results ─────────────────────────────────────────────
  {
    match: /\b(karma|action|result|fruit|attachment|detach|nishkama|2\.47|gita verse)\b/i,
    mustInclude: ["V1", "D25", "C3", "C4"],
    softExclude: [],
  },

  // ── Surrender / letting go / trust God ──────────────────────────────────
  {
    match: /\b(surrender|let go|trust (god|krishna|divine|universe)|give up|give it to god|18\.66)\b/i,
    mustInclude: ["V12", "E3", "C18", "C9"],
    softExclude: [],
  },

  // ── Soul / identity / who am I / Atman ──────────────────────────────────
  {
    match: /\b(soul|atman|who am i|true self|eternal self|identity|inner self|spirit)\b/i,
    mustInclude: ["D9", "E7", "V2", "V3", "C13"],
    softExclude: [],
  },

  // ── Motivation / unmotivated / giving up ─────────────────────────────────
  {
    match: /\b(motivat|unmotivat|give up|no energy|can.t go on|burnout|burnt out|overwhelm)\b/i,
    mustInclude: ["D29", "D36", "D38", "V1"],
    softExclude: [],
  },

  // ── Death / afterlife / life after death / rebirth ───────────────────────
  {
    match: /\b(death|die|dying|afterlife|after death|life after death|rebirth|reincarnation|what happens (when|after) (we|i|you|someone) die|soul after death|where do we go|next life|heaven|hell|moksha|liberation from cycle|what happens to the soul)\b/i,
    mustInclude: ["D10", "C8", "V2", "V3", "D51", "C2"],
    softExclude: ["C11", "V9"],
  },

  // ── Happiness / joy / contentment / bliss ────────────────────────────────
  {
    match: /\b(happy|happiness|joy|joyful|joyous|content|contentment|bliss|blissful|cheerful|feel good|feel better|find joy|find happiness|be happy|true happiness|inner joy|lasting happiness|peace and happiness)\b/i,
    mustInclude: ["D23", "D24", "C5", "D62", "D63", "V13"],
    softExclude: [],
  },

  // ── Failure / bounce back / setback / resilience ─────────────────────────
  {
    match: /\b(fail|failure|failed|failing|bounce back|setback|fell down|fell apart|things went wrong|didn.t work|not working|lost everything|starting over|pick myself up|get back up|recover|resilience|keep going after)\b/i,
    mustInclude: ["D12", "V1", "V13", "D22", "D36", "C2"],
    softExclude: ["C11", "V9"],
  },

  // ── Success / achievement / ambition / winning ───────────────────────────
  {
    match: /\b(success|successful|achieve|achievement|win|winning|goal|goals|ambition|ambitious|how to succeed|be successful|get ahead|accomplish|accomplish|reach my potential)\b/i,
    mustInclude: ["V1", "D14", "D25", "C3", "D48"],
    softExclude: [],
  },

  // ── Peace of mind / overthinking / restless mind / mental noise ──────────
  {
    match: /\b(peace of mind|peaceful|overthink|overthinking|restless|racing thoughts|mental noise|calm my mind|quiet the mind|stop thinking|mind won.t stop|inner peace|stillness|tranquil|tranquillity)\b/i,
    mustInclude: ["D17", "D24", "C6", "V13", "D33"],
    softExclude: ["C11", "V9"],
  },

  // ── Past / letting go / regret / moving on ───────────────────────────────
  {
    match: /\b(let go of (the |my |)?past|letting go|moving on|move on|regret|regrets|can.t forget|stuck in the past|past mistakes|forgive myself|haunted by)\b/i,
    mustInclude: ["V12", "D55", "D25", "C18", "V1"],
    softExclude: [],
  },

  // ── Confidence / self-worth / believe in yourself ────────────────────────
  {
    match: /\b(confident|confidence|self.worth|self.esteem|believe in (my|your)?self|believe in myself|self.doubt|doubt myself|not good enough|i am not enough|low confidence|no confidence|inner strength)\b/i,
    mustInclude: ["D35", "V6", "D9", "D21", "D43"],
    softExclude: [],
  },

  // ── General emotional distress / personal questions ───────────────────────
  {
    match: /\b(why (am|do|did) i (feel|feel so|feel like|feel empty|feel lost|feel sad|feel alone|feel anxious|feel angry|feel stuck|feel hopeless|feel worthless)|i feel (sad|empty|lost|alone|anxious|angry|stuck|hopeless|worthless|numb|broken|depressed)|i am (sad|lost|alone|anxious|angry|stuck|hopeless|worthless|numb|broken|depressed|suffering|struggling)|i need help|help me|i don.t know (what to do|why i|how to)|i can.t (stop|sleep|cope|go on)|how (do i|can i) (feel better|find peace|stop feeling|deal with|cope with|get through))\b/i,
    mustInclude: ["D15", "D17", "D18", "C1", "V13"],
    softExclude: ["C11", "V9"],
  },
];

/**
 * Apply topic rules to a query + base results.
 *
 * Steps:
 *  1. Find matching rule (first match wins).
 *  2. Zero out scores of softExclude docs.
 *  3. Prepend mustInclude docs (from the full chunk pool) that aren't already
 *     in the top results, so the returned slice always contains them.
 *
 * @param {string} query
 * @param {Array<{docId:string, score:number}>} scored  — all chunks, scored
 * @param {Array<{docId:string}>} allChunks             — full chunk pool
 * @param {number} k
 * @returns {Array<{docId:string, score:number}>}
 */
export function applyTopicRules(query, scored, allChunks, k) {
  const rule = TOPIC_RULES.find((r) => r.match.test(query));
  if (!rule) return scored.slice(0, k);

  // Zero soft-excluded scores.
  const adjusted = scored.map((c) =>
    rule.softExclude.includes(c.docId) ? { ...c, score: 0 } : c
  );

  // Re-sort after zeroing.
  adjusted.sort((a, b) => b.score - a.score);

  // Collect must-include chunks (highest-scoring chunk per docId).
  // Mark each with pinned:true so the LLM layer can trust them even when
  // their cosine score is 0 (common for short queries like "why am I sad").
  const mustChunks = [];
  for (const docId of rule.mustInclude) {
    const best = adjusted.find((c) => c.docId === docId);
    if (best && !mustChunks.some((c) => c.docId === docId)) {
      mustChunks.push({ ...best, pinned: true });
    }
  }

  // Merge: mustInclude first (preserving order), then fill remaining slots.
  const mustDocIds = new Set(mustChunks.map((c) => c.docId));
  const filler = adjusted.filter((c) => !mustDocIds.has(c.docId));

  const merged = [...mustChunks, ...filler];
  // Deduplicate by docId (keep first occurrence = highest priority).
  const seen = new Set();
  const deduped = merged.filter((c) => {
    if (seen.has(c.docId)) return false;
    seen.add(c.docId);
    return true;
  });

  return deduped.slice(0, k);
}

// ─── Tokenisation ─────────────────────────────────────────────────────────────

// Words that carry no retrieval signal — excluded from TF-IDF / BM25 vectors.
const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "of", "to", "in", "on", "for", "and", "or",
  "with", "this", "that", "it", "as", "by", "at", "be", "was", "were", "has",
  "have", "had", "not", "no", "under", "any", "all", "if", "per",
]);

/** Lowercase, strip punctuation, split on whitespace, drop stopwords and single chars. */
export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9.%$\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

// ─── Chunking ─────────────────────────────────────────────────────────────────

/**
 * Split a Doc into overlapping sliding-window chunks for finer retrieval.
 *
 * Strategy: window of WINDOW_SIZE sentences, stride of STRIDE.
 * Every sentence therefore appears in up to WINDOW_SIZE different chunks,
 * so a teaching that spans a sentence boundary is never split mid-thought.
 *
 * @param {{ id: string, title: string, text: string }} doc
 * @returns {Array<{ chunkId: string, docId: string, docTitle: string, text: string }>}
 */
export function chunkDoc(doc) {
  const sentences = doc.text
    .match(/[^.!?]+[.!?]+/g)
    ?.map((s) => s.trim())
    .filter((s) => s.length > 10) ?? [doc.text];

  const chunks = [];

  for (let i = 0; i < sentences.length; i += STRIDE) {
    const text = sentences.slice(i, i + WINDOW_SIZE).join(" ");
    if (!text.trim()) continue;
    chunks.push({
      chunkId: `${doc.id}-${chunks.length + 1}`,
      docId: doc.id,
      docTitle: doc.title,
      text,
    });
    if (i + STRIDE >= sentences.length) break;
  }

  // Always ensure at least one chunk per doc.
  if (chunks.length === 0) {
    chunks.push({ chunkId: `${doc.id}-1`, docId: doc.id, docTitle: doc.title, text: doc.text });
  }

  return chunks;
}

// ─── TF-IDF index ─────────────────────────────────────────────────────────────

/** Build a TF-IDF index (idf map + per-chunk TF-IDF vectors) from a chunk array. */
export function buildIndex(chunks) {
  const df = {};
  const tokenized = chunks.map((c) => tokenize(c.text));

  // Document frequency: how many chunks contain each term.
  tokenized.forEach((tokens) => {
    new Set(tokens).forEach((t) => {
      df[t] = (df[t] || 0) + 1;
    });
  });

  const N = chunks.length;
  const idf = {};
  Object.keys(df).forEach((t) => {
    idf[t] = Math.log((N + 1) / (df[t] + 0.5));
  });

  // Per-chunk TF-IDF vectors.
  const vectors = tokenized.map((tokens) => {
    const tf = {};
    tokens.forEach((t) => { tf[t] = (tf[t] || 0) + 1; });
    const vec = {};
    Object.keys(tf).forEach((t) => { vec[t] = tf[t] * (idf[t] || 0); });
    return vec;
  });

  return { strategy: "tfidf", idf, vectors, tokenized };
}

/** Cosine similarity between two sparse TF-IDF vectors. */
export function cosineSim(vecA, vecB) {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  Object.keys(vecA).forEach((k) => {
    magA += vecA[k] * vecA[k];
    if (vecB[k]) dot += vecA[k] * vecB[k];
  });
  Object.keys(vecB).forEach((k) => { magB += vecB[k] * vecB[k]; });
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// ─── BM25 index ───────────────────────────────────────────────────────────────
//
// Okapi BM25 is the industry-standard successor to TF-IDF. Key differences:
//   1. Term-frequency saturation — additional occurrences of a term have
//      diminishing returns (controlled by k1). TF-IDF grows without bound.
//   2. Document-length normalisation — longer chunks are penalised relative
//      to the average chunk length (controlled by b).
//   3. Same IDF formula as TF-IDF, but applied to the saturated TF.
//
// For this corpus (small, homogeneous length) the difference is subtle, but
// exporting both strategies lets callers benchmark them head-to-head via the
// pluggable `retrieve` wrapper.

/**
 * Build a BM25 index from a chunk array.
 *
 * Stored values per chunk:
 *   - tokenised term frequencies (raw counts)
 *   - chunk length (token count)
 *   - avgChunkLen (scalar, shared)
 *   - idf map (same as TF-IDF)
 *
 * @param {Array<{text: string}>} chunks
 * @returns {{ strategy: 'bm25', idf: object, tokenized: string[][], avgLen: number }}
 */
export function buildBM25Index(chunks) {
  const tokenized = chunks.map((c) => tokenize(c.text));

  const df = {};
  tokenized.forEach((tokens) => {
    new Set(tokens).forEach((t) => { df[t] = (df[t] || 0) + 1; });
  });

  const N = chunks.length;
  const idf = {};
  Object.keys(df).forEach((t) => {
    // Robertson & Zaragoza IDF with smoothing — better than plain log(N/df).
    idf[t] = Math.log(1 + (N - df[t] + 0.5) / (df[t] + 0.5));
  });

  const totalLen = tokenized.reduce((s, t) => s + t.length, 0);
  const avgLen = totalLen / N || 1;

  return { strategy: "bm25", idf, tokenized, avgLen };
}

/**
 * Score a single chunk against a query using BM25.
 *
 * @param {string[]} queryTokens
 * @param {string[]} chunkTokens
 * @param {number}   chunkLen      — token count of the chunk
 * @param {number}   avgLen        — average chunk token count across corpus
 * @param {object}   idf           — idf map from buildBM25Index
 * @returns {number}
 */
function bm25Score(queryTokens, chunkTokens, chunkLen, avgLen, idf) {
  const tf = {};
  chunkTokens.forEach((t) => { tf[t] = (tf[t] || 0) + 1; });

  let score = 0;
  for (const t of queryTokens) {
    if (!tf[t]) continue;
    const termIdf = idf[t] ?? 0;
    const numerator = tf[t] * (BM25_K1 + 1);
    const denominator = tf[t] + BM25_K1 * (1 - BM25_B + BM25_B * (chunkLen / avgLen));
    score += termIdf * (numerator / denominator);
  }
  return score;
}

// ─── Stage-aware reranking ────────────────────────────────────────────────────
//
// After RRF fusion, chunks whose teaching stage matches the question's
// emotional/pedagogical intent get a small score boost.
//
// Intent → preferred stage mapping:
//   emotional distress, confusion, loss   → Identity (1) first — establish the self
//   duty / decision / dilemma             → Duty (2)
//   action / karma / resilience / work    → Action (3)
//   devotion / surrender / peace / love   → Devotion (4)
//   liberation / ultimate goal / death    → Liberation (5)
//
// The boost is additive (not multiplicative) to avoid dominating RRF scores.
const STAGE_BOOST = 0.08; // ~8% lift for a stage match

const INTENT_STAGE_MAP = [
  { match: /\b(sad|depress|grief|hopeless|despair|lost|alone|anxious|worry|scared|fear|angry|ego|heartbreak|cry|numb|broken)\b/i, stage: 1 },
  { match: /\b(duty|dharma|dilemma|decision|what should i do|svadharma|confused about|right thing)\b/i, stage: 2 },
  { match: /\b(fail|failure|karma|action|result|bounce|success|achieve|work|effort|resilience|motivation|burnout)\b/i, stage: 3 },
  { match: /\b(happy|happiness|peace|joy|love|devotion|surrender|let go|trust god|content|bliss|bhakti)\b/i, stage: 4 },
  { match: /\b(death|die|afterlife|liberation|moksha|eternal|ultimate|reincarnation|rebirth|what happens after)\b/i, stage: 5 },
];

/**
 * DOC_STAGE mirror for the retrieval layer (avoids importing from llm.js).
 * Stages: 1=Identity, 2=Duty, 3=Action, 4=Devotion, 5=Liberation
 * @type {Record<string, 1|2|3|4|5>}
 */
const DOC_STAGE_RETRIEVAL = {
  C2: 1, C13: 1, C15: 1, V2: 1, V3: 1,
  D1: 1, D9: 1, D10: 1, D54: 1, E4: 1, E7: 1,
  C1: 2, C3: 2, C16: 2, V4: 2, V5: 2,
  D2: 2, D7: 2, D30: 2, D41: 2, D45: 2, D52: 2, E1: 2,
  C4: 3, C5: 3, C6: 3, C14: 3, C17: 3,
  V1: 3, V6: 3, V13: 3, V14: 3, V15: 3,
  D8: 3, D11: 3, D12: 3, D13: 3, D14: 3, D15: 3, D17: 3,
  D18: 3, D22: 3, D25: 3, D26: 3, D27: 3, D28: 3, D29: 3,
  D31: 3, D36: 3, D37: 3, D38: 3, D48: 3, D53: 3, D55: 3,
  D56: 3, E5: 3, D58: 3, D60: 3, D62: 3, D64: 3,
  D66: 3, D67: 3, D68: 3, D69: 3, D70: 3,
  C7: 4, C8: 4, C9: 4, C10: 4, C11: 4, C12: 4,
  V7: 4, V8: 4, V9: 4, V10: 4, V11: 4,
  D3: 4, D16: 4, D19: 4, D20: 4, D23: 4, D24: 4,
  D32: 4, D33: 4, D40: 4, D42: 4, D44: 4, D49: 4, D50: 4,
  D57: 4, D59: 4, D63: 4, D71: 4, D72: 4,
  C18: 5, D4: 5, D5: 5, D6: 5, V12: 5,
  D34: 5, D39: 5, D46: 5, D51: 5, E2: 5, E3: 5, E6: 5,
  D61: 5, D65: 5,
};

/**
 * Detect the primary pedagogical intent stage for a query.
 * Returns null if no intent signal is found (no boost applied).
 * @param {string} query
 * @returns {number|null}
 */
function detectIntentStage(query) {
  for (const rule of INTENT_STAGE_MAP) {
    if (rule.match.test(query)) return rule.stage;
  }
  return null;
}

// ─── Reciprocal Rank Fusion ───────────────────────────────────────────────────

/**
 * Merge two independently-scored chunk lists using Reciprocal Rank Fusion.
 *
 * Why RRF over score normalisation:
 *   - TF-IDF cosine scores and BM25 scores live on incompatible scales.
 *   - Normalising distorts relative importance.
 *   - RRF uses only rank position, which is scale-invariant.
 *   - Chunks that rank high in BOTH lists receive a reliable combined boost.
 *
 * @param {Array<object>} listA  — chunks scored by scorer A (e.g. TF-IDF)
 * @param {Array<object>} listB  — same chunks scored by scorer B (e.g. BM25)
 * @returns {Array<{chunkId: string, rrfScore: number}>}
 */
function reciprocalRankFusion(listA, listB) {
  const scores = {};

  const addList = (list) => {
    list.forEach((chunk, rank) => {
      const id = chunk.chunkId;
      scores[id] = (scores[id] || 0) + 1 / (RRF_K + rank + 1);
    });
  };

  addList(listA);
  addList(listB);

  return scores;
}

// ─── Pluggable retrieve ───────────────────────────────────────────────────────

/**
 * Return the top-k chunks most relevant to the query.
 *
 * Pipeline:
 *   1. Query expansion  — append synonym/intent tokens for thin queries
 *   2. TF-IDF scoring   — cosine similarity on expanded query vector
 *   3. BM25 scoring     — Okapi BM25 on expanded query tokens
 *   4. RRF fusion       — merge both ranked lists via Reciprocal Rank Fusion
 *   5. Stage boost      — small additive lift for chunks whose teaching stage
 *                         matches the question's detected intent
 *   6. Topic routing    — must-include pins + soft-exclude demotions
 *
 * The resulting set is semantically diverse (two scorers), pedagogically
 * aligned (stage boost), and topically precise (routing rules).
 *
 * @param {string}        query
 * @param {Array<object>} chunks
 * @param {object}        index   — built by buildIndex (tfidf) or buildBM25Index (bm25)
 * @param {number}        [k=TOP_K]
 * @returns {Array<object>}
 */
export function retrieve(query, chunks, index, k = TOP_K) {
  const rawTokens = tokenize(query);
  const expandedTokens = expandQuery(rawTokens, query);

  // ── Score with TF-IDF (using expanded tokens) ──
  const qTf = {};
  expandedTokens.forEach((t) => { qTf[t] = (qTf[t] || 0) + 1; });
  const qVec = {};
  Object.keys(qTf).forEach((t) => {
    qVec[t] = qTf[t] * (index.idf[t] || 0);
  });
  const tfidfScored = chunks
    .map((c, i) => ({
      ...c,
      score: cosineSim(qVec, index.vectors ? index.vectors[i] : {}),
    }))
    .sort((a, b) => b.score - a.score);

  // ── Score with BM25 (using expanded tokens) ──
  // Build an ad-hoc BM25 index if the stored index is TF-IDF only.
  // We cache the tokenized arrays from buildIndex to avoid re-tokenising.
  const bm25Tokenized = index.tokenized ?? chunks.map((c) => tokenize(c.text));
  const totalLen = bm25Tokenized.reduce((s, t) => s + t.length, 0);
  const avgLen = totalLen / chunks.length || 1;
  const bm25Idf = index.strategy === "bm25" ? index.idf : buildBM25IdfFromTfidf(index.idf, chunks.length);

  const bm25Scored = chunks
    .map((c, i) => ({
      ...c,
      score: bm25Score(expandedTokens, bm25Tokenized[i], bm25Tokenized[i].length, avgLen, bm25Idf),
    }))
    .sort((a, b) => b.score - a.score);

  // ── RRF fusion ──
  const rrfMap = reciprocalRankFusion(tfidfScored, bm25Scored);

  // ── Stage boost ──
  const intentStage = detectIntentStage(query);
  const chunkById = {};
  chunks.forEach((c) => { chunkById[c.chunkId] = c; });

  const fused = Object.entries(rrfMap)
    .map(([chunkId, rrfScore]) => {
      const chunk = chunkById[chunkId];
      const docStage = DOC_STAGE_RETRIEVAL[chunk?.docId] ?? 3;
      const boost = intentStage && docStage === intentStage ? STAGE_BOOST : 0;
      return { ...chunk, score: rrfScore + boost };
    })
    .sort((a, b) => b.score - a.score);

  // ── Topic routing: must-include pins + soft-exclude demotions ──
  return applyTopicRules(query, fused, chunks, k);
}

/**
 * Convert a TF-IDF idf map to a BM25-compatible idf map on the fly.
 * Used when the stored index is TF-IDF but we need BM25 scoring for fusion.
 * Robertson & Zaragoza IDF: log(1 + (N - df + 0.5) / (df + 0.5))
 * We back-calculate df from the TF-IDF IDF: df ≈ (N+1) / exp(idf) - 0.5
 *
 * @param {object} tfidfIdf
 * @param {number} N  — total chunk count
 * @returns {object}
 */
function buildBM25IdfFromTfidf(tfidfIdf, N) {
  const bm25Idf = {};
  Object.keys(tfidfIdf).forEach((t) => {
    // Recover approximate df from TF-IDF IDF value
    const df = Math.max(1, Math.round((N + 1) / Math.exp(tfidfIdf[t]) - 0.5));
    bm25Idf[t] = Math.log(1 + (N - df + 0.5) / (df + 0.5));
  });
  return bm25Idf;
}
