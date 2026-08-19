import type { ComponentType } from 'react';

export interface BlogPostFrontmatter {
  title?: string;
  excerpt?: string;
  author?: string;
  date?: string;
  readTime?: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  featured?: boolean;
  [key: string]: unknown;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  featured: boolean;
  filePath: string;
}

export interface BlogPostData {
  meta: BlogPostMeta;
  Component: ComponentType<Record<string, unknown>>;
}

interface MDXModule {
  default: ComponentType<Record<string, unknown>>;
  frontmatter?: BlogPostFrontmatter;
  [key: string]: unknown;
}

// Auto-discover all MDX posts dynamically via Vite import.meta.glob
const mdxModules = import.meta.glob<MDXModule>(
  '/src/content/blog/**/index.mdx',
  { eager: true }
);

/**
 * Extracts slug from file path:
 * '/src/content/blog/prompt-engineering-101/index.mdx' -> 'prompt-engineering-101'
 */
function extractSlug(filePath: string): string {
  const match = filePath.match(/\/src\/content\/blog\/([^/]+)\/index\.mdx$/);
  if (match && match[1]) {
    return match[1];
  }
  return filePath
    .replace('/src/content/blog/', '')
    .replace('/index.mdx', '')
    .replace('.mdx', '');
}

/**
 * Auto-discovers and returns all blog posts with parsed frontmatter,
 * sorted by date (newest first).
 */
export function getAllBlogPosts(): BlogPostMeta[] {
  const posts: BlogPostMeta[] = [];

  for (const [filePath, mod] of Object.entries(mdxModules)) {
    const slug = extractSlug(filePath);
    const fm = (mod.frontmatter || {}) as BlogPostFrontmatter;

    const meta: BlogPostMeta = {
      slug,
      title: fm.title || formatTitleFromSlug(slug),
      excerpt: fm.excerpt || 'Explore practical AI workflows and prompt engineering recipes.',
      author: fm.author || 'LLM For Everyone',
      date: fm.date || '2026-08-15',
      readTime: fm.readTime || '5 min read',
      category: fm.category || 'Guide',
      tags: Array.isArray(fm.tags) ? fm.tags : ['AI', 'Prompt Engineering'],
      featuredImage: fm.featuredImage,
      featured: Boolean(fm.featured),
      filePath,
    };

    posts.push(meta);
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Loads a single blog post's component and metadata by slug.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostData | null> {
  const allPosts = getAllBlogPosts();
  const meta = allPosts.find(p => p.slug === slug);

  if (!meta) {
    return null;
  }

  const mod = mdxModules[meta.filePath];
  if (!mod || !mod.default) {
    return null;
  }

  return {
    meta,
    Component: mod.default,
  };
}

/**
 * Auto-discovers all unique categories from all MDX posts.
 */
export function getBlogCategories(): string[] {
  const posts = getAllBlogPosts();
  const categories = Array.from(new Set(posts.map(p => p.category)));
  return ['All', ...categories];
}

/**
 * Formats a slug into a readable title fallback
 */
function formatTitleFromSlug(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
