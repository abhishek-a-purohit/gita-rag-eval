import React, { useState, useMemo } from "react";
import { MessageSquare, BarChart3, BookOpen } from "lucide-react";
import { RAW_DOCS } from "./data/kb.js";
import { chunkDoc, buildIndex } from "./lib/retrieval.js";
import ChatTab from "./components/ChatTab.jsx";
import EvalTab from "./components/EvalTab.jsx";
import KbTab from "./components/KbTab.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const TABS = [
  { id: "chat", label: "Ask",         Icon: MessageSquare },
  { id: "eval", label: "Eval report", Icon: BarChart3 },
  { id: "kb",   label: "Teachings",   Icon: BookOpen },
];

/**
 * App — root shell.
 *
 * Responsibilities:
 *  - Build and memoize the chunk array + TF-IDF index once on mount so
 *    every tab shares the same pre-computed retrieval structures.
 *  - Manage the active tab — no business logic lives here.
 *  - Wrap all content in an ErrorBoundary so an uncaught render error in
 *    any child never produces a blank white screen in production.
 */
export default function App() {
  const [tab, setTab] = useState("chat");

  // Compute retrieval data structures once — expensive but deterministic.
  const chunks = useMemo(() => RAW_DOCS.flatMap(chunkDoc), []);
  const index  = useMemo(() => buildIndex(chunks), [chunks]);

  return (
    <ErrorBoundary>
      <div
        className="w-full min-h-screen flex flex-col"
        style={{ backgroundColor: "var(--bg-base)", color: "var(--text-body)" }}
      >

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header
          className="px-6 pt-7 pb-5 border-b"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
        >
          <h1
            className="text-2xl font-semibold tracking-wide"
            style={{ color: "var(--text-heading)", fontFamily: "Georgia, serif" }}
          >
            ✦ Bhagavad Gita
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            A quiet place to seek wisdom — ask anything about life, purpose, grief, or the soul
          </p>
        </header>

        {/* ── Tab bar ─────────────────────────────────────────────────────── */}
        <nav
          aria-label="Main navigation"
          className="flex px-6 border-b"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
        >
          <div role="tablist" aria-label="Application tabs" className="flex">
            {TABS.map(({ id, label, Icon }) => {
              const isActive = tab === id;
              return (
                <button
                  key={id}
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${id}`}
                  onClick={() => setTab(id)}
                  className="flex items-center gap-1.5 text-sm px-4 py-3 border-b-2 -mb-px transition-colors"
                  style={
                    isActive
                      ? { borderColor: "var(--teal)", color: "var(--teal)" }
                      : { borderColor: "transparent", color: "var(--text-muted)" }
                  }
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-body)"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* ── Tab panels ──────────────────────────────────────────────────── */}
        <main
          id={`panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          className="flex-1 px-6 py-7 overflow-auto"
          style={{ maxWidth: "860px", margin: "0 auto", width: "100%" }}
        >
          {tab === "chat" && <ChatTab chunks={chunks} index={index} />}
          {tab === "eval" && <EvalTab chunks={chunks} index={index} />}
          {tab === "kb"   && <KbTab docs={RAW_DOCS} />}
        </main>

      </div>
    </ErrorBoundary>
  );
}
