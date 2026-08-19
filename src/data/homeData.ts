import type { ElementType } from 'react';
import { 
  BookOpen, PenTool, Search, Lightbulb, 
  BarChart2, MessageCircle, FileText, Zap 
} from 'lucide-react';

// ══════════════════════════════════════════
// Stat tiles shown in the hero
// ══════════════════════════════════════════
export const HERO_STATS = [
  { value: '40+', label: 'Production Prompts' },
  { value: '9', label: 'Professions Covered' },
  { value: '17+', label: 'AI Tools Profiled' },
  { value: '0', label: 'Sign-ups Required' },
];

// ══════════════════════════════════════════
// Social proof logos (companies people recognise
// that use AI — generic illustrative)
// ══════════════════════════════════════════
export const SOCIAL_PROOF = [
  'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Cursor', 'Midjourney', 'NotebookLM',
];

// ══════════════════════════════════════════
// Feature pillars for the "Why LLMs?" grid
// ══════════════════════════════════════════
export interface FeaturePillar {
  icon: ElementType;
  color: string;
  title: string;
  description: string;
}

export const FEATURE_PILLARS: FeaturePillar[] = [
  {
    icon: Zap,
    color: '#635BFF',
    title: '10× Faster First Drafts',
    description: 'Turn a bullet-point dump into a polished document, proposal, or plan in minutes — not hours.',
  },
  {
    icon: Search,
    color: '#00D4FF',
    title: 'Research Without the Rabbit Holes',
    description: 'Synthesize 50 papers into a clear summary. Ask follow-ups in plain language. Get cited answers.',
  },
  {
    icon: MessageCircle,
    color: '#10B981',
    title: 'A Thinking Partner on Demand',
    description: 'Stress-test decisions, brainstorm blind spots, and simulate expert advisors — anytime.',
  },
  {
    icon: BarChart2,
    color: '#F59E0B',
    title: 'Data Becomes Insight',
    description: 'Upload spreadsheets, ask questions in plain English, and get charts, forecasts, and conclusions.',
  },
  {
    icon: Lightbulb,
    color: '#FF5A5F',
    title: 'Never Hit a Blank Page',
    description: 'Generate 10 angles on any creative challenge. Act as curator, not writer — AI handles the draft.',
  },
  {
    icon: BookOpen,
    color: '#A78BFA',
    title: 'Personalised Learning Engine',
    description: 'Master any subject with customised curricula, Socratic tutoring, and adaptive quizzes.',
  },
];

// ══════════════════════════════════════════
// Thought leadership principles (home page)
// ══════════════════════════════════════════
export interface ThoughtPrinciple {
  number: string;
  icon: ElementType;
  iconColor: string;
  title: string;
  body: string;
}

export const THOUGHT_PRINCIPLES: ThoughtPrinciple[] = [
  {
    number: '01',
    icon: Lightbulb,
    iconColor: '#635BFF',
    title: 'AI is a Lever, Not a Replacement',
    body: 'The professionals who win with AI are those who use it to amplify their best thinking — not outsource it. You are the strategist. AI is your execution engine.',
  },
  {
    number: '02',
    icon: PenTool,
    iconColor: '#00D4FF',
    title: 'Context is the Skill',
    body: 'Generic prompts produce generic output. Precise context — role, audience, constraints, examples — unlocks order-of-magnitude better results. This is the craft worth mastering.',
  },
  {
    number: '03',
    icon: FileText,
    iconColor: '#10B981',
    title: 'Verify Before You Trust',
    body: 'LLMs can confidently state wrong information. Treat AI output as a brilliant first draft — always fact-check citations, verify code, and review decisions with domain expertise.',
  },
  {
    number: '04',
    icon: Zap,
    iconColor: '#F59E0B',
    title: 'Start Small, Compound Fast',
    body: 'Replace one 2-hour task per week with a 10-minute AI workflow. After 12 weeks, that is 100+ hours recovered. The early adopter advantage compounds daily.',
  },
];
