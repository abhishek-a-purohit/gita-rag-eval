import React from "react";

const TONE_STYLES = {
  good:    { color: "var(--sage)",  borderColor: "var(--sage-border)",  backgroundColor: "var(--sage-bg)" },
  warn:    { color: "var(--amber)", borderColor: "var(--amber-border)", backgroundColor: "var(--amber-bg)" },
  bad:     { color: "var(--rose)",  borderColor: "var(--rose-border)",  backgroundColor: "var(--rose-bg)" },
  neutral: { color: "var(--text-body)", borderColor: "var(--border)",  backgroundColor: "var(--bg-card)" },
};

export default function ScoreCard({ label, value, sub, tone = "neutral" }) {
  const s = TONE_STYLES[tone] ?? TONE_STYLES.neutral;
  return (
    <div className="rounded-xl border px-4 py-3" style={s}>
      <p className="text-xs uppercase tracking-widest opacity-60" style={{ fontFamily: "sans-serif" }}>{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      {sub && <p className="text-xs mt-1 opacity-50">{sub}</p>}
    </div>
  );
}
