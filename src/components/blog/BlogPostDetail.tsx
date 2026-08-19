import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  User, 
  Share2, 
  Check, 
  AlertCircle, 
  BookOpen
} from 'lucide-react';
import { getBlogPostBySlug, type BlogPostData } from '../../utils/blogLoader';
import { MDX_CUSTOM_COMPONENTS } from './MDXComponents';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface BlogPostDetailProps {
  slug: string;
  onBack: () => void;
  onSelectPost?: (slug: string) => void;
}

export function BlogPostDetail({ slug, onBack }: BlogPostDetailProps) {
  const [postData, setPostData] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    getBlogPostBySlug(slug)
      .then((data) => {
        if (!isMounted) return;
        if (!data) {
          setError(`Blog article "${slug}" could not be found.`);
        } else {
          setPostData(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Error loading MDX post:', err);
        setError('An error occurred while compiling and rendering the MDX content.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // 1. Loading State Skeleton
  if (loading) {
    return (
      <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="w-28 h-6 bg-white/[0.08] rounded-lg" />
        <div className="w-24 h-5 bg-[#635BFF]/20 rounded-full" />
        <div className="space-y-3">
          <div className="w-4/5 h-10 bg-white/[0.1] rounded-xl" />
          <div className="w-2/3 h-8 bg-white/[0.07] rounded-xl" />
        </div>
        <div className="flex items-center gap-4 pt-4 border-b border-white/[0.06] pb-6">
          <div className="w-28 h-4 bg-white/[0.06] rounded" />
          <div className="w-24 h-4 bg-white/[0.06] rounded" />
          <div className="w-20 h-4 bg-white/[0.06] rounded" />
        </div>
        <div className="space-y-4 pt-4">
          <div className="w-full h-4 bg-white/[0.06] rounded" />
          <div className="w-full h-4 bg-white/[0.06] rounded" />
          <div className="w-3/4 h-4 bg-white/[0.06] rounded" />
          <div className="w-full h-32 bg-[#111625] rounded-2xl border border-white/[0.08]" />
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error || !postData) {
    return (
      <div className="py-16 sm:py-24 max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Article Not Found</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {error || 'The requested article could not be loaded.'}
          </p>
        </div>
        <Button
          variant="stripe"
          onClick={onBack}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Return to Blog Directory
        </Button>
      </div>
    );
  }

  const { meta, Component } = postData;
  const formattedDate = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation & Actions Top Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-all active:scale-95 shadow-sm"
            title="Copy article link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#8F89FF]" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Post Header */}
        <header className="space-y-5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Badge variant="violet" size="sm">{meta.category}</Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {meta.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {meta.excerpt}
          </p>

          {/* Author & Published Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 pt-3 border-t border-white/[0.06]">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <User className="w-4 h-4 text-[#8F89FF]" />
              {meta.author === 'Rakibul' || meta.author?.includes('Rakibul') ? (
                <a
                  href="https://x.com/rkblailabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8F89FF] hover:text-white underline underline-offset-4 decoration-[#8F89FF]/50 transition-colors"
                >
                  {meta.author}
                </a>
              ) : (
                meta.author
              )}
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              {formattedDate}
            </span>
          </div>
        </header>

        {/* Rendered MDX Content with Custom Components */}
        <div className="prose prose-invert prose-stripe max-w-none pt-4">
          <Component components={MDX_CUSTOM_COMPONENTS} />
        </div>

        {/* Tags Footer */}
        {meta.tags && meta.tags.length > 0 && (
          <div className="pt-8 border-t border-white/[0.08] space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#635BFF]" />
              <span>Related Topics &amp; Tags</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA to Return or Explore Prompts */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#111625] to-[#0A0D18] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <BookOpen className="w-4 h-4 text-[#8F89FF]" />
              <span>Ready to put these techniques into practice?</span>
            </h3>
            <p className="text-xs text-slate-400">
              Browse over 50+ production prompt templates in our open catalog.
            </p>
          </div>
          <Button
            variant="stripe"
            size="sm"
            onClick={onBack}
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Explore More Articles
          </Button>
        </div>

      </div>
    </article>
  );
}
