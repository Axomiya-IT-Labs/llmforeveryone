import { RotateCcw, Sparkles } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  currentView: 'welcome' | 'onboarding' | 'explore';
  onReset: () => void;
}

export function Header({ currentView, onReset }: HeaderProps) {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0A0A18]/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          title="Return to Home"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/15 bg-white/5 p-1 group-hover:border-cyan-400 group-hover:scale-105 transition-all duration-300">
            <img src="/brand/logo-mark.svg" alt="LLM For Everyone Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                LLM <span className={`bg-gradient-to-r ${theme.gradientText} bg-clip-text text-transparent`}>For Everyone</span>
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-cyan-300">
                v2.0
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-gray-400 -mt-0.5">
              Personalized AI Pathways &amp; Prompts
            </p>
          </div>
        </div>

        {/* Right Actions: Stage Badges, Theme Selector, Socials, Reset */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Active View Badge */}
          {currentView === 'onboarding' && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>Assessment</span>
            </div>
          )}

          {currentView === 'explore' && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Explore Mode</span>
            </div>
          )}

          {/* Theme Selector */}
          <ThemeSelector />

          {/* GitHub Link */}
          <a
            href="#"
            title="View on GitHub"
            aria-label="View on GitHub"
            className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center p-1.5 text-gray-300 hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            <img src="/social/icons/github.svg" alt="GitHub" className="w-full h-full object-contain" />
          </a>

          {/* Reset / Start Over Button if inside flow */}
          {currentView !== 'welcome' && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 hover:text-white transition-all active:scale-95"
              title="Start over from beginning"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
