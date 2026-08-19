import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type AccentTheme = 'cyan' | 'purple' | 'emerald' | 'rose' | 'amber';

export interface ThemeConfig {
  id: AccentTheme;
  name: string;
  primary: string;
  secondary: string;
  glowClass: string;
  borderClass: string;
  gradientText: string;
  activeBadge: string;
}

export const THEMES: Record<AccentTheme, ThemeConfig> = {
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    primary: '#00F0FF',
    secondary: '#7000FF',
    glowClass: 'shadow-cyan-500/20',
    borderClass: 'border-cyan-400',
    gradientText: 'from-cyan-400 via-sky-300 to-indigo-400',
    activeBadge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  },
  purple: {
    id: 'purple',
    name: 'Neon Violet',
    primary: '#A855F7',
    secondary: '#EC4899',
    glowClass: 'shadow-purple-500/20',
    borderClass: 'border-purple-400',
    gradientText: 'from-purple-400 via-pink-400 to-indigo-300',
    activeBadge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  },
  emerald: {
    id: 'emerald',
    name: 'Matrix Emerald',
    primary: '#10B981',
    secondary: '#06B6D4',
    glowClass: 'shadow-emerald-500/20',
    borderClass: 'border-emerald-400',
    gradientText: 'from-emerald-400 via-teal-300 to-cyan-400',
    activeBadge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
  rose: {
    id: 'rose',
    name: 'Solar Flare',
    primary: '#F43F5E',
    secondary: '#FB923C',
    glowClass: 'shadow-rose-500/20',
    borderClass: 'border-rose-400',
    gradientText: 'from-rose-400 via-pink-400 to-amber-300',
    activeBadge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  },
  amber: {
    id: 'amber',
    name: 'Golden Amber',
    primary: '#F59E0B',
    secondary: '#EF4444',
    glowClass: 'shadow-amber-500/20',
    borderClass: 'border-amber-400',
    gradientText: 'from-amber-400 via-yellow-300 to-orange-400',
    activeBadge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  },
};

interface ThemeContextType {
  theme: ThemeConfig;
  setThemeId: (id: AccentTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<AccentTheme>(() => {
    try {
      const saved = localStorage.getItem('llm_theme') as AccentTheme;
      return saved && THEMES[saved] ? saved : 'cyan';
    } catch {
      return 'cyan';
    }
  });

  const setThemeId = (id: AccentTheme) => {
    setThemeIdState(id);
    try {
      localStorage.setItem('llm_theme', id);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeId);
  }, [themeId]);

  const currentTheme = THEMES[themeId] || THEMES.cyan;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
