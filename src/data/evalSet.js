/**
 * @typedef {{ q: string, expectedDoc: string|null, keywords: string[], type: 'in-scope'|'out-of-scope', topic: string }} EvalItem
 */

/**
 * Evaluation test set.
 *
 * Coverage:
 *   - 11 original cases (chapter/commentator attribution + expert corrections)
 *   - 10 real-life topic cases covering every major topic rule
 *   - 2 adversarial out-of-scope cases (hallucination guard)
 *
 * Each in-scope item specifies:
 *   expectedDoc  — the single KB doc that MUST appear in retrieved chunks
 *   keywords     — domain terms the answer must contain (recall signal)
 *   topic        — human-readable label for grouping in reports
 *
 * @type {EvalItem[]}
 */
export const EVAL_SET = [
  // ── Original 6 (chapter/commentator attribution) ──────────────────────────
  {
    q: "According to Chapter 2, why is grieving over death described as a mistake?",
    expectedDoc: "D1",
    keywords: ["eternal", "self"],
    type: "in-scope",
    topic: "identity",
  },
  {
    q: "What does Chapter 3 say Karma Yoga actually requires?",
    expectedDoc: "C3",
    keywords: ["duty", "svadharma"],
    type: "in-scope",
    topic: "action",
  },
  {
    q: "What qualities does Chapter 12 praise in a devotee?",
    expectedDoc: "D3",
    keywords: ["compassion", "devotion"],
    type: "in-scope",
    topic: "devotion",
  },
  {
    q: "How does Chapter 18 relate the paths of knowledge, action, and devotion to each other?",
    expectedDoc: "D4",
    keywords: ["complementary", "duty"],
    type: "in-scope",
    topic: "liberation",
  },
  {
    q: "How does Adi Shankara's Advaita commentary describe the ultimate goal?",
    expectedDoc: "D5",
    keywords: ["brahman", "liberation"],
    type: "in-scope",
    topic: "liberation",
  },
  {
    q: "How did Gandhi interpret the Gita's teaching on action?",
    expectedDoc: "D6",
    keywords: ["non-violent", "attachment"],
    type: "in-scope",
    topic: "action",
  },

  // ── 5 expert-correction cases ─────────────────────────────────────────────
  {
    q: "The Gita says detach from results — does that mean I should not care about doing my duty?",
    expectedDoc: "E1",
    keywords: ["dharma", "duty"],
    type: "in-scope",
    topic: "duty",
  },
  {
    q: "What does Chapter 18 verse 66 really mean — is Krishna asking us to give up responsibility?",
    expectedDoc: "E3",
    keywords: ["surrender", "ego"],
    type: "in-scope",
    topic: "surrender",
  },
  {
    q: "What is ahamkara and why does the Gita say it is the root of all problems?",
    expectedDoc: "E4",
    keywords: ["ego", "ahamkara"],
    type: "in-scope",
    topic: "ego",
  },
  {
    q: "How should I practically apply the Gita's teachings in my daily life?",
    expectedDoc: "E5",
    keywords: ["duty", "practice"],
    type: "in-scope",
    topic: "action",
  },
  {
    q: "What is the Gita's deepest teaching — is it really just about not expecting results?",
    expectedDoc: "E6",
    keywords: ["transformation", "doer"],
    type: "in-scope",
    topic: "liberation",
  },

  // ── 10 real-life topic cases (one per major topic rule) ───────────────────

  // Sadness / depression
  {
    q: "I feel deeply sad and I don't know how to get through this. What does the Gita say?",
    expectedDoc: "D15",
    keywords: ["sadness", "temporary", "self"],
    type: "in-scope",
    topic: "sadness",
  },

  // Failure / resilience
  {
    q: "How do I deal with failure and bounce back when everything I tried has gone wrong?",
    expectedDoc: "D12",
    keywords: ["failure", "equanimity", "action"],
    type: "in-scope",
    topic: "failure",
  },

  // Death / afterlife
  {
    q: "What happens to the soul after death according to the Bhagavad Gita?",
    expectedDoc: "D10",
    keywords: ["soul", "eternal", "body"],
    type: "in-scope",
    topic: "death",
  },

  // Happiness / joy
  {
    q: "How can I find true and lasting happiness in my life?",
    expectedDoc: "D23",
    keywords: ["happiness", "inner", "peace"],
    type: "in-scope",
    topic: "happiness",
  },

  // Anxiety / overthinking
  {
    q: "My mind won't stop overthinking and I can't find peace. What does Krishna teach about this?",
    expectedDoc: "D17",
    keywords: ["mind", "practice", "stillness"],
    type: "in-scope",
    topic: "anxiety",
  },

  // Fear / courage
  {
    q: "I am terrified of what lies ahead. How does the Gita help me overcome fear?",
    expectedDoc: "D21",
    keywords: ["fear", "soul", "fearless"],
    type: "in-scope",
    topic: "fear",
  },

  // Purpose / meaning
  {
    q: "What is the purpose of life according to the Bhagavad Gita?",
    expectedDoc: "D7",
    keywords: ["purpose", "dharma", "soul"],
    type: "in-scope",
    topic: "purpose",
  },

  // Anger / ego
  {
    q: "How do I control my anger and stop letting my ego destroy my relationships?",
    expectedDoc: "D27",
    keywords: ["anger", "desire", "attachment"],
    type: "in-scope",
    topic: "anger",
  },

  // Confidence / self-worth
  {
    q: "I constantly doubt myself and feel like I am not good enough. What does the Gita say?",
    expectedDoc: "D35",
    keywords: ["self", "confidence", "soul"],
    type: "in-scope",
    topic: "confidence",
  },

  // Duty / dharma / decision
  {
    q: "I have a very difficult decision to make and I don't know what the right thing to do is.",
    expectedDoc: "D45",
    keywords: ["dharma", "duty", "svadharma"],
    type: "in-scope",
    topic: "duty",
  },

  // ── Adversarial out-of-scope ───────────────────────────────────────────────
  {
    q: "What verse number in the Gita specifically discusses artificial intelligence?",
    expectedDoc: null,
    keywords: [],
    type: "out-of-scope",
    topic: "adversarial",
  },
  {
    q: "Who won the Cricket World Cup and what does the Gita say about batting technique?",
    expectedDoc: null,
    keywords: [],
    type: "out-of-scope",
    topic: "adversarial",
  },
];
