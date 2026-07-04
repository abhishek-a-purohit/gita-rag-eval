# ✦ Bhagavad Gita — RAG + Soulful AI

A browser-based **Retrieval-Augmented Generation** system built on the Bhagavad Gita.  
Ask any question about life, purpose, grief, fear, or the soul — and receive a grounded,
citation-verified answer drawn directly from the Gita's 18 chapters, key verses, and
soulful life-topic passages.

**No backend. No database. Runs entirely in your browser.**  
Works immediately in **Mock mode** with zero setup, or connects to Claude in **Live mode **
with an Anthropic API key.

---

## Live Demo

> **[▶ Open the Soul](https://abhishek-a-purohit.github.io/gita-rag-eval/)**

---

## Mock Mode vs Live Mode — What's the Difference?

This is the most important thing to understand about the app.

### Mock Mode (default — no API key needed)

| What happens | Detail |
|---|---|
| **Who answers** | A deterministic in-browser composer (`composeAnswer`) |
| **How it works** | Retrieves the top-k passages, then assembles an answer by picking the best chunk per teaching stage and stitching them with Krishna-voiced bridge phrases |
| **Speed** | Instant — zero network calls |
| **Cost** | Free forever |
| **Quality** | High — follows the same Identity → Duty → Action → Devotion → Liberation arc, cites sources, opens with emotional acknowledgment when needed |
| **Limitation** | Cannot synthesise across passages or rephrase in truly novel ways; every answer is assembled from actual Gita text rather than generated |
| **Badge shown** | `[mock mode]` appears in grey under each answer |

**When to use mock mode:** demos, offline use, testing the retrieval pipeline, checking eval scores, or any time you do not have an API key.

---

### Live Mode (requires Anthropic API key)

| What happens | Detail |
|---|---|
| **Who answers** | Claude (`claude-sonnet-5`) via the Anthropic Messages API |
| **How it works** | The retrieved passages are injected into a carefully engineered system prompt that instructs Claude to speak as Krishna — grounded only in the retrieved context, with inline citations |
| **Speed** | 1–4 seconds depending on network and Claude's load |
| **Cost** | ~$0.001–0.003 per question at current Sonnet 5 pricing |
| **Quality** | Highest — Claude synthesises across passages, paraphrases naturally, adapts tone to emotional context, and maintains multi-turn conversation memory |
| **Limitation** | Requires an API key; uses network; subject to Anthropic rate limits |
| **Badge shown** | No `[mock mode]` badge — a `grounded in text` / `citation missing` badge appears instead |

**When to use live mode:** production use, richer answers, multi-turn conversations where context matters, or when you want the full Krishna-voice experience.

---

### How to switch between modes

```
Mock mode  →  Just open the app. No configuration needed.

Live mode  →  Add your API key (see setup below).
               The [mock mode] badge disappears automatically.
```

The entire retrieval pipeline — chunking, TF-IDF + BM25 scoring, topic routing,
groundedness evaluation — runs **identically in both modes**. The only difference
is the final generation step.

---

## Quick Start

### Option A — Mock mode (zero setup)

```bash
git clone https://github.com/abhishek-a-purohit/gita-rag-eval.git
cd gita-rag-eval
npm install
npm run dev
```

Open `http://localhost:5173`. Ask anything. The `[mock mode]` badge confirms no
API key is needed.

---

### Option B — Live mode (Claude answers)

```bash
git clone https://github.com/abhishek-a-purohit/gita-rag-eval.git
cd gita-rag-eval
npm install

# Create your .env file
cp .env.example .env
```

Edit `.env` and paste your key:

```
VITE_ANTHROPIC_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Get a key at [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key.

```bash
npm run dev
```

Open `http://localhost:5173`. The `[mock mode]` badge will be **gone** — Claude is now
answering, drawing only from the retrieved Gita passages.

> **Security note:** `.env` is in `.gitignore` and will never be committed.
> Never paste your key anywhere in the source code.

---

## What You Can Ask

The app answers any sincere question about life, meaning, and the inner world:

| Category | Example questions |
|---|---|
| **Identity / Soul** | "Who am I really?" · "What is the Atman?" · "Is there life after death?" |
| **Purpose** | "What is the purpose of my life?" · "How do I find my dharma?" |
| **Suffering** | "I feel lost and don't know what to do" · "Why do good people suffer?" |
| **Relationships** | "What is the difference between love and attachment?" · "How do I forgive?" |
| **Action** | "How should I make a difficult decision?" · "What is karma yoga?" |
| **Mind** | "How do I quiet my overthinking mind?" · "How do I start meditating?" |
| **Fear / Courage** | "I am terrified of death" · "How do I build self-confidence?" |
| **Happiness** | "How can I find true happiness?" · "What is inner peace?" |
| **Surrender** | "What does Chapter 18.66 really mean?" · "How do I trust God?" |

The system refuses off-topic questions (sports, finance, politics) and explains why.

---

## Architecture

```
src/
├── data/
│   ├── kb.js          # 70+ RAW_DOCS — all 18 chapters, key verses, life topics
│   └── evalSet.js     # 23 eval cases: 21 in-scope + 2 adversarial out-of-scope
│
├── lib/
│   ├── constants.js   # Single source of truth for all thresholds and tuning params
│   ├── retrieval.js   # tokenize · chunkDoc · buildIndex · buildBM25Index · retrieve
│   │                  # + query expansion · topic routing · RRF fusion · stage boost
│   ├── eval.js        # checkGroundedness · scoreEvalRow · summarizeEval
│   └── llm.js         # getLLMResponse · composeAnswer (mock) · fetchWithRetry (live)
│
├── hooks/
│   ├── useRag.js          # Full RAG pipeline as a reusable hook; owns chat history
│   └── useLocalStorage.js # Generic persist-to-localStorage hook
│
└── components/
    ├── ChatTab.jsx        # Conversation UI — chips, multi-turn history, source viewer
    ├── EvalTab.jsx        # Automated eval suite — 9 metrics, per-question breakdown
    ├── KbTab.jsx          # KB browser — full-text search + stage grouping + highlight
    ├── ScoreCard.jsx      # Metric display primitive (good / warn / bad tones)
    └── ErrorBoundary.jsx  # Catches render errors, shows graceful Gita-voiced fallback
```

### Retrieval pipeline (same in both modes)

```
User query
    │
    ▼
isOffTopic? ──yes──► polite refusal
    │ no
    ▼
tokenize → query expansion (synonym injection for short/emotional queries)
    │
    ▼
TF-IDF cosine score  +  BM25 score  →  Reciprocal Rank Fusion (RRF)
    │
    ▼
Stage boost (+8% for chunks whose teaching stage matches query intent)
    │
    ▼
Topic routing: mustInclude pins  +  softExclude demotions
    │
    ▼
top-k chunks
    │
    ├── Mock mode ──► composeAnswer() — stage-ordered, Krishna-voiced, no network
    └── Live mode ──► Claude API (AbortController timeout + exponential retry)
                          │
                          ▼
                     answer string
                          │
                          ▼
                checkGroundedness() → citation validity + token-overlap score
                          │
                          ▼
                     UI answer card (badges: grounded / citation / mode)
```

---

## Retrieval: TF-IDF + BM25 + RRF

Both scorers run on every query and their ranked lists are merged via
**Reciprocal Rank Fusion** — a scale-invariant merging algorithm that rewards
chunks ranking high in both lists.

| | TF-IDF | BM25 |
|---|---|---|
| TF saturation | Grows unbounded | Capped by k₁ = 1.5 |
| Length normalisation | None | Penalises longer chunks (b = 0.75) |
| When better | Short, uniform-length chunks | Variable-length corpora |
| Fusion | Combined via RRF (k=60) | Combined via RRF (k=60) |

---

## Automated Evaluation

Run from the **Eval report** tab. In mock mode all 23 cases resolve in under 2 seconds.

| Metric | What it measures | Pass threshold |
|---|---|---|
| Retrieval hit rate | Target doc in top-k results | ≥ 80% |
| Citation validity | All `[N]` markers in-range | ≥ 80% |
| Avg groundedness | Token-overlap: answer vs retrieved | ≥ 70% |
| Keyword recall | Expected domain terms present | ≥ 60% |
| Answer relevance | Question–answer vocabulary overlap | ≥ 50% |
| Coherence | Structure · citations · no hedging | ≥ 75% |
| Topic coverage | Topics with ≥ 1 passing answer | ≥ 80% |
| **Hallucination guard** | Out-of-scope questions refused | Must pass |
| Overall pass rate | All criteria across all cases | 23 / 23 |

---

## Key Design Decisions

**Soul-first answer arc** — Both mock and live mode follow Krishna's five-stage
teaching progression: Identity → Duty → Action → Devotion → Liberation.
Emotional queries open with acknowledgment before any teaching. Every answer
closes with a note of genuine hope.

**Query expansion** — Short emotional queries ("I feel sad", "why do I suffer")
share almost no tokens with the knowledge base. A domain-specific expansion map
appends synonym tokens before scoring so TF-IDF and BM25 have content to match.

**Topic routing** — For 15 predictable question patterns (grief, death, karma, etc.)
a `mustInclude` list pins the right docs even when their score is low. `softExclude`
demotes war-context docs for general-life questions.

**Two-layer hallucination guard** — A regex topic blocklist runs before retrieval
(sports, finance, politics, etc.). The relevance threshold catches everything else.
The adversarial eval cases confirm both layers work end-to-end.

**`useRag` hook** — All retrieval + LLM logic is in one hook. `ChatTab` owns
zero business logic — it manages only local UI state. The same hook powers the
Eval tab with no duplication.

**Conversation memory** — The last 3 turns are passed to Claude in live mode so
follow-up questions maintain context. History persists across page refreshes via
`useLocalStorage`.

**Calming UI palette** — Warm ivory background, muted teal accents, soft sage/rose.
Serif body font. Designed for users under stress — research supports soft greens
for reducing cortisol; high-contrast reads as alarming.

---

## Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Icons | lucide-react |
| Live generation | Anthropic `claude-sonnet-5` |
| Deployment | GitHub Pages (via `vite.config.js` base) |

No backend. No database. No auth. No server-side code.

---

## Deploy to GitHub Pages

```bash
npm run build
# dist/ is ready — push and enable GitHub Pages on the gh-pages branch
# or use the Actions workflow below
```

Or add this GitHub Actions workflow (`.github/workflows/deploy.yml`) to auto-deploy
on every push to `main`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

> **Live mode on GitHub Pages:** GitHub Pages cannot store secrets.
> For a public live-mode demo, deploy to [Vercel](https://vercel.com) or
> [Netlify](https://netlify.com) instead — both support environment variables
> via their dashboard. Set `VITE_ANTHROPIC_KEY` there and remove the `base`
> from `vite.config.js` (Vercel/Netlify serve from root `/`).

---

## Contributing

Pull requests welcome. The knowledge base (`src/data/kb.js`) is the easiest
place to start —: every doc follows the same `{ id, title, text }` shape.
Add new life-topic passages, deepen existing ones, or expand the eval set.

For questions, suggestions, or to share how the Gita helped you:
📧 [abhishek.n.purohit@gmail.com](mailto:abhishek.n.purohit@gmail.com)

---

*Built with the Bhagavad Gita's teaching that the finest work is offered freely,
without attachment to what comes back. — Gita 3.19*
