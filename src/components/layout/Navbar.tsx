import { useState } from 'react';
import { Layers, Wrench, Map, BookOpen, ArrowRight, Search, Menu, X, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import type { NavView } from '../../types';

const NAV_ITEMS: { label: string; view: NavView; icon: React.ElementType; accent?: string; badge?: string }[] = [
  { label: 'Prompt Catalog', view: 'explorer', icon: Layers,  accent: '#635BFF', badge: '50+' },
  { label: 'AI Tools',       view: 'tools',    icon: Wrench,  accent: '#00D4FF' },
  { label: 'Path Guide',     view: 'guide',    icon: Map,     accent: '#10B981' },
  { label: 'Blog',           view: 'blog',     icon: BookOpen, accent: '#F59E0B' },
];

export function Navbar() {
  const { view, setView, startWizard, searchQuery, setSearchQuery } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = (v: NavView) => {
    setView(v);
    setMobileOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView('explorer');
    setSearchOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0A0D18]/95 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">

        {/* Brand Logo & Home Link */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-2.5 group shrink-0 focus:outline-none text-left"
          title="LLM For Everyone — Home"
        >
          <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center group-hover:border-[#635BFF]/80 group-hover:bg-[#635BFF]/10 transition-all p-1.5 shadow-sm shrink-0">
            <img src="/brand/logo-mark.svg" alt="LLM For Everyone" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="font-extrabold text-sm sm:text-[15px] tracking-tight text-white group-hover:text-slate-100 transition-colors whitespace-nowrap">
              LLM <span className="text-[#635BFF]">For Everyone</span>
            </span>
            <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-[#8F89FF] bg-[#635BFF]/10 border border-[#635BFF]/25">
              BETA
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(({ label, view: v, icon: Icon, accent, badge }) => {
            const isActive = view === v;
            return (
              <button
                key={v}
                onClick={() => navigate(v)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'text-white bg-white/[0.08] shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {accent && <Icon className="w-4 h-4" style={{ color: isActive ? accent : undefined }} />}
                <span>{label}</span>
                {badge && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-white/[0.06] text-slate-400">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Desktop Search & CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Desktop Search Trigger */}
          <div className="hidden sm:block relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center animate-in fade-in duration-150">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search prompts..."
                  autoFocus
                  onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                  className="w-44 lg:w-56 px-3 py-1.5 text-xs rounded-xl bg-[#111625] border border-[#635BFF]/50 text-white placeholder:text-slate-500 focus:outline-none"
                />
              </form>
            ) : (
              <button
                onClick={() => {
                  if (view !== 'explorer') setView('explorer');
                  setSearchOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-xs text-slate-400 hover:text-white transition-all"
                title="Quick search across prompts"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Search prompts...</span>
              </button>
            )}
          </div>

          {/* Desktop GitHub Link */}
          <a
            href="https://github.com/Axomiya-IT-Labs/llmforeveryone"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository — LLM For Everyone"
            className="hidden sm:flex w-8 h-8 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.07] items-center justify-center p-1.5 transition-all"
          >
            <img src="/social/icons/github.svg" alt="GitHub" className="w-full h-full object-contain opacity-70 hover:opacity-100" />
          </a>

          {/* Desktop Primary CTA Button */}
          <Button
            variant="stripe"
            size="sm"
            onClick={startWizard}
            className="hidden md:inline-flex shadow-sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Discovery Wizard
          </Button>

          {/* Prominent High-Contrast Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#635BFF]/60 shadow-md active:scale-95"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#0A0D18]/98 backdrop-blur-2xl px-4 py-6 space-y-4 animate-in slide-in-from-top-2 duration-150 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          
          {/* Mobile Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all prompts & categories..."
              className="w-full bg-[#111625] border border-white/[0.12] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
            />
          </form>

          {/* Mobile Navigation Links */}
          <div className="space-y-1.5 pt-1">
            {NAV_ITEMS.map(({ label, view: v, icon: Icon, accent, badge }) => {
              const isActive = view === v;
              return (
                <button
                  key={v}
                  onClick={() => navigate(v)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold text-left transition-all ${
                    isActive 
                      ? 'bg-[#635BFF]/20 text-white border border-[#635BFF]/40 shadow-sm' 
                      : 'text-slate-300 hover:bg-white/[0.06] hover:text-white border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {accent && <Icon className="w-4 h-4 shrink-0" style={{ color: accent }} />}
                    <span>{label}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {badge && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-300">
                        {badge}
                      </span>
                    )}
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="pt-2">
            <Button
              variant="stripe"
              className="w-full justify-center py-3.5 text-sm font-bold shadow-lg shadow-[#635BFF]/25"
              onClick={() => {
                startWizard();
                setMobileOpen(false);
              }}
              icon={<Sparkles className="w-4 h-4" />}
            >
              Start 60s Discovery Wizard
            </Button>
          </div>

          {/* Mobile Footer Links */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500">
            <span>LLM For Everyone · Open Source</span>
            <a href="https://github.com/Axomiya-IT-Labs/llmforeveryone" target="_blank" rel="noopener noreferrer" className="text-[#8F89FF] font-semibold hover:underline">GitHub</a>
          </div>
        </div>
      )}
    </header>
  );
}
