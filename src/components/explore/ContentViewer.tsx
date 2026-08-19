import { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Target, 
  Copy, 
  Check, 
  ExternalLink, 
  CheckCircle2, 
  Layers,
  SlidersHorizontal,
  Download,
  Terminal,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import type { ContentModule } from '../../types';

interface ContentViewerProps {
  module: ContentModule;
  currentIndex: number;
  totalModules: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (idx: number) => void;
  allModules: ContentModule[];
}

export function ContentViewer({
  module,
  currentIndex,
  totalModules,
  onNext,
  onPrev,
  onSelectIndex,
  allModules,
}: ContentViewerProps) {
  const [copied, setCopied] = useState(false);
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({});
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [showVariableEditor, setShowVariableEditor] = useState(true);

  const Icon = module.icon || Sparkles;
  const isCompleted = !!completedModules[module.id];

  // Extract variables in brackets: [something]
  const detectedVariables = useMemo(() => {
    if (!module.prompt) return [];
    const matches = module.prompt.match(/\[([^\]]+)\]/g);
    if (!matches) return [];
    return Array.from(new Set(matches.map(m => m.slice(1, -1))));
  }, [module.prompt]);

  // Compute live prompt with replaced variables
  const livePrompt = useMemo(() => {
    if (!module.prompt) return '';
    let text = module.prompt;
    detectedVariables.forEach(v => {
      const val = variables[v]?.trim();
      if (val) {
        text = text.replaceAll(`[${v}]`, val);
      }
    });
    return text;
  }, [module.prompt, detectedVariables, variables]);

  const handleCopyPrompt = () => {
    if (livePrompt) {
      navigator.clipboard.writeText(livePrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleToggleComplete = () => {
    setCompletedModules(prev => ({
      ...prev,
      [module.id]: !prev[module.id]
    }));
  };

  const handleVariableChange = (varName: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [varName]: value
    }));
  };

  const openInChatGPT = () => {
    const query = encodeURIComponent(livePrompt || '');
    window.open(`https://chatgpt.com/?q=${query}`, '_blank', 'noopener,noreferrer');
  };

  const openInClaude = () => {
    const query = encodeURIComponent(livePrompt || '');
    window.open(`https://claude.ai/new?q=${query}`, '_blank', 'noopener,noreferrer');
  };

  const openInGemini = () => {
    window.open(`https://gemini.google.com/app`, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadMarkdown = () => {
    let md = `# My Personalized AI Discovery Roadmap\n\n`;
    allModules.forEach((m, idx) => {
      md += `## ${idx + 1}. ${m.title}\n\n`;
      md += `${m.content}\n\n`;
      if (m.examples?.length) {
        md += `### Practical Applications:\n`;
        m.examples.forEach(e => md += `- ${e}\n`);
        md += `\n`;
      }
      if (m.prompt) {
        md += `### Prompt Recipe:\n\`\`\`text\n${m.prompt}\n\`\`\`\n\n---\n\n`;
      }
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-journey-roadmap.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const completedCount = Object.values(completedModules).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Module Selector Pills */}
      <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex items-center justify-between gap-3 overflow-hidden">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <div className="px-2.5 py-1 text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Modules:</span>
          </div>
          {allModules.map((m, idx) => {
            const isSelected = idx === currentIndex;
            const done = completedModules[m.id];
            return (
              <button
                key={m.id}
                onClick={() => onSelectIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                )}
                <span>{idx + 1}. {m.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Download Full Guide Button */}
        <button
          onClick={handleDownloadMarkdown}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all shrink-0 active:scale-95"
          title="Export all module prompts as a Markdown file"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Export All (.md)</span>
        </button>
      </div>

      {/* Main Module Card */}
      <Card className="p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle accent corner glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/15 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-xl shadow-cyan-500/10">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                  MODULE {currentIndex + 1} OF {totalModules}
                </span>
                {isCompleted && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Practiced
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
                {module.title}
              </h2>
            </div>
          </div>

          {/* Mark Practiced Button */}
          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all self-start sm:self-auto ${
              isCompleted
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/15'
                : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-gray-400'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark as Practiced'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-7">
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-normal">
            {module.content}
          </p>

          {/* Practical Capabilities Section */}
          {module.examples && module.examples.length > 0 && (
            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                Actionable Workflows &amp; Capabilities
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {module.examples.map((example: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-300 text-xs sm:text-sm leading-relaxed"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-sm shadow-cyan-400" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Prompt Card */}
          {module.prompt && (
            <div className="p-5 sm:p-6 bg-gradient-to-br from-indigo-950/40 via-purple-950/25 to-[#0A0A1A] rounded-2xl border border-purple-500/30 space-y-5 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider block">
                      Context-Engineered Prompt Recipe
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Tailored structure with persona, constraints, and goal
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {detectedVariables.length > 0 && (
                    <button
                      onClick={() => setShowVariableEditor(!showVariableEditor)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        showVariableEditor 
                          ? 'bg-purple-500/20 border-purple-500/40 text-purple-200' 
                          : 'bg-white/5 border-white/10 text-gray-300'
                      }`}
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
                      <span>{showVariableEditor ? 'Hide Variables' : 'Customize Variables'}</span>
                    </button>
                  )}

                  <button
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-95"
                    title="Copy prompt text to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Interactive Live Variable Input Editor */}
              {detectedVariables.length > 0 && showVariableEditor && (
                <div className="p-4 rounded-xl bg-black/40 border border-purple-500/20 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-purple-300 uppercase tracking-wider">
                    <span>Fill in your case details:</span>
                    <span className="text-gray-400 font-normal">Auto-updates the prompt live below</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {detectedVariables.map((v) => (
                      <div key={v} className="space-y-1">
                        <label className="text-[11px] font-medium text-gray-300 block">
                          [{v}]
                        </label>
                        <input
                          type="text"
                          placeholder={`Enter ${v}...`}
                          value={variables[v] || ''}
                          onChange={(e) => handleVariableChange(v, e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Prompt Display */}
              <div className="relative">
                <pre className="p-4 rounded-xl bg-[#060714] border border-white/10 text-cyan-200 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap select-all">
                  {livePrompt}
                </pre>
              </div>

              {/* Interactive App Launchers */}
              <div className="pt-1 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-gray-400">Launch Directly:</span>
                  <button
                    onClick={openInChatGPT}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                    title="Open in ChatGPT with query"
                  >
                    <span>ChatGPT</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={openInClaude}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                    title="Open in Claude"
                  >
                    <span>Claude</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={openInGemini}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                    title="Open in Google Gemini"
                  >
                    <span>Gemini</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-gray-500" />
                  <span>Verify factual output before production use</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            onClick={onPrev}
            disabled={currentIndex === 0}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            ← Previous Module
          </Button>

          <div className="text-xs font-mono text-gray-400">
            {completedCount} of {totalModules} modules practiced
          </div>

          <Button
            onClick={onNext}
            disabled={currentIndex === totalModules - 1}
            variant="primary"
            className="w-full sm:w-auto"
          >
            {currentIndex === totalModules - 1 ? 'Complete Pathway' : 'Next Module →'}
          </Button>
        </div>
      </Card>
    </div>
  );
}