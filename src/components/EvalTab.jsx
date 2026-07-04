import React, { useState } from "react";
import { PlayCircle, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { EVAL_SET } from "../data/evalSet.js";
import { retrieve } from "../lib/retrieval.js";
import { getLLMResponse } from "../lib/llm.js";
import { checkGroundedness, REFUSAL_PATTERNS, scoreEvalRow, summarizeEval } from "../lib/eval.js";
import { TOP_K } from "../lib/constants.js";
import ScoreCard from "./ScoreCard.jsx";

/**
 * EvalTab — runs the automated evaluation suite and displays results.
 *
 * Eval pipeline per question:
 *   retrieve (top-k) → getLLMResponse → checkGroundedness → scoreEvalRow
 * Then summarizeEval aggregates all rows into the six headline metrics.
 *
 * @param {{ chunks: Array<object>, index: object }} props
 */
export default function EvalTab({ chunks, index }) {
  const [evalResults, setEvalResults] = useState(null);
  const [evalRunning, setEvalRunning] = useState(false);

  async function runEval() {
    setEvalRunning(true);
    const rows = [];

    for (const item of EVAL_SET) {
      const retrieved = retrieve(item.q, chunks, index, TOP_K);
      const answer = await getLLMResponse(item.q, retrieved);
      const ground = checkGroundedness(answer, retrieved);
      const refused = REFUSAL_PATTERNS.test(answer);
      const { pass, retrievalHit, keywordHits } = scoreEvalRow(item, answer, retrieved);
      rows.push({ ...item, retrieved, answer, ground, refused, retrievalHit, keywordHits, pass });
    }

    setEvalResults({ rows, summary: summarizeEval(rows) });
    setEvalRunning(false);
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-sm font-medium"
            style={{ color: "var(--text-heading)", fontFamily: "sans-serif" }}
          >
            Automated evaluation suite
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--text-muted)", fontFamily: "sans-serif" }}
          >
            {EVAL_SET.length} test cases · {EVAL_SET.filter((e) => e.type === "in-scope").length} in-scope ·{" "}
            {EVAL_SET.filter((e) => e.type === "out-of-scope").length} adversarial out-of-scope
          </p>
        </div>
        <button
          onClick={runEval}
          disabled={evalRunning}
          aria-busy={evalRunning}
          aria-label={evalRunning ? "Eval suite is running…" : "Run eval suite"}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-40 border"
          style={{
            backgroundColor: "var(--teal-bg)",
            borderColor: "var(--teal-dim)",
            color: "var(--teal)",
            fontFamily: "sans-serif",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d6edea"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--teal-bg)"; }}
        >
          {evalRunning
            ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            : <PlayCircle className="w-4 h-4" aria-hidden="true" />}
          {evalRunning ? "Running…" : "Run eval suite"}
        </button>
      </div>

      {/* Pre-run explanation */}
      {!evalResults && !evalRunning && (
        <div
          className="rounded-xl border p-5 text-sm leading-7"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text-muted)",
            fontFamily: "sans-serif",
          }}
          role="note"
          aria-label="Eval suite description"
        >
          This suite tests four things: whether the right passage was retrieved, whether citations are
          valid, how well answers are grounded in the source text, and whether the system correctly
          refuses the adversarial out-of-scope question instead of hallucinating an answer.
        </div>
      )}

      {/* Running indicator */}
      {evalRunning && (
        <div
          className="rounded-xl border p-5 flex items-center gap-3"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          role="status"
          aria-live="polite"
          aria-label="Eval in progress"
        >
          <Loader2 className="w-4 h-4 animate-spin shrink-0" style={{ color: "var(--teal)" }} aria-hidden="true" />
          <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "sans-serif" }}>
            Running {EVAL_SET.length} test cases…
          </span>
        </div>
      )}

      {/* Results */}
      {evalResults && (
        <section aria-label="Eval results">

          {/* Score card grid — 9 metrics in a responsive 3-col grid */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            role="list"
            aria-label="Summary metrics"
          >
            <div role="listitem">
              <ScoreCard
                label="Retrieval hit rate"
                value={`${Math.round(evalResults.summary.retrievalHitRate * 100)}%`}
                tone={evalResults.summary.retrievalHitRate >= 0.8 ? "good" : "warn"}
              />
            </div>
            <div role="listitem">
              <ScoreCard
                label="Citation validity"
                value={`${Math.round(evalResults.summary.citationValidRate * 100)}%`}
                tone={evalResults.summary.citationValidRate >= 0.8 ? "good" : "warn"}
              />
            </div>
            <div role="listitem">
              <ScoreCard
                label="Avg groundedness"
                value={`${Math.round(evalResults.summary.avgGroundedness * 100)}%`}
                tone={evalResults.summary.avgGroundedness >= 0.7 ? "good" : "warn"}
              />
            </div>
            <div role="listitem">
              <ScoreCard
                label="Keyword recall"
                value={`${Math.round(evalResults.summary.avgKeywordRecall * 100)}%`}
                tone={evalResults.summary.avgKeywordRecall >= 0.6 ? "good" : "warn"}
              />
            </div>
            <div role="listitem">
              <ScoreCard
                label="Answer relevance"
                value={`${Math.round(evalResults.summary.avgAnswerRelevance * 100)}%`}
                sub="question–answer vocab overlap"
                tone={evalResults.summary.avgAnswerRelevance >= 0.5 ? "good" : "warn"}
              />
            </div>
            <div role="listitem">
              <ScoreCard
                label="Coherence"
                value={`${Math.round(evalResults.summary.avgCoherence * 100)}%`}
                sub="structure · citation · no hedging"
                tone={evalResults.summary.avgCoherence >= 0.75 ? "good" : "warn"}
              />
            </div>
            <div role="listitem">
              <ScoreCard
                label="Topic coverage"
                value={`${Math.round(evalResults.summary.topicCoverageRate * 100)}%`}
                sub="topics with ≥1 passing answer"
                tone={evalResults.summary.topicCoverageRate >= 0.8 ? "good" : "warn"}
              />
            </div>
            <div role="listitem">
              <ScoreCard
                label="Hallucination guard"
                value={evalResults.summary.hallucinationGuardPass ? "Pass ✓" : "Fail ✗"}
                sub="all out-of-scope refused"
                tone={evalResults.summary.hallucinationGuardPass ? "good" : "bad"}
              />
            </div>
            <div role="listitem">
              <ScoreCard
                label="Overall pass rate"
                value={`${evalResults.summary.overallPass} / ${evalResults.summary.total}`}
                tone={
                  evalResults.summary.overallPass === evalResults.summary.total ? "good" : "warn"
                }
              />
            </div>
          </div>

          {/* Per-question breakdown */}
          <div className="flex flex-col gap-3 mt-6">
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-heading)", fontFamily: "sans-serif" }}
              id="per-question-heading"
            >
              Per-question breakdown
            </p>

            <ul
              className="flex flex-col gap-3"
              aria-labelledby="per-question-heading"
            >
              {evalResults.rows.map((r, i) => (
                <li
                  key={i}
                  className="rounded-xl border p-4"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                  aria-label={`Question ${i + 1}: ${r.pass ? "passed" : "failed"}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--text-heading)", fontFamily: "sans-serif" }}
                    >
                      {r.q}
                    </p>
                    {r.pass
                      ? <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: "var(--sage)" }}
                          aria-label="Passed"
                        />
                      : <XCircle
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: "var(--rose)" }}
                          aria-label="Failed"
                        />}
                  </div>

                  <p
                    className="text-xs leading-5 mb-3"
                    style={{ color: "var(--text-muted)", fontFamily: "sans-serif" }}
                  >
                    {r.answer}
                  </p>

                  <div className="flex flex-wrap gap-2" role="group" aria-label="Metrics">
                    {[
                      r.topic && r.topic,
                      r.type === "in-scope" && `retrieval: ${r.retrievalHit ? "✓ hit" : "✗ miss"}`,
                      `grounded: ${Math.round(r.ground.groundednessScore * 100)}%`,
                      r.keywordHits !== null && `keywords: ${Math.round(r.keywordHits * 100)}%`,
                      r.answerRelevance !== undefined && `relevance: ${Math.round(r.answerRelevance * 100)}%`,
                      r.coherenceScore !== undefined && `coherence: ${Math.round(r.coherenceScore * 100)}%`,
                      r.refused && "refused ✓",
                    ]
                      .filter(Boolean)
                      .map((label) => (
                        <span
                          key={label}
                          className="px-2 py-0.5 rounded-full text-xs border"
                          style={{
                            borderColor: "var(--border)",
                            color: "var(--text-muted)",
                            backgroundColor: "var(--bg-base)",
                            fontFamily: "sans-serif",
                          }}
                        >
                          {label}
                        </span>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
