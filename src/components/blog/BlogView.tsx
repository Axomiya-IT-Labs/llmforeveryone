import { useState, useMemo } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  Search, 
  X, 
  Sparkles,
  GitBranch,
  Compass
} from 'lucide-react';
import { getAllBlogPosts, getBlogCategories, type BlogPostMeta } from '../../utils/blogLoader';
import { BlogPostDetail } from './BlogPostDetail';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

function PostCard({ 
  post, 
  onClick 
}: { 
  post: BlogPostMeta; 
  onClick: () => void 
}) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card
      hover
      variant="elevated"
      onClick={onClick}
      className="p-6 flex flex-col justify-between gap-4 cursor-pointer group hover:border-[#635BFF]/40 transition-all text-left"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="violet" size="sm">{post.category}</Badge>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#8F89FF] transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {formattedDate}
        </span>

        <span className="text-[11px] font-semibold text-[#8F89FF] group-hover:text-white flex items-center gap-1 transition-colors">
          Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Card>
  );
}

export function BlogView() {
  const { setView } = useApp();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Auto-discover all blog posts via Vite import.meta.glob — sorted by date desc (latest first)
  const allPosts = useMemo(() => getAllBlogPosts(), []);
  const categories = useMemo(() => getBlogCategories(), []);

  // Filter posts by search query and category
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchCategory = activeCategory === 'All' || post.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [allPosts, activeCategory, searchQuery]);

  // If viewing an individual article
  if (selectedSlug) {
    return (
      <BlogPostDetail
        slug={selectedSlug}
        onBack={() => setSelectedSlug(null)}
        onSelectPost={(newSlug) => setSelectedSlug(newSlug)}
      />
    );
  }

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="sm">Blog</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            LLM Knowledge Hub
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Practical prompt engineering frameworks, clinical &amp; technical deep dives, and honest mental models for leveraging LLMs in daily workflows.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, topic, author, or keyword..."
              className="w-full bg-[#111625] border border-white/[0.1] rounded-2xl pl-11 pr-10 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 shadow-md transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills (Auto-derived from MDX Frontmatter) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#635BFF] text-white shadow-md shadow-[#635BFF]/30 scale-[1.02]'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* All Articles Grid — sorted latest first */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <div className="pill-divider">
              <BookOpen className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>All Articles ({filteredPosts.length})</span>
            </div>
            {activeCategory !== 'All' && (
              <span className="text-slate-500 font-mono">Category: {activeCategory}</span>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  onClick={() => setSelectedSlug(post.slug)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 rounded-3xl bg-[#0D1020] border border-white/[0.06]">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto opacity-40" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No articles matched your search</h3>
                <p className="text-xs text-slate-400">
                  Try adjusting your keywords or clearing the category filter.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                Reset Search Filters
              </Button>
            </div>
          )}
        </div>

        {/* Contribution Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#12182B] via-[#0E1322] to-[#0A0D18] border border-white/[0.08] text-center space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-[#635BFF]/20 border border-[#635BFF]/40 flex items-center justify-center text-[#8F89FF] mx-auto">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1 max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-white">Want to publish an MDX guide?</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Contribute an article to the blog — setup instructions, contribution guidelines, and the full project structure are all covered in our{' '}
              <code className="text-[#38BDF8] bg-white/[0.06] px-1.5 py-0.5 rounded font-mono text-xs">CONTRIBUTING.md</code>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="https://github.com/Axomiya-IT-Labs/llmforeveryone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-semibold text-white transition-all shadow-sm"
            >
              <GitBranch className="w-3.5 h-3.5 text-[#8F89FF]" />
              Contribute on GitHub
            </a>
            <button
              onClick={() => { setView('wizard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#635BFF]/10 hover:bg-[#635BFF]/20 border border-[#635BFF]/30 text-xs font-semibold text-[#8F89FF] hover:text-white transition-all shadow-sm"
            >
              <Compass className="w-3.5 h-3.5" />
              Try Discovery Wizard
            </button>
            <button
              onClick={() => { setView('explorer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 border border-[#00D4FF]/25 text-xs font-semibold text-[#00D4FF] hover:text-white transition-all shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Browse Prompt Catalog
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
