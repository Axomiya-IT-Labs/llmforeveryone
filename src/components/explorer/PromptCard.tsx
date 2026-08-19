import { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  SlidersHorizontal, 
  Edit3,
  RotateCcw,
  Terminal, 
  Target, 
  ChevronDown, 
  ChevronUp,
  Clock
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { LLM_LAUNCHERS } from '../../utils/llmLaunchers';
import { getDuckDuckGoIconUrl } from '../../utils/aiToolIcons';
import type { ContentModule } from '../../types';

interface PromptCardProps {
  module: ContentModule;
}

export function PromptCard({ module }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState<'view' | 'parameters' | 'direct_edit'>('view');
  const [showExamples, setShowExamples] = useState(false);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [customText, setCustomText] = useState<string | null>(null);

  const Icon = module.icon || Sparkles;

  // Extract variables in brackets: [variable]
  const detectedVariables = useMemo(() => {
    if (!module.prompt) return [];
    const matches = module.prompt.match(/\[([^\]]+)\]/g);
    if (!matches) return [];
    return Array.from(new Set(matches.map(m => m.slice(1, -1))));
  }, [module.prompt]);

  // Compute live prompt with replaced variables or direct custom text
  const livePrompt = useMemo(() => {
    if (customText !== null) {
      return customText;
    }
    if (!module.prompt) return '';
    let text = module.prompt;
    detectedVariables.forEach(v => {
      const val = variables[v]?.trim();
      if (val) {
        text = text.replaceAll(`[${v}]`, val);
      }
    });
    return text;
  }, [module.prompt, detectedVariables, variables, customText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(livePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVariableChange = (varName: string, value: string) => {
    setCustomText(null);
    setVariables(prev => ({
      ...prev,
      [varName]: value
    }));
  };

  const handleDirectTextChange = (newText: string) => {
    setCustomText(newText);
  };

  const handleReset = () => {
    setVariables({});
    setCustomText(null);
    setEditMode('view');
  };

  const isCustomized = customText !== null || Object.keys(variables).some(k => variables[k]?.trim());

  return (
    <Card variant="elevated" className="p-4 sm:p-6 flex flex-col justify-between space-y-4 sm:space-y-5 relative overflow-hidden group w-full">
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#8F89FF] shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                {module.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                {module.category && (
                  <span className="text-[11px] font-medium text-slate-400">
                    {module.category}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Badge variant="violet" size="sm">
            {module.difficulty || 'Standard'}
          </Badge>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {module.content}
        </p>

        {/* Examples Collapsible */}
        {module.examples && module.examples.length > 0 && (
          <div>
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors py-1"
            >
              <Target className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>{showExamples ? 'Hide Applications' : `View ${module.examples.length} Use Cases`}</span>
              {showExamples ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showExamples && (
              <ul className="mt-2 space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300 animate-in fade-in duration-150">
                {module.examples.map((ex, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-1.5 shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Prompt Recipe & Interactive Preference/Edit Controls */}
      <div className="space-y-3 pt-3 border-t border-white/[0.06]">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-[#635BFF]" />
              <span>PROMPT RECIPE</span>
            </div>
            {isCustomized && (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Customized
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Toggle Parameter Fields */}
            {detectedVariables.length > 0 && (
              <button
                onClick={() => setEditMode(editMode === 'parameters' ? 'view' : 'parameters')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                  editMode === 'parameters' 
                    ? 'bg-[#635BFF]/20 border-[#635BFF]/40 text-[#8F89FF]' 
                    : 'bg-white/[0.05] border-white/[0.08] text-slate-400 hover:text-slate-200'
                }`}
                title="Fill in bracketed variables"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Fill Variables</span>
              </button>
            )}

            {/* Direct Edit Mode Toggle */}
            <button
              onClick={() => setEditMode(editMode === 'direct_edit' ? 'view' : 'direct_edit')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                editMode === 'direct_edit' 
                  ? 'bg-[#00D4FF]/20 border-[#00D4FF]/40 text-[#38BDF8]' 
                  : 'bg-white/[0.05] border-white/[0.08] text-slate-400 hover:text-slate-200'
              }`}
              title="Edit full prompt text directly"
            >
              <Edit3 className="w-3 h-3" />
              <span>{editMode === 'direct_edit' ? 'Close Editor' : 'Edit Prompt'}</span>
            </button>

            {/* Reset Button */}
            {isCustomized && (
              <button
                onClick={handleReset}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-slate-200"
                title="Reset prompt to original"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#635BFF] hover:bg-[#5851EA] text-white text-[11px] font-semibold transition-all active:scale-95 shadow-sm"
              title="Copy customized prompt to clipboard"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Mode 1: Inline Bracketed Variable Input Fields */}
        {editMode === 'parameters' && detectedVariables.length > 0 && (
          <div className="p-3.5 rounded-xl bg-[#090C16] border border-[#635BFF]/25 space-y-2.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8F89FF] uppercase tracking-wider">
              <span>Preference &amp; Variable Injection:</span>
              <span className="text-slate-500">Updates live below</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {detectedVariables.map((v) => (
                <div key={v} className="space-y-0.5">
                  <label className="text-[10px] font-medium text-slate-400 block truncate">
                    [{v}]
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${v}...`}
                    value={variables[v] || ''}
                    onChange={(e) => handleVariableChange(v, e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#635BFF]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mode 2: Full Direct Textarea Editor */}
        {editMode === 'direct_edit' ? (
          <div className="space-y-1.5 animate-in fade-in duration-150">
            <textarea
              value={livePrompt}
              onChange={(e) => handleDirectTextChange(e.target.value)}
              rows={6}
              className="w-full p-3 rounded-xl bg-[#080A14] border border-[#00D4FF]/40 text-[#38BDF8] font-mono text-xs leading-relaxed focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/20"
              placeholder="Edit your prompt here before copying or launching in an LLM..."
            />
            <p className="text-[10px] text-slate-500 font-mono">
              Feel free to add your own constraints, tone preferences, or background details.
            </p>
          </div>
        ) : (
          /* Default Mode: Formatted Preview Code Box */
          <pre className="p-3 sm:p-3.5 rounded-xl bg-[#080A14] border border-white/[0.08] text-[#38BDF8] font-mono text-[11px] sm:text-xs leading-relaxed whitespace-pre-wrap break-words select-all max-h-48 overflow-y-auto w-full">
            {livePrompt}
          </pre>
        )}

        {/* 4 LLM Launchers Bottom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-white/[0.04]">
          
          {/* Individual Model Launchers with Favicons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Run:</span>
            {LLM_LAUNCHERS.map((llm) => (
              <a
                key={llm.id}
                href={llm.urlFn(livePrompt)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => navigator.clipboard?.writeText(livePrompt)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 transition-all ${llm.badgeBg} ${llm.badgeText}`}
                title={`Launch in ${llm.name} (auto-copies prompt)`}
              >
                <img
                  src={getDuckDuckGoIconUrl(llm.domain)}
                  alt={llm.name}
                  className="w-3.5 h-3.5 rounded-sm object-contain"
                  onError={(e) => {
                    // Fallback to text if icon fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span>{llm.name}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
            <Clock className="w-3 h-3" />
            <span>{module.timeSaveEstimate || 'Saves 5+ hrs'}</span>
          </div>

        </div>

      </div>
    </Card>
  );
}
