export interface LifeDomainGuide {
  id: string;
  title: string;
  category: 'work' | 'life' | 'mindset';
  tagline: string;
  whyItMatters: string;
  howToApply: string[];
  samplePrompt: string;
  timeSaved: string;
}

export const WORK_LIFE_GUIDES: LifeDomainGuide[] = [
  {
    id: 'deep-work-productivity',
    title: 'Eliminating Administrative Drag & Cognitive Overload',
    category: 'work',
    tagline: 'Reclaim 10-15 hours per week from routine drafting, meeting summarization, and formatting',
    whyItMatters: 'Over 60% of modern knowledge work is spent on coordination, formatting emails, compiling notes, and basic synthesis rather than high-value creative problem solving. LLMs act as a 24/7 executive chief of staff that compresses 3-hour clerical tasks into 3-minute reviews.',
    howToApply: [
      'Record unstructured meetings/voice memos and prompt an LLM to extract standard action items with owners and deadlines.',
      'Provide bullet-point ideas and ask the LLM to structure a persuasive, polite proposal in your exact tone.',
      'Use LLMs to convert messy data tables or unorganized notes into clean Markdown summaries or JSON arrays.',
      'Draft standardized SOPs (Standard Operating Procedures) in minutes instead of days.'
    ],
    samplePrompt: 'Act as an executive operations lead. Convert these 8 scattered bullet points from my client meeting into: (1) A polite 3-paragraph executive summary for the client, and (2) An internal task checklist with deadlines and assigned teams: [paste notes].',
    timeSaved: '10-15 hrs/week'
  },
  {
    id: 'lifelong-learning',
    title: 'Accelerated Learning & The "Feynman" Assistant',
    category: 'life',
    tagline: 'Master complex skills, languages, and technical concepts at 5x speed',
    whyItMatters: 'Traditional education is static and one-size-fits-all. An LLM adapts its explanations dynamically to your exact level, your personal background, and your preferred learning analogies—acting as the ultimate personalized private tutor.',
    howToApply: [
      'Ask the AI to explain advanced concepts (e.g. quantum computing, financial options, contract law) as if you are a 12-year-old, then progressively increase depth.',
      'Use LLMs to generate customized practice quizzes with immediate explanation of why incorrect options are wrong.',
      'Simulate conversational foreign language practice with instant grammar corrections and vocabulary explanations.',
      'Break down 500-page non-fiction books or academic papers into core mental models and actionable habits.'
    ],
    samplePrompt: 'I want to master [insert subject, e.g. Macroeconomics]. Act as an elite university tutor. Give me a 14-day micro-curriculum with 1 core mental model per day, 1 real-world example, and 1 mini-quiz to test my retention.',
    timeSaved: 'Saves 20+ study hrs/topic'
  },
  {
    id: 'decision-making',
    title: 'Strategic Decision-Making & Blindspot Analysis',
    category: 'work',
    tagline: 'Stress-test career moves, business pivots, and major life decisions with a neutral sparring partner',
    whyItMatters: 'Humans suffer from confirmation bias and emotional fatigue when weighing hard choices. LLMs can impersonate contrarian advisors, devils advocates, and risk analysts to stress-test your plans before you commit resources.',
    howToApply: [
      'Outline your proposed plan and ask the LLM: "What are the top 5 reasons this plan will fail, and what early warning signs should I monitor?"',
      'Model 3 scenarios: Best case, baseline, and worst case, with required mitigation steps for each.',
      'Compare competing job offers, investment options, or tool choices using structured decision matrices with weighted criteria.'
    ],
    samplePrompt: 'I am deciding between [Option A] and [Option B] for my [career/business]. Act as a pragmatic senior advisor. Create a weighted decision matrix evaluating: (1) 3-year upside, (2) downside risk, (3) daily stress, and (4) skill growth. Highlight my potential blindspots.',
    timeSaved: 'Prevents costly missteps'
  },
  {
    id: 'daily-life-wellness',
    title: 'Personal Life, Nutrition & Home Management',
    category: 'life',
    tagline: 'Streamline meal planning, budgeting, workout regimens, and travel itineraries',
    whyItMatters: 'Decision fatigue in personal life reduces creativity and energy for what matters most. LLMs make customized meal plans based on what is in your fridge, organize travel itineraries, and automate household budgets in seconds.',
    howToApply: [
      'Input the exact ingredients in your pantry/fridge and request 3 healthy, 20-minute recipes with step-by-step cooking timers.',
      'Generate customized weekly family meal plans with automated organized grocery lists grouped by supermarket aisle.',
      'Build realistic travel itineraries tailored to your pace, budget, and walking preferences.',
      'Create personalized strength or endurance training schedules adapted to your available gym equipment.'
    ],
    samplePrompt: 'Here is what I have in my kitchen: [list ingredients]. Suggest 3 high-protein dinners I can make in under 25 minutes. Include step-by-step instructions and nutritional estimates.',
    timeSaved: '4-6 hrs/week'
  },
  {
    id: 'creative-breakthroughs',
    title: 'Overcoming Creative Blocks & Ideation',
    category: 'mindset',
    tagline: 'Never stare at a blank page again—from video scripts to novel brainstorming',
    whyItMatters: 'The hardest part of any creative endeavor is starting from scratch. LLMs eliminate the blank page problem by generating 20 rapid divergent directions, allowing you to act as the creative director and curator.',
    howToApply: [
      'Ask for 10 unexpected metaphors or angles for your product, article, or presentation.',
      'Combine two unrelated disciplines (e.g. "Explain modern cybersecurity using concepts from immunology").',
      'Iterate on headlines, hooks, and opening paragraphs to maximize audience engagement.'
    ],
    samplePrompt: 'I am creating a project about [topic]. Brainstorm 10 creative angles or metaphors that have never been done before. For each, give a catchy title, a 2-sentence hook, and why it grabs attention.',
    timeSaved: '10x faster ideation'
  }
];

export const CORE_AI_PRINCIPLES = [
  {
    title: '1. AI is a Thought Partner, Not an Autopilot',
    description: 'The highest leverage comes from treating LLMs as brilliant, tireless junior analysts or collaborative sparring partners. You provide the strategic vision, domain intuition, and final quality control.'
  },
  {
    title: '2. Context is King (Garbage In, Garbage Out)',
    description: 'Vague prompts produce generic, robotic answers. Supplying rich background (role, target audience, constraints, examples, and desired format) unlocks order-of-magnitude better results.'
  },
  {
    title: '3. Verification & Guardrails are Mandatory',
    description: 'LLMs can hallucinate with high confidence. Always fact-check citations, verify code logic, and review legal/clinical outputs with human domain expertise before deployment.'
  },
  {
    title: '4. The 80/20 Velocity Shift',
    description: 'Use AI to produce the first 80% of any draft, outline, or prototype in 5 minutes. Spend your saved time and energy perfecting the final 20% that requires deep human taste and judgment.'
  }
];
