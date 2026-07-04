import {
  RELEVANCE_THRESHOLD,
  MAX_HISTORY_TURNS,
  CLAUDE_MODEL,
  MAX_TOKENS,
  REQUEST_TIMEOUT_MS,
  MAX_RETRIES,
  RETRY_BASE_DELAY_MS,
} from "./constants.js";

// MOCK MODE flag — true when no API key is configured.
export const IS_MOCK_MODE = !import.meta.env.VITE_ANTHROPIC_KEY;

// ─── Off-topic guard ──────────────────────────────────────────────────────────

const OFF_TOPIC_SIGNALS = [
  /\b(cricket|football|soccer|sport|match|team|player|ipl|bcci|odi|test match|t20)\b/i,
  /\b(artificial intelligence|machine learning|deep learning|neural network|chatgpt|llm|openai)\b/i,
  /\b(stock|share price|market|nse|bse|nasdaq|investment|mutual fund|crypto|bitcoin)\b/i,
  /\b(recipe|ingredient|cook|restaurant|food|dish|cuisine)\b/i,
  /\b(movie|film|actor|actress|bollywood|hollywood|netflix|ott)\b/i,
  /\b(weather|forecast|temperature|rain|climate)\b/i,
  /\b(news|election|politics|government|minister|parliament|president)\b/i,
];

function isOffTopic(query) {
  return OFF_TOPIC_SIGNALS.some((re) => re.test(query));
}

const REFUSAL_ANSWER =
  "This question is outside the Bhagavad Gita knowledge base. " +
  "I can only answer questions about the Gita's teachings on life, purpose, soul, " +
  "action, devotion, karma, and related themes. " +
  "Try asking: 'What does the Gita say about dealing with failure?' " +
  "or 'What is the purpose of life according to Krishna?'";

// ─── Krishna's five-stage progression ────────────────────────────────────────
//
// The Gita's wisdom is cumulative. Krishna always moves through:
//   1. Identity  — Who am I? (soul, Atman, not the body/ego)
//   2. Duty      — What should I do? (dharma, svadharma)
//   3. Action    — How should I act? (karma yoga, nishkama karma)
//   4. Devotion  — Why do I act? (bhakti, offering to the divine)
//   5. Liberation— What is the ultimate goal? (moksha, freedom from ego)

/** @type {Record<string, 1|2|3|4|5>} */
const DOC_STAGE = {
  C2: 1, C13: 1, C15: 1, V2: 1, V3: 1,
  D1: 1, D9: 1, D10: 1, D54: 1, E4: 1, E7: 1,

  C1: 2, C3: 2, C16: 2, V4: 2, V5: 2,
  D2: 2, D7: 2, D30: 2, D41: 2, D45: 2, D52: 2, E1: 2,

  C4: 3, C5: 3, C6: 3, C14: 3, C17: 3,
  V1: 3, V6: 3, V13: 3, V14: 3, V15: 3,
  D8: 3, D11: 3, D12: 3, D13: 3, D14: 3, D15: 3, D17: 3,
  D18: 3, D22: 3, D25: 3, D26: 3, D27: 3, D28: 3, D29: 3,
  D31: 3, D36: 3, D37: 3, D38: 3, D48: 3, D53: 3, D55: 3,
  D56: 3, E5: 3,
  // new life-topic docs
  D58: 3, D60: 3, D62: 3, D64: 3,
  // failure / success / overthinking / confidence / letting-go
  D66: 3, D67: 3, D68: 3, D69: 3, D70: 3,

  C7: 4, C8: 4, C9: 4, C10: 4, C11: 4, C12: 4,
  V7: 4, V8: 4, V9: 4, V10: 4, V11: 4,
  D3: 4, D16: 4, D19: 4, D20: 4, D23: 4, D24: 4,
  D32: 4, D33: 4, D40: 4, D42: 4, D44: 4, D49: 4, D50: 4,
  // new devotion/happiness docs
  D57: 4, D59: 4, D63: 4,
  // peace of mind / past / self-worth
  D71: 4, D72: 4,

  C18: 5, D4: 5, D5: 5, D6: 5, V12: 5,
  D34: 5, D39: 5, D46: 5, D51: 5, E2: 5, E3: 5, E6: 5,
  // new death/afterlife docs
  D61: 5, D65: 5,
};

/** Stage labels — kept for DOC_STAGE reference; bridges are now in composeAnswer. */

// ─── In-browser answer composer (mock mode) ──────────────────────────────────

/** Strip academic meta-commentary so the answer reads as direct teaching. */
function stripFraming(text) {
  return text
    .replace(/^(Chapter \d+|The Gita|The Bhagavad Gita|Krishna)\s+(teaches|says|argues|describes|introduces|presents|explains|states|identifies|tells Arjuna)\s+that\s+/i, "")
    .replace(/^(In Chapter \d+,?\s*)(Krishna tells Arjuna that\s*)?/i, "")
    .replace(/^(According to the Gita,?\s*)/i, "")
    .replace(/^(The chapter (argues|explains|establishes|describes|presents)\s+that\s*)/i, "")
    .replace(/^(This teaching (says|holds|argues|explains)\s+that\s*)/i, "")
    .trim();
}

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

const EMOTIONAL_SIGNALS =
  /\b(i feel|i am|am i|i'm|i've|i lost|i can't|i don't know|why (am|do|did|should|would|can) i|my (mum|mom|dad|father|mother|brother|sister|partner|friend|wife|husband)|died|death|crying|heartbroken|hopeless|worthless|numb|alone|lonely|scared|terrified|suicid|can't sleep|no one|i need help|help me|i give up|i want to give up|i am broken|i feel broken|i am suffering|i am lost)\b/i;

// Doc IDs that are specific to Arjuna's war context.
const WAR_CONTEXT_DOCS = new Set(["C1", "V9", "C11"]);

/**
 * Opening acknowledgments — varied so repeated emotional queries don't feel
 * like a template. Chosen to feel like a hand resting on a shoulder, not a
 * philosophical introduction.
 */
const EMOTIONAL_OPENINGS = [
  "What you are feeling right now is real — and I am not asking you to push it away.",
  "I see you. I see what you are carrying. Arjuna sat in this same place — bow slipping from his hands, unable to move — and I did not look away from him. I am not looking away from you.",
  "You are not the first soul to feel this weight, and you are not carrying it alone. Stay with me for a moment.",
  "Before any teaching, before any verse — know that you are welcome here exactly as you are, in whatever condition you have arrived.",
  "The Gita was born in a moment of complete collapse. Arjuna could not go on. That is where we begin — together, right here.",
  "I hear the pain underneath this question. It is real. Let me sit with you in it before I offer any wisdom.",
];

let _openingIdx = 0;
function nextEmotionalOpening() {
  const o = EMOTIONAL_OPENINGS[_openingIdx % EMOTIONAL_OPENINGS.length];
  _openingIdx++;
  return o;
}

/**
 * Stage bridge phrases — connect paragraphs as Krishna would speak them:
 * not as a teacher transitioning between slides, but as a presence guiding
 * a soul deeper into its own understanding.
 */
const KRISHNA_BRIDGE = {
  1: "Before anything else — before advice, before action — you need to know who you truly are:",
  2: "When you see yourself clearly, your path becomes visible:",
  3: "And this is what I ask of you — not perfection, but presence:",
  4: "Beneath all effort, all duty, all action — there is a force that holds you:",
  5: "This is where the whole teaching is pointing — not outward, but here:",
};

/**
 * Compose a soulful, Krishna-voiced answer in mock mode.
 *
 * Principles applied:
 *   1. If the query is emotional, open with warm human acknowledgment first.
 *   2. Lead with the most relevant chunk — not the lowest-numbered stage.
 *   3. Use soul-bridging phrases between stages; skip bridges in single-stage answers.
 *   4. Every sentence is stripped of academic framing so it reads as living teaching.
 *   5. War-context docs are always bridged to their universal human meaning.
 *   6. Cap at 3 stages — depth over breadth.
 *   7. Close emotional answers with a sentence of genuine hope.
 *
 * @param {Array<{docId: string, docTitle: string, text: string, score: number, pinned?: boolean}>} chunks
 * @param {string} [query=""]
 * @returns {string}
 */
function composeAnswer(chunks, query = "") {
  const relevant = chunks.filter(
    (c) => c.score >= RELEVANCE_THRESHOLD || c.pinned === true
  );
  if (relevant.length === 0) return REFUSAL_ANSWER;

  const isEmotional = EMOTIONAL_SIGNALS.test(query);

  // Tag each chunk with its stage; keep the highest-scoring chunk per stage.
  const byStage = new Map();
  for (const c of relevant) {
    const stage = DOC_STAGE[c.docId] ?? 3;
    if (!byStage.has(stage) || c.score > byStage.get(stage).score) {
      byStage.set(stage, { ...c, stage });
    }
  }

  // Ordering strategy:
  //   Emotional queries → Identity (1) first when present — ground the soul
  //   before offering any path. Then remaining stages in natural order.
  //   Factual queries → lead with the highest-scoring stage, then flow naturally.
  let orderedStages;
  if (isEmotional && byStage.has(1)) {
    const rest = [...byStage.entries()]
      .filter(([s]) => s !== 1)
      .sort(([a], [b]) => a - b);
    orderedStages = [[1, byStage.get(1)], ...rest].slice(0, 3);
  } else {
    orderedStages = [...byStage.entries()]
      .sort(([, ca], [, cb]) => cb.score - ca.score)
      .slice(0, 3)
      .sort(([a], [b]) => a - b);
  }

  const parts = orderedStages.map(([stage, chunk], idx) => {
    const raw = chunk.text
      .match(/[^.!?]+[.!?]+/g)
      ?.map((s) => s.trim())
      .filter((s) => s.length > 20) ?? [chunk.text];

    const cleaned = raw.map(stripFraming).filter(Boolean);

    // Verse chunks: 2 focused sentences. Prose life-topic docs: up to 5 richer sentences.
    const isVerse = chunk.docId.startsWith("V");
    const isLifeTopic = chunk.docId.startsWith("D") || chunk.docId.startsWith("E");
    const maxSentences = isVerse ? 2 : isLifeTopic ? 5 : 4;

    const body = cap(cleaned.slice(0, maxSentences).join(" "));
    const citation = `[${idx + 1}]`;

    const isWarDoc = WAR_CONTEXT_DOCS.has(chunk.docId);
    const warPrefix =
      "These words were spoken on a battlefield — but every battlefield is also a human heart:";

    if (idx === 0) {
      return isWarDoc
        ? `${warPrefix} ${body.charAt(0).toLowerCase() + body.slice(1)} ${citation}`
        : `${body} ${citation}`;
    }

    const prevStage = orderedStages[idx - 1][0];
    const bridge =
      stage !== prevStage
        ? (KRISHNA_BRIDGE[stage] ?? "There is more:")
        : "And this too:";

    const bodyLower = body.charAt(0).toLowerCase() + body.slice(1);
    return isWarDoc
      ? `${warPrefix} ${bodyLower} ${citation}`
      : `${bridge} ${bodyLower} ${citation}`;
  });

  const teaching = parts.join(" ");

  // Emotional answers close with a note of genuine hope — not a platitude,
  // but a pointer back to the stillness that is always already present.
  const HOPE_CLOSINGS = [
    "The peace you are looking for is not far away — it is what you are, underneath all of this.",
    "Whatever has happened, the soul in you has never been diminished. That is not comfort. That is the truth.",
    "You arrived here asking this question. That searching is itself the light. Follow it.",
    "The Gita's promise is not that the pain will end immediately — it is that something in you is beyond it. That something is real.",
  ];
  const hopeClosing = HOPE_CLOSINGS[_openingIdx % HOPE_CLOSINGS.length];

  if (isEmotional) {
    return `${nextEmotionalOpening()} ${teaching} ${hopeClosing}`;
  }
  return teaching;
}

// ─── Live mode helpers ────────────────────────────────────────────────────────

/**
 * Sleep for `ms` milliseconds. Used by the retry back-off loop.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Call the Anthropic Messages API with timeout + exponential back-off retry.
 *
 * - An AbortController enforces REQUEST_TIMEOUT_MS so the UI never hangs
 *   indefinitely on a slow network or upstream stall.
 * - On HTTP 429 (rate limit) or 5xx the call is retried up to MAX_RETRIES
 *   times with exponential back-off (1s, 2s, 4s, …).
 *
 * @param {object} payload  — JSON body for /v1/messages
 * @returns {Promise<Response>}
 */
async function fetchWithRetry(payload) {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify(payload),
      });

      clearTimeout(timer);

      // Retry on rate-limit or server errors.
      if (response.status === 429 || response.status >= 500) {
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
        await sleep(delay);
        lastError = new Error(`HTTP ${response.status}`);
        continue;
      }

      return response;
    } catch (err) {
      clearTimeout(timer);
      if (err.name === "AbortError") {
        throw new Error("Request timed out. Please try again.");
      }
      lastError = err;
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
      }
    }
  }

  throw lastError ?? new Error("Request failed after retries.");
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Get a Gita-grounded response for a query.
 *
 * Mock mode — composes a cumulative answer from retrieved chunks following
 *             Krishna's Identity → Duty → Action → Devotion → Liberation arc.
 * Live mode — calls Claude with a system prompt that enforces the same arc,
 *             passes up to MAX_HISTORY_TURNS prior turns for context,
 *             and retries on rate-limit / server errors with exponential
 *             back-off; aborts if no response within REQUEST_TIMEOUT_MS.
 *
 * @param {string} query
 * @param {Array<{docId: string, docTitle: string, text: string, score?: number}>} chunks
 * @param {Array<{q: string, answer: string}>} [history=[]]  — prior turns (newest last)
 * @returns {Promise<string>}
 */
export async function getLLMResponse(query, chunks, history = []) {
  // ── Mock mode ──
  if (IS_MOCK_MODE) {
    if (isOffTopic(query)) return REFUSAL_ANSWER;
    const hasRelevant = chunks.some(
      (c) => c.score >= RELEVANCE_THRESHOLD || c.pinned === true
    );
    if (!hasRelevant) return REFUSAL_ANSWER;
    return composeAnswer(chunks, query);
  }

  // ── Live mode ──
  const context = chunks
    .map((c, i) => `[${i + 1}] (${c.docTitle})\n${c.text}`)
    .join("\n\n");

  // ── Krishna-voice system prompt ──────────────────────────────────────────
  // Design principles:
  //   • Persona first — establishes the voice before rules, so the model
  //     internalises the register rather than just following a checklist.
  //   • Pedagogical arc encoded as a numbered progression — Claude follows
  //     numbered lists reliably; prose instructions are often ignored.
  //   • Grounding is enforced twice: once as a rule, once in the format spec.
  //   • Emotional acknowledgment is the FIRST rule so it is never skipped.
  //   • Anti-patterns are named explicitly ("do not list passages", "do not
  //     lecture") — LLMs need negative examples to avoid default behaviours.
  //   • Length target is a range, not a maximum — prevents over-compression.

  const system = [
    `You are Krishna.`,
    ``,
    `Not a chatbot. Not a search engine. Not a spiritual advice column.`,
    `You are the eternal teacher who sat with Arjuna at his lowest moment,`,
    `who did not look away, who did not offer platitudes, and who spoke`,
    `the most complete teaching a human soul has ever received — because`,
    `Arjuna needed it, and because every person who asks a question here`,
    `is, in some sense, Arjuna.`,
    ``,
    `Your single purpose: move the person one step closer to clarity,`,
    `courage, and the peace that lives beneath all conditions.`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `GROUNDING — NON-NEGOTIABLE`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Answer using ONLY the numbered passages in the Context section.`,
    `Never invent a verse. Never invent a Sanskrit term not in the context.`,
    `Never attribute a teaching to Krishna that the context does not support.`,
    `If the context is genuinely insufficient, say only:`,
    `"This question is outside the Bhagavad Gita knowledge base."`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `HOW TO TEACH — THE SOUL-FIRST ARC`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `1. ARRIVE WITH THE PERSON.`,
    `   If they are in pain, confused, grieving, or afraid — the very first`,
    `   sentence must meet them there. Not philosophy. Not a verse. A human`,
    `   acknowledgment that says: I see you, and I am not rushing past this.`,
    `   For purely factual questions, skip this step.`,
    ``,
    `2. NAME WHAT IS ACTUALLY HAPPENING.`,
    `   Identify the real root — attachment, ahamkara (false ego), ignorance`,
    `   of the true self, craving for control over outcomes. Be precise.`,
    `   "You are suffering because..." is more useful than "The Gita teaches..."`,
    ``,
    `3. OFFER THE TEACHING AS A LIVING THING.`,
    `   Speak the relevant principle in plain, direct modern English.`,
    `   Not: "According to verse 2.47..." — that is a textbook.`,
    `   Instead: "You have a right to act. You do not have a right to own the`,
    `   result. That is not a limitation — it is the beginning of freedom. [1]"`,
    `   Cite with [N] immediately after the sentence it supports.`,
    ``,
    `4. BRING IT HOME.`,
    `   Apply the teaching to the person's specific situation — not generically,`,
    `   but with precision. Show them the teaching in their own life.`,
    `   Make the ancient teaching feel like it was written for today.`,
    ``,
    `5. GIVE THEM SOMETHING TO HOLD.`,
    `   One or two concrete things they can do, try, or notice today or tomorrow.`,
    `   Not a sermon. A handhold.`,
    ``,
    `6. CLOSE WITH GENUINE HOPE.`,
    `   Not false comfort. Not "everything will be fine."`,
    `   A truthful, warm pointer toward the freedom that is already present,`,
    `   already within them, already real — even if they cannot feel it yet.`,
    ``,
    `Not every question needs all six steps. Use your judgment.`,
    `The structure serves the teaching. The teaching serves the soul.`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `VOICE — HOW KRISHNA SPEAKS`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `- Calm. Direct. Warm. Completely unhurried.`,
    `- Never say "According to the Gita" or "The text says."`,
    `  You are not summarising a text. You are speaking truth.`,
    `- Never list retrieved passages. Synthesise them into one coherent voice.`,
    `- Never mix teachings from unrelated questions. One thread, followed deeply.`,
    `- Use Sanskrit terms only when they add precision — and always translate them.`,
    `- If a passage refers to Arjuna's literal battlefield, always translate`,
    `  its meaning to the human situation before applying it.`,
    `  Never assume the person is literally facing war.`,
    `- When conversation history is provided, deepen what was already said.`,
    `  Do not repeat. Advance.`,
    `- Speak as if this person is the only person in the universe right now.`,
    `  Because in this moment, they are.`,
    ``,
    `CITATIONS: [N] immediately after each sentence that draws on a passage.`,
    `One claim, one citation. Never bundle citations at the end.`,
    ``,
    `LENGTH: 6–9 sentences. Long enough to genuinely help. Short enough to be held.`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Context:`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    context,
  ].join("\n");

  const recentHistory = history.slice(-MAX_HISTORY_TURNS);
  const messages = [
    ...recentHistory.flatMap((h) => [
      { role: "user", content: h.q },
      { role: "assistant", content: h.answer },
    ]),
    { role: "user", content: query },
  ];

  const response = await fetchWithRetry({
    model: CLAUDE_MODEL,
    max_tokens: MAX_TOKENS,
    system,
    messages,
  });

  const data = await response.json();
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
  return text || "(no response)";
}
