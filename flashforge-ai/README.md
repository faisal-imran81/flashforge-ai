# FlashForge AI ⚡

> Transform your notes into study-ready flashcards in seconds using AI.

![Lighthouse Performance](https://img.shields.io/badge/Performance-90-green)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-95-green)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-100-green)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100-green)
![Tests](https://img.shields.io/badge/Tests-20%20passing-green)

## 🌐 Live Demo

**[https://flashforge-ai-ten.vercel.app/](https://flashforge-ai-ten.vercel.app/)**

---

## 📖 Project Brief

Students waste hours manually creating flashcards from lecture notes — time that should be spent actually studying. FlashForge AI solves this by letting students paste any notes or topic and instantly generating a set of study-ready flashcards powered by Groq's LLM. The app targets university students who want to study smarter, not harder. I chose this problem because it is one I face personally as a CS student, and because AI is genuinely the right tool for it — extracting key concepts from unstructured notes is exactly the kind of task that benefits from language model intelligence.

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/faisal-imran81/flashforge-ai.git
cd flashforge-ai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Add your Groq API key to .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> A new developer can be running locally in under 5 minutes.

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GROQ_API_KEY` | Your Groq API key from console.groq.com | ✅ Yes |

Get a free API key at [console.groq.com](https://console.groq.com)

---

## 🏗️ Architecture Overview

flashforge-ai/
├── app/
│ ├── layout.tsx # Root layout with theme provider
│ ├── page.tsx # Main page — orchestrates all components
│ ├── globals.css # Global styles + Tailwind v4 dark mode
│ └── api/
│ └── generate/
│ └── route.ts # Server-side API route — calls Groq API
├── components/
│ ├── InputPanel.tsx # Notes textarea + card count selector
│ ├── FlashcardDeck.tsx # Card navigation + keyboard shortcuts
│ ├── FlashcardItem.tsx # Single card with 3D flip animation
│ ├── ProgressBar.tsx # Known/remaining progress tracker
│ ├── LoadingSpinner.tsx # Skeleton loader during generation
│ ├── ErrorMessage.tsx # Error display with retry action
│ ├── EmptyState.tsx # Initial empty state UI
│ ├── ThemeToggle.tsx # Dark/light mode toggle
│ └── Providers.tsx # next-themes provider wrapper
├── hooks/
│ └── useFlashcards.ts # Core state logic — generate, flip, mark, shuffle
├── lib/
│ ├── groq.ts # Client-side fetch to API route
│ └── types.ts # Shared TypeScript interfaces
└── tests/ # Vitest unit tests


**Data flow:**

User Input → InputPanel → useFlashcards hook → /api/generate route → Groq API → Flashcard UI


---

## 🤖 AI Integration

### Model
- **Provider:** Groq
- **Model:** `groq/compound`
- **Why Groq:** Fast inference, generous free tier, reliable uptime

### What the AI Does
The AI receives unstructured student notes and extracts key concepts, terms, and relationships — converting them into structured question/answer pairs suitable for active recall study.

### Why AI is Appropriate
Extracting meaningful flashcards from raw notes requires understanding context, identifying what is important, and formulating clear questions. This is not solvable with simple parsing — it genuinely requires language model intelligence.

### Prompt Used

You are a study assistant. Given the notes below, generate exactly {count} flashcards.

Respond ONLY with valid JSON in this exact format, no markdown, no explanation, no code blocks:
{
"cards": [
{ "front": "question or term", "back": "answer or definition" }
]
}

Notes:
{user_notes}


### Expected Output Structure

```json
{
  "cards": [
    {
      "front": "What is photosynthesis?",
      "back": "The process by which plants convert sunlight into glucose using CO2 and water."
    }
  ]
}
```

### Failure Handling

| Scenario | Response |
|---|---|
| Groq API down | Error banner + retry button shown |
| JSON parse failure | Caught by try/catch — user shown friendly message |
| Empty notes submitted | Client-side validation blocks API call |
| Rate limited (429) | Specific message: "Too many requests, please wait" |
| Network failure | Fetch catch block — "Network error" message shown |
| Empty cards array | Validated server-side — error returned to client |

---

## ✅ Testing

### Run Tests

```bash
npx vitest run
```

### Test Results

✓ tests/groq.test.ts (3 tests)
✓ tests/EmptyState.test.tsx (2 tests)
✓ tests/ErrorMessage.test.tsx (4 tests)
✓ tests/ProgressBar.test.tsx (5 tests)
✓ tests/InputPanel.test.tsx (6 tests)

Test Files 5 passed (5)
Tests 20 passed (20)


### What is Tested
- **ErrorMessage** — renders correctly, retry button fires, role="alert" present
- **ProgressBar** — counts correct, completion message, zero-total edge case
- **EmptyState** — heading and helper text render
- **InputPanel** — disabled state, enables on input, calls onGenerate correctly, loading state
- **groq.ts** — success path, failed response, network error (fetch mock)

---

## 🎨 Features

- 📝 **AI Flashcard Generation** — paste notes, get cards instantly
- 🃏 **3D Flip Animation** — real flashcard feel with CSS 3D transforms
- ⌨️ **Keyboard Shortcuts** — `←→` navigate, `K` = Got It, `U` = Still Learning
- 🌙 **Dark / Light Mode** — system preference aware, persisted
- 🔀 **Shuffle Mode** — randomize card order for better retention
- 💾 **Auto Save** — deck persists across page reloads via localStorage
- 📊 **Progress Tracking** — know vs remaining counter with progress bar
- ♿ **Accessible** — WCAG 2.1 AA, keyboard navigable, screen reader friendly

---

## ♿ Accessibility

- Semantic HTML throughout (`<main>`, `<header>`, `<footer>`, `<section>`)
- All interactive elements have `aria-label`
- Error messages use `role="alert"`
- Loading state uses `aria-live="polite"`
- Flip card uses `role="button"` with keyboard support (`Enter`, `Space`)
- Progress bar uses `role="progressbar"` with `aria-valuenow/min/max`
- Card count buttons use `aria-pressed` for toggle state
- `prefers-reduced-motion` respected — animations disabled when set
- Lighthouse Accessibility score: **95**

### Concrete Improvement Made
During audit, the flip card had no keyboard interaction. Added `onKeyDown` handler for `Enter` and `Space` keys, and added descriptive `aria-label` that updates based on flip state — improving screen reader experience significantly.

---

## 📊 Performance & Lighthouse

Tested on mobile (Lighthouse — Chrome DevTools):

| Metric | Score |
|---|---|
| Performance | 90 ✅ |
| Accessibility | 95 ✅ |
| Best Practices | 100 ✅ |
| SEO | 100 ✅ |

---

## 🚢 Deployment

**Platform:** Vercel
**URL:** [https://flashforge-ai-ten.vercel.app/](https://flashforge-ai-ten.vercel.app/)

### Deployment Checklist
- [x] Environment variables set in Vercel dashboard
- [x] Production build tested locally (`npm run build`)
- [x] All 20 tests passing before deploy
- [x] Lighthouse audit run on production URL
- [x] Error states manually verified
- [x] Dark mode verified on production
- [x] Mobile layout verified

### How it Fails Safely
- API errors return structured JSON with `success: false` and human-readable `error` message
- Client always shows error UI with retry button — never a blank screen
- Invalid AI output is caught server-side before reaching the client
- localStorage errors are caught silently — app works without persistence

### Rollback Plan
Redeploy a known-good commit via Vercel dashboard:
1. Go to vercel.com/dashboard → flashforge-ai
2. Click **Deployments**
3. Find last working deployment → click **...** → **Promote to Production**

---

## ⚠️ Known Limitations

- No user authentication — decks are device-local only
- Only one deck saved at a time — generating new cards replaces previous
- `groq/compound` model response time varies (typically 2–5 seconds)
- No export feature in current version

---

## 🔮 Future Improvements

- Save multiple named decks with localStorage or Supabase
- Export cards as CSV or PDF
- Spaced repetition algorithm (SM-2) for optimized review scheduling
- Image support in cards
- Share decks via URL

---

## 🪞 Reflection

**What was hardest?**
Dark mode in Tailwind v4 was unexpectedly difficult. The `darkMode: "class"` config that works in Tailwind v3 does not behave the same in v4, which uses a CSS-first configuration model. This caused the theme toggle to update the HTML class correctly but styles would not apply.

**Why was it difficult?**
Most documentation and Stack Overflow answers target Tailwind v3. Debugging required reading the Tailwind v4 migration guide carefully and ultimately switching to inline styles for theme-sensitive components as a reliable workaround.

**What would I do differently?**
Pin exact dependency versions at the start of a project. The mismatch between Tailwind v4 and existing documentation cost significant time that could have been avoided.

**One thing that surprised me**
How much the structured prompt design matters for AI output quality. Early prompts returned markdown-wrapped JSON, inconsistent card counts, and mixed-language responses. Adding explicit constraints — "no markdown, no explanation, no code blocks, respond ONLY with valid JSON" — dramatically improved consistency.

---

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) — React framework
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS v4](https://tailwindcss.com/) — Styling
- [Groq API](https://groq.com/) — AI inference
- [next-themes](https://github.com/pacocoursey/next-themes) — Dark mode
- [Vitest](https://vitest.dev/) — Unit testing
- [Vercel](https://vercel.com/) — Deployment

---

*FlyRank Frontend AI Engineering Capstone*
