export type Decision = {
  decision: string
  why: string
  alternatives: string
  tradeoff: string
}

export type Challenge = {
  problem: string
  solution: string
  learned: string
}

export type Project = {
  id: string
  title: string
  tagline: string
  problem: string
  approach: string
  stack: string[]
  decisions: Decision[]
  challenges: Challenge[]
  links: {
    live?: string
    github?: string
  }
  status: 'live' | 'in-progress' | 'archived'
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'solace',
    title: 'Solace',
    tagline: 'Full-stack AI mental health platform with real-time therapy chat and crisis detection.',
    problem:
      '757 million people worldwide cannot access mental health care. Most existing tools are either too clinical or too shallow. I wanted to build something that felt genuinely useful.',
    approach:
      'Designed a full-stack system in 3 days: Next.js frontend, FastAPI backend, Groq for real-time AI streaming, PostgreSQL for persistence. Prioritized speed of response and crisis safety above all features.',
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'Python',
      'Groq API',
      'LLaMA 3.1',
      'PostgreSQL',
      'Prisma',
      'Supabase',
      'Clerk',
      'Three.js',
      'Framer Motion',
      'Vercel',
      'Railway',
    ],
    decisions: [
      {
        decision: 'FastAPI over Express for the backend',
        why: 'Python ecosystem made Groq integration cleaner. FastAPI async support handles streaming responses natively.',
        alternatives: 'Express.js with Node streams',
        tradeoff: 'Added a second runtime (Python) to the stack, increasing deployment complexity.',
      },
      {
        decision: 'Keyword matching for crisis detection',
        why: 'Fast, predictable, zero latency. Crisis detection cannot afford an extra LLM call delay.',
        alternatives: 'Secondary LLM classification call',
        tradeoff: 'Less nuanced than AI classification, but reliability and speed matter more here.',
      },
    ],
    challenges: [
      {
        problem: 'UI broke repeatedly across 3 days of continuous building.',
        solution: 'Isolated components, fixed one breakage at a time rather than rewriting. Kept scope tight.',
        learned: 'Shipping under time pressure requires disciplined scope control, not heroic debugging sessions.',
      },
    ],
    links: {
      live: 'https://solace-eight-xi.vercel.app',
      github: 'https://github.com/faisal-imran81/Solace',
    },
    status: 'live',
    featured: true,
  },
  {
    id: 'muslimeen',
    title: 'Muslimeen',
    tagline: "AI-powered Qur'an companion app with contextual chat, history, and anonymous access.",
    problem:
      "Most Qur'an apps are static reference tools. I wanted to build something that lets users have a real conversation about what they're reading — with context, follow-ups, and memory.",
    approach:
      'React Native with Expo for cross-platform reach. Groq for fast AI responses. Supabase for auth and conversation persistence. Designed for anonymous guest access so there is zero friction to start.',
    stack: [
      'React Native',
      'Expo SDK 54',
      'TypeScript',
      'Groq API',
      'LLaMA 3.1',
      'Supabase',
      'PostgreSQL',
      'Vercel',
    ],
    decisions: [
      {
        decision: 'Anonymous guest sign-in via Supabase',
        why: 'Removes the biggest drop-off point. Users can start immediately, upgrade to full account later.',
        alternatives: 'Mandatory email auth on first open',
        tradeoff: 'Guest sessions are harder to migrate to full accounts cleanly.',
      },
      {
        decision: 'Groq over OpenAI for AI responses',
        why: 'LLaMA 3.1 8B Instant on Groq is significantly faster for conversational use. Speed matters in chat.',
        alternatives: 'OpenAI GPT-4o-mini',
        tradeoff: 'Less capable model, but latency improvement was worth it for this use case.',
      },
    ],
    challenges: [
      {
        problem: 'Vercel build failing silently with no obvious error during deployment.',
        solution: 'Went through production logs line by line and found a build path misconfiguration. Fixed the config, redeployed.',
        learned: 'Silent failures require systematic log reading, not guessing. Production logs are the source of truth.',
      },
    ],
    links: {
      live: 'https://quran-chat-app-seven.vercel.app',
      github: 'https://github.com/faisal-imran81',
    },
    status: 'live',
    featured: true,
  },
  {
    id: 'elucid',
    title: 'Elucid',
    tagline: 'AI learning companion that adapts explanations from ELI5 to PhD level.',
    problem:
      'Most AI chat tools give one-size-fits-all explanations. Understanding is personal — what clicks for one person confuses another. I wanted a tool that meets you at your level.',
    approach:
      'Five separate system prompts tuned per difficulty level. Quiz mode generates questions from the same Groq conversation context. Daily streaks stored in Supabase to build a learning habit. Cross-platform via React Native + Expo.',
    stack: [
      'React Native',
      'Expo SDK 54',
      'TypeScript',
      'Groq API',
      'LLaMA 3.1',
      'Supabase',
      'PostgreSQL',
      'Expo Router',
    ],
    decisions: [
      {
        decision: 'Five separate system prompts instead of one dynamic prompt',
        why: 'Each level needs different vocabulary, sentence structure, and depth. A single interpolated prompt produces inconsistent quality across levels.',
        alternatives: 'One prompt with a difficulty variable interpolated',
        tradeoff: 'Five prompts to maintain instead of one, but output quality is meaningfully better per level.',
      },
      {
        decision: 'Supabase for streak tracking instead of local storage',
        why: 'Streaks need to persist across devices and reinstalls. Local storage breaks that.',
        alternatives: 'AsyncStorage / local persistence',
        tradeoff: 'Requires auth, adds network dependency, but produces a streak users can actually trust.',
      },
    ],
    challenges: [
      {
        problem: 'Designing quiz questions that are contextually relevant to what the user just learned.',
        solution: 'Quiz generation call includes the full prior conversation as context, so questions are grounded in what was actually explained.',
        learned: 'Context window management in multi-turn AI flows is a real engineering consideration, not just a prompt detail.',
      },
    ],
    links: {
      live: undefined,
      github: 'https://github.com/faisal-imran81/Elucid-AI-Tutor',
    },
    status: 'in-progress',
    featured: true,
  },
]