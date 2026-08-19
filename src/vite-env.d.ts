/// <reference types="vite/client" />

declare module '*.mdx' {
  import { ComponentType } from 'react';
  export const frontmatter: {
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
  };
  const component: ComponentType<Record<string, unknown>>;
  export default component;
}