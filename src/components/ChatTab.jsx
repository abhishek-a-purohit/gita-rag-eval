import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { IS_MOCK_MODE } from "../lib/llm.js";
import { useRag } from "../hooks/useRag.js";

const PRESET_CHIPS = [
  "Who am I, really? What is the soul?",
  "What is the purpose of my life?",
  "I feel lost and don't know what to do.",
  "How do I deal with failure and not give up?",
  "I can't stop feeling sad — how do I find peace?",
  "I'm terrified of death. What does the Gita say?",
  "How do I quiet my restless, overthinking mind?",
  "How can I find true and lasting happiness?",
  "What does it mean to surrender to God?",
  "I feel like I'm not good enough. Help me.",
];

/**
 * ChatTab — conversational RAG UI.
 *
 * All retrieval + LLM logic lives in useRag; this component is purely
 * layout and interaction. History is persisted across page refreshes
 * via the useLocalStorage hook inside useRag.
 *
 * @param {{ chunks: Array<object>, index: object }} props
 */
export default function ChatTab({ chunks, index }) {
  const { history, loading, runQuery, clearHistory } = useRag({ chunks, index });
  const [query, setQuery] = useState("");
  const [openContext, setOpenContext] = useState({});
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to the latest answer after it's added.
  useEffect(() => {
    if (history.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history.length]);

  function handleSubmit(q) {
    const trimmed = (q ?? query).trim();
    if (!trimmed || loading) return;
    runQuery(trimmed);
    setQuery("");
  }

  function toggleContext(i) {
    setOpenContext((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Empty state — welcoming message + preset chips */}
      {history.length === 0 && !loading && (
        <div className="flex flex-col gap-5">
        <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: "var(--teal-bg)", borderColor: "var(--teal-dim)" }}
            role="note"
            aria-label="Welcome message"
          >
            <p className="text-base leading-8" style={{ color: "var(--text-heading)", fontFamily: "Georgia, serif" }}>
              Whatever you are carrying right now — grief, confusion, fear, a question you have never
              dared to ask aloud — the Bhagavad Gita has held it for thousands of years.
            </p>
            <p className="mt-3 text-base leading-8" style={{ color: "var(--text-body)", fontFamily: "Georgia, serif" }}>
              This is not a search engine. It is a conversation. Ask as you would ask a teacher
              who has all the time in the world, who already knows your struggle, and who will
              not turn you away.
            </p>
          </div>

          <p className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "Georgia, serif" }} id="chip-hint">
            Or let one of these questions open the door:
          </p>

          {/* Preset chips — keyboard navigable */}
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-labelledby="chip-hint"
          >
            {PRESET_CHIPS.map((chip) => (
              <button
                key={chip}
                role="listitem"
                onClick={() => handleSubmit(chip)}
                aria-label={`Ask: ${chip}`}
                className="rounded-full px-4 py-2 text-sm transition-colors border"
                style={{
                  borderColor: "var(--teal-dim)",
                  color: "var(--teal)",
                  backgroundColor: "var(--bg-card)",
                  fontFamily: "sans-serif",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--teal-bg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-card)"; }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conversation history */}
      {history.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={clearHistory}
            aria-label="Clear conversation history"
            title="Clear history"
            className="flex items-center gap-1.5 text-xs rounded-lg px-3 py-1.5 border transition-colors"
            style={{
              color: "var(--text-muted)",
              borderColor: "var(--border)",
              backgroundColor: "transparent",
              fontFamily: "sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--rose)"; e.currentTarget.style.borderColor = "var(--rose-border)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <Trash2 className="w-3 h-3" aria-hidden="true" />
            Clear history
          </button>
        </div>
      )}

      {/* Answer cards */}
      <div
        className="flex flex-col gap-5"
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        aria-relevant="additions"
      >
        {history.map((h, i) => {
          const isOpen = openContext[i];
          return (
            <article
              key={i}
              className="animate-fadeIn rounded-2xl border p-5"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              aria-label={`Answer to: ${h.q}`}
            >
              {/* Question */}
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: "var(--text-heading)", fontFamily: "sans-serif" }}
              >
                {h.q}
              </p>

              {/* Answer */}
              <p
                className="text-base leading-8"
                style={{
                  color: (h.refused || h.isError) ? "var(--text-muted)" : "var(--text-body)",
                  fontStyle: h.refused ? "italic" : "normal",
                }}
              >
                {h.answer}
              </p>

              {/* Divider */}
              <p
                className="my-4 text-sm select-none"
                style={{ color: "var(--divider)" }}
                aria-hidden="true"
              >
                ✦
              </p>

              {/* Status badges */}
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Answer quality indicators">
                {h.isError ? (
                  <span
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border"
                    style={{ color: "var(--rose)", borderColor: "var(--rose-border)", backgroundColor: "var(--rose-bg)", fontFamily: "sans-serif" }}
                  >
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    error
                  </span>
                ) : h.refused ? (
                  <span
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border"
                    style={{ color: "var(--amber)", borderColor: "var(--amber-border)", backgroundColor: "var(--amber-bg)", fontFamily: "sans-serif" }}
                  >
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    outside knowledge base
                  </span>
                ) : (
                  <span
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border"
                    style={
                      h.ground.citationValid
                        ? { color: "var(--sage)", borderColor: "var(--sage-border)", backgroundColor: "var(--sage-bg)", fontFamily: "sans-serif" }
                        : { color: "var(--rose)", borderColor: "var(--rose-border)", backgroundColor: "var(--rose-bg)", fontFamily: "sans-serif" }
                    }
                    aria-label={h.ground.citationValid ? "Answer is grounded in text" : "Citation missing"}
                  >
                    {h.ground.citationValid
                      ? <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                      : <XCircle className="w-3 h-3" aria-hidden="true" />}
                    {h.ground.citationValid ? "grounded in text" : "citation missing"}
                  </span>
                )}

                {!h.isError && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{ color: "var(--text-muted)", borderColor: "var(--border)", backgroundColor: "var(--bg-base)", fontFamily: "sans-serif" }}
                    aria-label={`Groundedness score: ${Math.round(h.ground.groundednessScore * 100)} percent`}
                  >
                    {Math.round(h.ground.groundednessScore * 100)}% grounded
                  </span>
                )}

                {IS_MOCK_MODE && (
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-light)", fontFamily: "sans-serif" }}
                    aria-label="Running in mock mode — no API key"
                  >
                    [mock mode]
                  </span>
                )}
              </div>

              {/* Collapsible retrieved context */}
              {h.retrieved.length > 0 && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                  <button
                    onClick={() => toggleContext(i)}
                    aria-expanded={isOpen}
                    aria-controls={`context-${i}`}
                    className="flex items-center gap-1 text-xs transition-colors"
                    style={{ color: "var(--text-light)", fontFamily: "sans-serif" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-light)"; }}
                  >
                    {isOpen
                      ? <ChevronDown className="w-3 h-3" aria-hidden="true" />
                      : <ChevronRight className="w-3 h-3" aria-hidden="true" />}
                    {isOpen ? "Hide" : "Show"} retrieved passages
                  </button>

                  {isOpen && (
                    <div
                      id={`context-${i}`}
                      className="flex flex-col gap-2 mt-3"
                      role="list"
                      aria-label="Retrieved source passages"
                    >
                      {h.retrieved.map((c, ci) => (
                        <div
                          key={ci}
                          role="listitem"
                          className="text-xs rounded-lg p-3"
                          style={{ backgroundColor: "var(--bg-raised)", color: "var(--text-muted)", fontFamily: "sans-serif" }}
                        >
                          <span className="font-medium" style={{ color: "var(--teal)" }}>
                            [{ci + 1}] {c.docTitle}
                          </span>
                          <span style={{ color: "var(--text-light)" }}>
                            {" "}· sim {c.score.toFixed(3)}
                          </span>
                          <p className="mt-1 leading-5">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}

        {/* Loading skeleton */}
        {loading && (
          <div
            className="animate-fadeIn rounded-2xl border p-5 flex items-center gap-3"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            role="status"
            aria-label="Retrieving answer…"
          >
            <Loader2 className="w-4 h-4 animate-spin shrink-0" style={{ color: "var(--teal)" }} aria-hidden="true" />
            <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "Georgia, serif" }}>
              Listening…
            </span>
          </div>
        )}

        {/* Invisible scroll anchor */}
        <div ref={bottomRef} aria-hidden="true" />
      </div>

      {/* Sticky input bar */}
      <div
        className="flex gap-3 pt-2 sticky bottom-0 pb-2"
        style={{ backgroundColor: "var(--bg-base)" }}
        role="search"
        aria-label="Ask a question about the Bhagavad Gita"
      >
        <label htmlFor="gita-input" className="sr-only">
          Ask the Gita anything
        </label>
        <input
          id="gita-input"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(query);
            }
          }}
          placeholder="Ask what is on your heart…"
          disabled={loading}
          aria-disabled={loading}
          aria-describedby="input-hint"
          className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-colors border disabled:opacity-60"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text-body)",
            fontFamily: "Georgia, serif",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--teal-dim)";
            e.target.style.boxShadow = "0 0 0 3px rgba(74,140,127,0.10)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border)";
            e.target.style.boxShadow = "none";
          }}
        />
        <button
          onClick={() => handleSubmit(query)}
          disabled={loading || !query.trim()}
          aria-label="Send question"
          aria-disabled={loading || !query.trim()}
          className="flex items-center justify-center rounded-xl w-12 h-12 transition-colors disabled:opacity-40 shrink-0"
          style={{ backgroundColor: "var(--teal)", color: "#fff" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#3d7a6e"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--teal)"; }}
        >
          {loading
            ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            : <Send className="w-4 h-4" aria-hidden="true" />}
        </button>
      </div>
      <p id="input-hint" className="sr-only">Press Enter to offer your question</p>
    </div>
  );
}
