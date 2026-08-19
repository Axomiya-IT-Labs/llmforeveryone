import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme, THEMES, type AccentTheme } from '../../context/ThemeContext';

export function ThemeSelector() {
  const { theme, setThemeId } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-gray-200 transition-all active:scale-95"
        title="Change UI Theme"
        aria-label="Theme Selector"
      >
        <span
          className="w-3 h-3 rounded-full shadow-sm"
          style={{ backgroundColor: theme.primary, boxShadow: `0 0 8px ${theme.primary}` }}
        />
        <Palette className="w-3.5 h-3.5 text-gray-300" />
        <span className="hidden sm:inline">{theme.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-[#0D1026]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1 text-[11px] font-mono tracking-wider text-gray-400 uppercase border-b border-white/5 mb-1">
            Select Theme Accent
          </div>
          {(Object.keys(THEMES) as AccentTheme[]).map((key) => {
            const item = THEMES[key];
            const isSelected = item.id === theme.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setThemeId(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                  isSelected ? 'bg-white/10 text-white font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: item.primary, boxShadow: isSelected ? `0 0 8px ${item.primary}` : 'none' }}
                  />
                  <span>{item.name}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
