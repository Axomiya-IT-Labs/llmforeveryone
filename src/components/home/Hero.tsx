import { useState } from 'react';
import {
  ArrowRight, Copy, Check, ExternalLink,
  ShieldCheck, Zap, Bot, Layers, Sparkles, Edit3
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useApp } from '../../context/AppContext';
import { LLM_LAUNCHERS } from '../../utils/llmLaunchers';
import { getDuckDuckGoIconUrl } from '../../utils/aiToolIcons';

const PREVIEW_PROMPTS = [
  {
    role: 'Technology',
    label: 'Architecture Review',
    tag: 'Engineering',
    color: '#635BFF',
    prompt: `Act as a principal distributed-systems architect.

Review this microservice design for high-traffic scalability:
• Peak load: [100k req/sec]
• Latency target: [<50ms p99]
• Known bottleneck: [Postgres write locking]

Identify the top 3 single points of failure.
Recommend concrete decoupling strategies using Redis/Kafka.
Output as a structured markdown report.`,
  },
  {
    role: 'Healthcare',
    label: 'SOAP Note',
    tag: 'Clinical',
    color: '#10B981',
    prompt: `Act as a clinical documentation specialist.

Convert these consultation notes into SOAP format:
• Chief complaint: [3-day acute migraine, photophobia]
• Vitals: [BP 125/80, HR 78, afebrile]
• Exam: [Normal neuro, no papilledema]

Include: differential diagnosis, treatment plan,
and a plain-English patient education summary.`,
  },
  {
    role: 'Marketing',
    label: 'Conversion Hooks',
    tag: 'Growth',
    color: '#F59E0B',
    prompt: `Act as a direct-response copywriter with 10 years B2B SaaS experience.

Generate 5 distinct hook variations for:
• Target audience: [Series A SaaS Founders]
• Core offer: [Cut cloud compute costs by 40%]

Include: 1 contrarian angle, 1 stat-backed opener,
1 question-led hook, 1 bold claim, 1 story opener.
Format each as: Hook → One-line value expansion.`,
  },
  {
    role: 'Students',
    label: 'Study Curriculum',
    tag: 'Academic',
    color: '#A78BFA',
    prompt: `Act as an expert educator in [subject].

Build me a 14-day micro-curriculum to master [topic].
I am a [year-level] student with [background context].

For each day provide:
1. The single most important concept
2. A real-world example I can picture
3. One practice question with answer
4. A 5-minute Feynman recap exercise`,
  },
];

export function Hero() {
  const { startWizard, setView } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState<Record<number, string>>({});

  const current = PREVIEW_PROMPTS[activeTab];
  const activePromptText = editedText[activeTab] !== undefined ? editedText[activeTab] : current.prompt;

  const handleCopy = () => {
    navigator.clipboard.writeText(activePromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-14 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-30 blur-[140px]"
          style={{ background: 'radial-gradient(ellipse, rgba(99,91,255,0.35) 0%, rgba(0,212,255,0.15) 50%, transparent 80%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-14 lg:gap-10 items-center">

          {/* ── Left Copy ─────────────────────────── */}
          <div className="lg:col-span-5 space-y-7 text-center lg:text-left">
            {/* Announcement pill */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.09]">
              <span className="text-xs font-semibold text-slate-300">
                Free AI Discovery Platform
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.1] sm:leading-[1.07]">
              AI that actually fits{' '}
              <span className="gradient-text">your work.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Production-grade prompt recipes, a 60-second discovery wizard, and a curated AI tools directory — tailored for engineers, doctors, lawyers, teachers, students, and more.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <Button
                variant="stripe"
                size="lg"
                onClick={startWizard}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Start 60s Discovery Wizard
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setView('explorer')}
                icon={<Layers className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Browse Prompt Catalog
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-3 border-t border-white/[0.06] text-[11px] sm:text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" />100% In-Browser Privacy</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-[#00D4FF]" />9 Disciplines Covered</span>
              <span className="flex items-center gap-1.5"><Bot className="w-4 h-4 text-[#635BFF]" />ChatGPT · Claude · Gemini · Grok</span>
            </div>
          </div>

          {/* ── Right: Live Prompt Preview Card with In-Place Edit ───── */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-white/[0.1] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)]"
              style={{ background: 'linear-gradient(135deg, #0D1222 0%, #090D1A 100%)' }}
            >
              {/* Mac-style window bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0A0D18] border-b border-white/[0.07]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-2 text-[11px] font-mono text-slate-500">prompt_recipe.ai</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                      isEditing ? 'bg-[#00D4FF]/20 border-[#00D4FF]/40 text-[#38BDF8]' : 'bg-white/[0.05] border-white/[0.08] text-slate-300 hover:text-white'
                    }`}
                    title="Edit prompt text directly"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>{isEditing ? 'Preview' : 'Edit Text'}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#635BFF] hover:bg-[#5851EA] text-white text-[11px] font-semibold transition-all active:scale-95 shadow-sm"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-0.5 px-3 py-2 bg-[#09010D]/30 border-b border-white/[0.05] overflow-x-auto no-scrollbar">
                {PREVIEW_PROMPTS.map((p, i) => (
                  <button
                    key={p.role}
                    onClick={() => {
                      setActiveTab(i);
                      setIsEditing(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                      activeTab === i
                        ? 'bg-white/[0.09] text-white'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: activeTab === i ? p.color : '#475569' }}
                    />
                    {p.role}
                  </button>
                ))}
              </div>

              {/* Prompt code area (Preview or Edit Textarea) */}
              <div className="p-5 bg-[#06080F]">
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#635BFF]" />
                    <span className="text-[11px] font-mono text-slate-500">
                      // {current.label} — {isEditing ? 'editable mode' : 'click Edit Text to customize'}
                    </span>
                  </div>
                  <Badge variant="violet" size="sm">{current.tag}</Badge>
                </div>

                {isEditing ? (
                  <textarea
                    value={activePromptText}
                    onChange={(e) => setEditedText(prev => ({ ...prev, [activeTab]: e.target.value }))}
                    rows={8}
                    className="w-full p-3 rounded-xl bg-[#0A0D18] border border-[#00D4FF]/40 text-[#38BDF8] font-mono text-[12px] leading-relaxed focus:outline-none focus:border-[#00D4FF]"
                    placeholder="Tweak this prompt directly..."
                  />
                ) : (
                  <pre className="whitespace-pre-wrap break-words text-[#38BDF8] font-mono text-[11px] sm:text-[12.5px] leading-relaxed select-all w-full">
                    {activePromptText}
                  </pre>
                )}
              </div>

              {/* Card footer with 4 LLM Launchers */}
              <div className="px-5 py-3 bg-[#0A0D18] border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-mono text-slate-500">Run in:</span>
                  {LLM_LAUNCHERS.map((llm) => (
                    <a
                      key={llm.id}
                      href={llm.urlFn(activePromptText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => navigator.clipboard?.writeText(activePromptText)}
                      className={`px-2 py-1 rounded-md border text-[11px] font-semibold flex items-center gap-1 transition-all ${llm.badgeBg} ${llm.badgeText}`}
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

                <button
                  onClick={() => setView('explorer')}
                  className="text-[#8F89FF] hover:text-white font-semibold flex items-center gap-1 transition-colors"
                >
                  View 50+ prompts <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
