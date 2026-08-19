import { useState } from 'react';
import { ArrowRight, Copy, Check, ChevronDown, ChevronUp, Lightbulb, BookOpen, Edit3, ExternalLink } from 'lucide-react';
import { WORK_LIFE_GUIDES, CORE_AI_PRINCIPLES } from '../../data/workLifeGuides';
import { PROFESSIONS } from '../../data/professions';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { LLM_LAUNCHERS } from '../../utils/llmLaunchers';
import { getDuckDuckGoIconUrl } from '../../utils/aiToolIcons';

const CATEGORY_COLORS: Record<string, 'violet' | 'cyan' | 'emerald'> = {
  work: 'violet',
  life: 'cyan',
  mindset: 'emerald',
};

function GuideCard({ guide }: { guide: typeof WORK_LIFE_GUIDES[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState(guide.samplePrompt);

  const handleCopy = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card variant="elevated" className="p-6 space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <Badge variant={CATEGORY_COLORS[guide.category] || 'violet'} size="sm">
            {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
          </Badge>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
            {guide.timeSaved}
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold text-white leading-snug">{guide.title}</h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{guide.tagline}</p>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">{guide.whyItMatters}</p>

        {/* Accordion */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? 'Hide' : 'See'} how to apply
        </button>

        {expanded && (
          <ul className="space-y-2 pl-1">
            {guide.howToApply.map((item, i) => (
              <li key={i} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#635BFF] mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sample prompt with inline edit, copy & 4 LLM Launchers */}
      <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Sample Prompt</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditing ? 'Preview' : 'Edit Prompt'}</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#635BFF] hover:bg-[#5851EA] text-white text-[11px] font-semibold transition-all active:scale-95 shadow-sm"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {isEditing ? (
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={4}
            className="w-full p-2.5 rounded-xl bg-[#080A14] border border-[#00D4FF]/40 text-[#38BDF8] font-mono text-[11px] leading-relaxed focus:outline-none focus:border-[#00D4FF]"
          />
        ) : (
          <pre className="text-[11px] text-[#38BDF8] font-mono leading-relaxed whitespace-pre-wrap bg-[#080A14] border border-white/[0.07] rounded-xl p-3 max-h-32 overflow-y-auto select-all">
            {customText}
          </pre>
        )}

        {/* 4 Individual LLM chips with DuckDuckGo favicons */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
          <span className="text-[10px] font-mono text-slate-500">Run in:</span>
          <div className="flex flex-wrap items-center gap-1">
            {LLM_LAUNCHERS.map((llm) => (
              <a
                key={llm.id}
                href={llm.urlFn(customText)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => navigator.clipboard?.writeText(customText)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1 border ${llm.badgeBg} ${llm.badgeText} transition-all`}
                title={`Open in ${llm.name}`}
              >
                <img
                  src={getDuckDuckGoIconUrl(llm.domain)}
                  alt={llm.name}
                  className="w-3 h-3 rounded-sm object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span>{llm.name}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function PathGuideView() {
  const { startWizard, openIndustryInExplorer } = useApp();

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <Badge variant="violet" size="sm">Thought Leadership</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why AI. How AI.{' '}
            <span className="gradient-text">For Everyone.</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            A practical, honest guide to using LLMs to improve your work, accelerate learning, make better decisions, and reclaim time — regardless of your technical background.
          </p>
          <button
            onClick={startWizard}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5851EA] text-white text-sm font-semibold transition-all shadow-[0_4px_14px_rgba(99,91,255,0.4)]"
          >
            Find your personalised path <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Core Principles */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="pill-divider"><Lightbulb className="w-3.5 h-3.5 text-amber-400" />Core Principles</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Four truths before you open ChatGPT, Claude, Gemini, or Grok
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORE_AI_PRINCIPLES.map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0D1120] border border-white/[0.07] space-y-2 hover:border-white/[0.14] transition-all">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#635BFF] font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-sm font-bold text-white">{p.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Work & Life Impact Guides */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="pill-divider"><BookOpen className="w-3.5 h-3.5 text-[#00D4FF]" />Impact Areas</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Where AI saves the most time
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Five high-leverage domains where LLMs produce immediate, measurable results. Edit and customize any prompt directly, then launch across ChatGPT, Claude, Gemini, and Grok.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {WORK_LIFE_GUIDES.map(g => <GuideCard key={g.id} guide={g} />)}
          </div>
        </div>

        {/* Industry Paths */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="pill-divider">Industry Pathways</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI adoption by profession
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every discipline has its own bottlenecks and highest-leverage AI use cases. Select yours.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROFESSIONS.map(p => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => openIndustryInExplorer(p.id)}
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#0D1120] border border-white/[0.07] hover:border-white/[0.18] hover:bg-[#111827] text-left transition-all group"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${p.color}12`, border: `1px solid ${p.color}28` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: p.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{p.label}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                      View prompts <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#12182B] to-[#0A0D18] border border-[#635BFF]/25 text-center space-y-5">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to find your personalised AI roadmap?
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            The 60-second Discovery Wizard matches you with curated prompts, recommended tools, and a step-by-step learning path — based on exactly who you are.
          </p>
          <button
            onClick={startWizard}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#635BFF] hover:bg-[#5851EA] text-white font-semibold transition-all shadow-[0_4px_20px_rgba(99,91,255,0.45)] active:scale-[0.98]"
          >
            Start Free Discovery Wizard <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
