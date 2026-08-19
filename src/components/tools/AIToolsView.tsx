import { useState, useMemo } from 'react';
import { ExternalLink, Star, Search, X, Filter, Sparkles } from 'lucide-react';
import { AI_TOOLS } from '../../data/aiTools';
import { getDuckDuckGoIconUrl } from '../../utils/aiToolIcons';
import type { AITool } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { useApp } from '../../context/AppContext';

const PRICING_COLORS: Record<AITool['pricing'], 'emerald' | 'violet' | 'amber' | 'cyan'> = {
  'Free': 'emerald',
  'Freemium': 'violet',
  'Paid': 'amber',
  'Open Source': 'cyan',
};

function ToolCard({ tool }: { tool: AITool }) {
  const iconUrl = getDuckDuckGoIconUrl(tool.url);

  return (
    <Card variant="elevated" className="p-5 flex flex-col justify-between space-y-4 group hover:border-white/20 transition-all">
      <div className="space-y-3">
        {/* Header with DuckDuckGo Favicon */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center p-2 shrink-0 group-hover:border-[#635BFF]/50 transition-colors shadow-sm">
              <img
                src={iconUrl}
                alt={tool.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  // If favicon fails to load, fallback to a neat Sparkles icon placeholder
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-bold text-white group-hover:text-slate-100 leading-snug truncate">
                {tool.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{tool.category}</p>
            </div>
          </div>
          <Badge variant={PRICING_COLORS[tool.pricing]} size="sm">{tool.pricing}</Badge>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-medium">{tool.tagline}</p>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{tool.description}</p>
      </div>

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Best for</p>
          <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{tool.bestFor}</p>
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.14] text-[11px] font-semibold text-white transition-all shrink-0 border border-white/[0.08]"
        >
          <span>Open</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </Card>
  );
}

export function AIToolsView() {
  const { startWizard } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(AI_TOOLS.map(t => t.category)));
    return ['All', ...cats];
  }, []);

  const featured = AI_TOOLS.filter(t => t.featured);

  const filtered = useMemo(() => {
    return AI_TOOLS.filter(t => {
      const matchCat = activeCategory === 'All' || t.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.bestFor.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.07]">
          <div className="space-y-3">
            <Badge variant="violet" size="sm">AI Tools Directory</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">The Best AI Tools, Curated by Use Case</h1>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              {AI_TOOLS.length} tools across {categories.length - 1} categories — each with live favicons, honest pricing, target use cases, and direct links.
            </p>
          </div>
          <button
            onClick={startWizard}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5851EA] text-white text-sm font-semibold transition-all shadow-[0_4px_14px_rgba(99,91,255,0.35)] shrink-0"
          >
            <Sparkles className="w-4 h-4" /> Get Matched in 60s
          </button>
        </div>

        {/* Featured */}
        <div className="space-y-4">
          <div className="pill-divider"><Star className="w-3.5 h-3.5 text-amber-400" />Featured Industry Standards</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featured.map(t => <ToolCard key={t.id} tool={t} />)}
          </div>
        </div>

        {/* Search + filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tools by name, use case, or category..."
              className="w-full bg-[#111625] border border-white/[0.1] rounded-2xl pl-11 pr-10 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#635BFF] text-white shadow-md'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.07]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500">Showing {filtered.length} tools</p>
        </div>

        {/* All tools */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(t => <ToolCard key={t.id} tool={t} />)}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3">
            <Filter className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-slate-400 font-semibold">No tools match your search</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="text-sm text-[#8F89FF] hover:underline">Reset filters</button>
          </div>
        )}

        {/* Suggest a tool CTA */}
        <div className="p-8 rounded-2xl bg-[#0D1020] border border-white/[0.08] text-center space-y-3">
          <h3 className="text-base font-bold text-white">Know a tool we should add?</h3>
          <p className="text-sm text-slate-400">Open a GitHub issue or PR to add it to the directory.</p>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8F89FF] hover:text-white transition-colors">
            Suggest a tool <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
