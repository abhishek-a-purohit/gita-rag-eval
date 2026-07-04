

## Implementation Plan — Gita RAG Eval (Meditative UI + Clean Architecture)

**Problem Statement:**
Refactor `rag-eval-mvp.jsx` into a modular, well-documented project demonstrating RAG, hallucination detection, and automated eval — with a calm meditative UI using warm amber/indigo tones and preset question chips so users genuinely engage with the Gita's teachings.

**Source file:** `rag-eval-mvp.jsx` (single file, all logic + UI co-located)

**Target structure:**
```
src/
  data/
    kb.js           ← RAW_DOCS with JSDoc typedef
    evalSet.js      ← EVAL_SET with JSDoc typedef
  lib/
    retrieval.js    ← tokenize, chunkDoc, buildIndex, cosineSim, retrieve
    eval.js         ← checkGroundedness, REFUSAL_PATTERNS, scoreEvalRow, summarizeEval
    llm.js          ← getLLMResponse (mock + live modes)
  components/
    ScoreCard.jsx   ← pure display primitive
    KbTab.jsx       ← knowledge base viewer
    ChatTab.jsx     ← meditative chat UI with preset chips
    EvalTab.jsx     ← eval runner + score cards
  App.jsx           ← tab shell only, no business logic
  index.css         ← fadeIn keyframe animation
.env.example
README.md
```

---

**Task 1: Project scaffold + data files**
- Objective: Create `src/data/kb.js` exporting `RAW_DOCS` and `src/data/evalSet.js` exporting `EVAL_SET`, extracted verbatim from `rag-eval-mvp.jsx`. Add `@typedef` JSDoc on each data shape.
- Create `.env.example`:
  ```
  # Copy to .env and add your key for live Claude mode.
  # Leave blank to run in mock mode (no API key needed).
  VITE_ANTHROPIC_KEY=your_key_here
  ```
- Demo: Both files import cleanly in isolation with no dependencies.

**Task 2: `src/lib/retrieval.js`**
- Objective: Move `STOPWORDS`, `tokenize`, `chunkDoc`, `buildIndex`, `cosineSim`, `retrieve` as named exports. Add a one-line comment above each function. Ensure `"yoga"` and `"chapter"` are NOT in the stopword list.
- Demo: `retrieve("I feel lost about my purpose", chunks, index)` returns ranked chunks correctly in isolation.

**Task 3: `src/lib/eval.js`**
- Objective: Move `checkGroundedness` and `REFUSAL_PATTERNS` here. Add:
  - `scoreEvalRow(item, answer, retrieved)` → `{ pass, retrievalHit, keywordHits }`
  - `summarizeEval(rows)` → summary object (retrievalHitRate, citationValidRate, avgGroundedness, avgKeywordRecall, hallucinationGuardPass, overallPass, total)
- No React imports. Pure functions only.
- Demo: All functions callable in isolation, no framework dependency.

**Task 4: `src/lib/llm.js`**
- Objective: Export single async `getLLMResponse(query, chunks)`. Branch on `import.meta.env.VITE_ANTHROPIC_KEY`:
  - `// MOCK MODE` — returns `"Based on [chunks[0].docTitle]: [first sentence of chunks[0].text] [1]"` — citation-formatted string, no network call.
  - `// LIVE MODE` — calls `https://api.anthropic.com/v1/messages` with:
    - `model: "claude-sonnet-4-6"`, `max_tokens: 256`
    - System prompt (≤60 tokens): `"Answer using ONLY the numbered context. Cite every claim [N]. If context is insufficient reply: 'I don't have enough information.' Be concise: 1-3 sentences."`
    - Context format: `[N] (Title) text` joined by `\n`
  - Also export `IS_MOCK_MODE` boolean for the UI badge.
- Demo: Full chat and eval work in browser with no API key. Mock badge visible in chat.

**Task 5: `src/components/ScoreCard.jsx` + `src/components/KbTab.jsx`**
- Objective: Extract `ScoreCard` (props: `label`, `value`, `sub`, `tone`). Restyle with meditative palette:
  - good: `text-amber-300 border-amber-800/40 bg-amber-950/30`
  - warn: `text-stone-300 border-stone-700/40 bg-stone-900/30`
  - bad: `text-rose-300 border-rose-900/40 bg-rose-950/20`
  - neutral: `text-stone-400 border-stone-800 bg-indigo-950/40`
- Extract `KbTab` (props: `docs`). Card style: `bg-indigo-950/60 border-amber-900/20`, title `text-amber-300`, body `text-stone-400 leading-7`.
- Demo: KB tab renders with warm amber/indigo palette.

**Task 6: `src/components/ChatTab.jsx`**
- Objective: Extract chat tab. Props: `chunks`, `index`. Own state: `query`, `loading`, `history`.
- Empty state: render 4 preset chips:
  - *"Why does the Gita say grief is a mistake?"*
  - *"How do I act without fear of failure?"*
  - *"What is svadharma and why does it matter?"*
  - *"How did Gandhi interpret the Gita's teaching on action?"*
  - Chip style: `border border-amber-800/40 text-stone-300 bg-indigo-950/60 hover:bg-amber-950/30 rounded-full px-4 py-1.5 text-sm transition`
- Answer card:
  - Fade in via `animate-fadeIn` class (defined in `index.css`)
  - Question: `text-stone-200 font-medium`
  - Answer: `text-stone-100 leading-7`
  - `✦` glyph divider (`text-amber-800/60`) before badges
  - Retrieved context collapsed by default, `›`/`↓` toggle button in `text-stone-600`
  - Mock mode badge: small `[mock]` tag in `text-stone-500` if `IS_MOCK_MODE`
- Input: placeholder `"Ask the Gita anything..."`, `focus:border-amber-700` ring, `bg-indigo-950` background.
- Demo: Empty state shows chips. Click fires query. Answer fades in. Context hidden until toggled.

**Task 7: `src/components/EvalTab.jsx`**
- Objective: Extract eval tab. Props: `chunks`, `index`. Uses `getLLMResponse`, `scoreEvalRow`, `summarizeEval`. Own state: `evalResults`, `evalRunning`.
- Score card grid: 2-col on mobile, 3-col on sm+. Uses `ScoreCard` with meditative tones.
- Per-row result card: `bg-indigo-950/60 border-stone-800`, pass icon `text-amber-400`, fail icon `text-rose-400/70`.
- Demo: "Run eval suite" works in mock and live mode. All 6 score cards populate.

**Task 8: `src/App.jsx` + `src/index.css`**
- Objective: `App.jsx` — tab state only. `useMemo` for `chunks` and `index` from `RAW_DOCS`. Renders `<ChatTab>`, `<EvalTab>`, `<KbTab>`.
  - Background: `bg-indigo-950 min-h-screen`
  - Header: `✦ Bhagavad Gita` in `text-amber-300 text-xl font-semibold`, subtitle `text-stone-500 text-sm`
  - Tab bar: `border-amber-500` active, `text-stone-500 hover:text-stone-300` inactive
- `index.css`: add `@keyframes fadeIn { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }` and `.animate-fadeIn { animation: fadeIn 0.4s ease-out }`.
- Demo: Full app renders with meditative palette. All tabs work. `App.jsx` contains zero business logic.

**Task 9: `README.md`**
- Five sections:
  1. **What this is** — 2 sentences, no jargon
  2. **Concepts demonstrated** — RAG, hallucination guard, eval (problem → solution for each, plain English)
  3. **Project structure** — annotated file tree
  4. **Run it** — `npm install` / copy `.env.example` / add key or skip / `npm run dev`
  5. **Design decisions** — 5 bullets: TF-IDF over embeddings · 256 token cap · mock mode · meditative UI rationale · sentence-pair chunking strategy
- Demo: Hiring manager understands the project without reading code. Technical reader sees deliberate tradeoffs.
