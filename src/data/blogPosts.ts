export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

/**
 * CONTRIBUTING: Add a new blog post here AND create:
 *   src/content/blog/<slug>/index.mdx
 *
 * The slug must match the folder name exactly.
 * Date format: YYYY-MM-DD
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'prompt-engineering-101',
    title: 'Prompt Engineering 101: The Techniques That Actually Work',
    excerpt: 'Chain-of-thought, few-shot examples, role assignment, and output constraints — the four techniques that separate average AI users from power users.',
    author: 'LLM For Everyone',
    date: '2026-08-05',
    readTime: '12 min read',
    category: 'Technique',
    tags: ['prompt-engineering', 'techniques', 'advanced', 'productivity'],
    featured: true,
  },
  {
    slug: 'getting-started-with-ai',
    title: 'Getting Started with AI: A Practical Guide for Complete Beginners',
    excerpt: 'AI feels overwhelming until it doesn\'t. Here\'s how to go from skeptic to power user in one week — without any technical background.',
    author: 'LLM For Everyone',
    date: '2026-08-15',
    readTime: '8 min read',
    category: 'Beginner Guide',
    tags: ['beginner', 'getting-started', 'chatgpt', 'productivity'],
    featured: true,
  },
  {
    slug: 'ai-for-healthcare',
    title: 'AI in Healthcare: How Clinicians Are Reclaiming Hours Every Week',
    excerpt: 'Documentation, research synthesis, and patient education are being transformed. Here\'s what\'s working in clinical practice today.',
    author: 'LLM For Everyone',
    date: '2026-08-10',
    readTime: '10 min read',
    category: 'Healthcare',
    tags: ['healthcare', 'clinical', 'documentation', 'SOAP'],
    featured: false,
  },
  {
    slug: 'ai-tools-comparison-2026',
    title: 'ChatGPT vs Claude vs Gemini: Which AI Tool Should You Actually Use?',
    excerpt: 'An honest, use-case-driven comparison of the three leading AI assistants — with a clear recommendation for each profession.',
    author: 'LLM For Everyone',
    date: '2026-08-12',
    readTime: '9 min read',
    category: 'Comparison',
    tags: ['chatgpt', 'claude', 'gemini', 'comparison', 'tools'],
    featured: false,
  },
  {
    slug: 'ai-for-educators',
    title: 'AI for Educators: Lesson Plans, Grading, and Student Engagement',
    excerpt: 'How teachers are using AI to prepare better lessons faster, give richer feedback, and create personalised learning paths for students.',
    author: 'LLM For Everyone',
    date: '2026-07-28',
    readTime: '11 min read',
    category: 'Education',
    tags: ['education', 'teachers', 'lesson-planning', 'grading'],
    featured: false,
  },
];

export const BLOG_CATEGORIES = [
  'All',
  'Beginner Guide',
  'Technique',
  'Healthcare',
  'Education',
  'Technology',
  'Business',
  'Marketing',
  'Finance',
  'Comparison',
  'Productivity',
];
