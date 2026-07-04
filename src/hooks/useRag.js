import { useState, useCallback } from "react";
import { retrieve } from "../lib/retrieval.js";
import { getLLMResponse } from "../lib/llm.js";
import { checkGroundedness, REFUSAL_PATTERNS } from "../lib/eval.js";
import { useLocalStorage } from "./useLocalStorage.js";
import { TOP_K } from "../lib/constants.js";

/**
 * useRag — encapsulates the full retrieval-augmented generation pipeline.
 *
 * Responsibilities:
 *   1. Retrieve the top-k chunks for a query using the provided index.
 *   2. Call the LLM (mock or live) with the retrieved context + conversation
 *      history for multi-turn coherence.
 *   3. Run the groundedness check on every response so the UI can display
 *      citation-validity badges without duplicating logic in each component.
 *   4. Persist conversation history to localStorage so it survives page
 *      refreshes — the user never loses a session accidentally.
 *   5. Expose a clearHistory helper so the user can start a fresh
 *      conversation without reloading.
 *
 * This hook intentionally owns NO rendering — it is a pure logic container.
 * ChatTab and EvalTab both consume it, keeping their JSX focused on layout.
 *
 * @param {{ chunks: Array<object>, index: object }} options
 * @returns {{
 *   history:      Array<HistoryEntry>,
 *   loading:      boolean,
 *   runQuery:     (query: string) => Promise<void>,
 *   clearHistory: () => void,
 * }}
 *
 * @typedef {{
 *   q:         string,
 *   retrieved: Array<object>,
 *   answer:    string,
 *   ground:    object,
 *   refused:   boolean,
 * }} HistoryEntry
 */
export function useRag({ chunks, index }) {
  const [history, setHistory] = useLocalStorage("gita-chat-history", []);
  const [loading, setLoading] = useState(false);

  /**
   * Run a single query through the RAG pipeline.
   *
   * Steps:
   *   retrieve → getLLMResponse (with history) → checkGroundedness → append
   *
   * Errors from getLLMResponse (timeout, network failure) are caught here and
   * surfaced as a user-readable answer so the UI never shows a blank crash.
   */
  const runQuery = useCallback(
    async (query) => {
      const trimmed = query.trim();
      if (!trimmed || loading) return;

      setLoading(true);
      try {
        const retrieved = retrieve(trimmed, chunks, index, TOP_K);

        // Pass the last N turns as history for multi-turn coherence.
        const answer = await getLLMResponse(trimmed, retrieved, history);

        const ground = checkGroundedness(answer, retrieved);
        const refused = REFUSAL_PATTERNS.test(answer);

        setHistory((prev) => [
          ...prev,
          { q: trimmed, retrieved, answer, ground, refused },
        ]);
      } catch (err) {
        // Surface network / timeout errors as a graceful in-chat message.
        const errorMsg =
          err?.message?.includes("timed out")
            ? "The request timed out — please try again in a moment."
            : "Something went wrong reaching the server. Please try again.";

        setHistory((prev) => [
          ...prev,
          {
            q: trimmed,
            retrieved: [],
            answer: errorMsg,
            ground: { citationValid: false, groundednessScore: 0 },
            refused: false,
            isError: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [chunks, index, history, loading, setHistory]
  );

  /** Reset conversation history. */
  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  return { history, loading, runQuery, clearHistory };
}
