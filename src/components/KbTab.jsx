import React, { useState, useMemo, useId } from "react";
import { Search, X } from "lucide-react";

/**
 * Krishna's five teaching stages — used to group knowledge-base documents.
 * Order follows the cumulative arc from Identity through to Liberation.
 */
const STAGES = [
  { id: 1, label: "Identity",    description: "Who am I? — soul, Atman, not the body or ego" },
  { id: 2, label: "Duty",        description: "What should I do? — dharma, svadharma" },
  { id: 3, label: "Action",      description: "How should I act? — karma yoga, nishkama karma" },
  { id: 4, label: "Devotion",    description: "Why do I act? — bhakti, offering to the divine" },
  { id: 5, label: "Liberation",  description: "What is the ultimate goal? — moksha, inner freedom" },
];

/**
 * Map each doc ID to its primary stage in Krishna's five-stage progression.
 * Mirrors DOC_STAGE in llm.js — kept here to avoid importing from a non-UI module.
 */
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
  D58: 3, D60: 3, D62: 3, D64: 3,
  D66: 3, D67: 3, D68: 3, D69: 3, D70: 3,

  C7: 4, C8: 4, C9: 4, C10: 4, C11: 4, C12: 4,
  V7: 4, V8: 4, V9: 4, V10: 4, V11: 4,
  D3: 4, D16: 4, D19: 4, D20: 4, D23: 4, D24: 4,
  D32: 4, D33: 4, D40: 4, D42: 4, D44: 4, D49: 4, D50: 4,
  D57: 4, D59: 4, D63: 4,
  D71: 4, D72: 4,

  C18: 5, D4: 5, D5: 5, D6: 5, V12: 5,
  D34: 5, D39: 5, D46: 5, D51: 5, E2: 5, E3: 5, E6: 5,
  D61: 5, D65: 5,
};

/** Normalise text for fuzzy search — lowercase, collapse whitespace. */
function normalise(s) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

/**
 * KbTab — Knowledge-base viewer with full-text search and stage grouping.
 *
 * Search filters both titles and passage text in real-time (no debounce
 * needed — TF-IDF is synchronous and the corpus is small).
 *
 * Stage tabs group documents by Krishna's five-stage arc, making it easy
 * to navigate the knowledge base by theme rather than scanning a flat list.
 *
 * @param {{ docs: Array<{id: string, title: string, text: string}> }} props
 */
export default function KbTab({ docs }) {
  const [query, setQuery] = useState("");
  const [activeStage, setActiveStage] = useState(0); // 0 = all stages
  const searchInputId = useId();

  // Filter docs by search query AND active stage tab.
  const filtered = useMemo(() => {
    const q = normalise(query);
    return docs.filter((d) => {
      const matchesSearch =
        q === "" ||
        normalise(d.title).includes(q) ||
        normalise(d.text).includes(q);
      const matchesStage =
        activeStage === 0 || (DOC_STAGE[d.id] ?? 3) === activeStage;
      return matchesSearch && matchesStage;
    });
  }, [docs, query, activeStage]);

  // Highlight matching text fragments in search results.
  function highlight(text) {
    if (!query.trim()) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escaped})`, "gi"));
    return parts.map((part, i) =>
      new RegExp(`^${escaped}$`, "i").test(part)
        ? <mark key={i} style={{ backgroundColor: "var(--teal-bg)", color: "var(--teal)", borderRadius: "2px", padding: "0 2px" }}>{part}</mark>
        : part
    );
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Search input */}
      <div className="relative">
        <label htmlFor={searchInputId} className="sr-only">
          Search knowledge base
        </label>
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: "var(--text-light)" }}
          aria-hidden="true"
        />
        <input
          id={searchInputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search passages…"
          aria-label="Search knowledge base passages"
          aria-controls="kb-list"
          className="w-full rounded-xl pl-9 pr-9 py-2.5 text-sm border outline-none transition-colors"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text-body)",
            fontFamily: "sans-serif",
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
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-light)" }}
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Stage filter tabs */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter by teaching stage"
      >
        {[{ id: 0, label: "All stages" }, ...STAGES].map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={activeStage === s.id}
            aria-controls="kb-list"
            onClick={() => setActiveStage(s.id)}
            title={s.description}
            className="rounded-full px-3 py-1 text-xs border transition-colors"
            style={
              activeStage === s.id
                ? {
                    backgroundColor: "var(--teal)",
                    borderColor: "var(--teal)",
                    color: "#fff",
                    fontFamily: "sans-serif",
                  }
                : {
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                    fontFamily: "sans-serif",
                  }
            }
            onMouseEnter={(e) => {
              if (activeStage !== s.id) e.currentTarget.style.backgroundColor = "var(--teal-bg)";
            }}
            onMouseLeave={(e) => {
              if (activeStage !== s.id) e.currentTarget.style.backgroundColor = "var(--bg-card)";
            }}
          >
            {s.id !== 0 && <span aria-hidden="true">{s.id}. </span>}
            {s.label}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p
        className="text-xs"
        style={{ color: "var(--text-muted)", fontFamily: "sans-serif" }}
        aria-live="polite"
        aria-atomic="true"
      >
        {filtered.length} passage{filtered.length !== 1 ? "s" : ""} — chunked and indexed for cosine-similarity retrieval
      </p>

      {/* Document list */}
      <ul
        id="kb-list"
        role="tabpanel"
        className="flex flex-col gap-4"
        aria-label={
          activeStage === 0
            ? "All knowledge-base passages"
            : `Stage ${activeStage} passages: ${STAGES.find((s) => s.id === activeStage)?.label}`
        }
      >
        {filtered.length === 0 ? (
          <li>
            <p
              className="text-sm py-8 text-center"
              style={{ color: "var(--text-muted)", fontFamily: "sans-serif" }}
            >
              No passages match "{query}".
            </p>
          </li>
        ) : (
          filtered.map((d) => {
            const stage = DOC_STAGE[d.id] ?? 3;
            const stageInfo = STAGES.find((s) => s.id === stage);
            return (
              <li
                key={d.id}
                className="rounded-xl border p-5"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                {/* Stage badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--teal)" }}
                  >
                    {highlight(d.title)}
                  </p>
                  <span
                    className="shrink-0 text-xs px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: "var(--teal-dim)",
                      color: "var(--teal)",
                      backgroundColor: "var(--teal-bg)",
                      fontFamily: "sans-serif",
                    }}
                    aria-label={`Stage ${stage}: ${stageInfo?.label}`}
                  >
                    {stage}. {stageInfo?.label}
                  </span>
                </div>
                <p
                  className="text-sm leading-7"
                  style={{ color: "var(--text-body)" }}
                >
                  {highlight(d.text)}
                </p>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
