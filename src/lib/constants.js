/**
 * Central configuration — single source of truth for all magic numbers.
 * Change values here; every consumer picks them up automatically.
 */

// ── Retrieval ─────────────────────────────────────────────────────────────────

/** Number of chunks returned per query. */
export const TOP_K = 5;

/** Sliding-window chunk size (sentences per chunk). */
export const WINDOW_SIZE = 3;

/** Stride between consecutive chunk start positions. */
export const STRIDE = 1;

/**
 * Minimum cosine / BM25 score for a chunk to be considered relevant.
 * Genuine Gita questions score 0.03+; off-topic queries score near zero.
 */
export const RELEVANCE_THRESHOLD = 0.03;

// ── BM25 tuning ───────────────────────────────────────────────────────────────

/** BM25 term-frequency saturation parameter (1.2–2.0 is typical). */
export const BM25_K1 = 1.5;

/** BM25 length normalisation parameter (0 = no normalisation, 1 = full). */
export const BM25_B = 0.75;

// ── LLM ───────────────────────────────────────────────────────────────────────

/** Maximum number of prior conversation turns sent as history. */
export const MAX_HISTORY_TURNS = 3;

/** Anthropic model identifier used in live mode.
 *  claude-sonnet-5 is the current production Sonnet (July 2025).
 *  Update here only — all consumers import from this constant. */
export const CLAUDE_MODEL = "claude-sonnet-5";

/** Maximum tokens the model may generate per response. */
export const MAX_TOKENS = 800;

/** Milliseconds before a live API call is aborted. */
export const REQUEST_TIMEOUT_MS = 15_000;

/** Number of retry attempts on rate-limit (429) errors before giving up. */
export const MAX_RETRIES = 3;

/** Base delay (ms) for exponential back-off between retries. */
export const RETRY_BASE_DELAY_MS = 1_000;

// ── Evaluation ────────────────────────────────────────────────────────────────

/** Minimum keyword-recall rate for an in-scope eval row to pass. */
export const KEYWORD_RECALL_PASS_THRESHOLD = 0.5;

/** Minimum sentence-overlap ratio for a sentence to be considered grounded. */
export const GROUNDEDNESS_SENTENCE_THRESHOLD = 0.25;

/**
 * Token document-frequency ceiling above which a token is treated as
 * high-frequency (i.e. too common to serve as grounding evidence).
 * Expressed as a fraction of total retrieved chunks.
 */
export const HIGH_FREQ_DF_CEILING = 0.4;
