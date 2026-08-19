import { Zap, Lightbulb, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FEATURE_PILLARS, THOUGHT_PRINCIPLES } from '../../data/homeData';

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

export function FeaturePillars() {
  const { setView } = useApp();
  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="pill-divider"><Zap className="w-3.5 h-3.5 text-[#635BFF]" />What AI does for you</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Six ways AI changes what you accomplish every day
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Not theory. Not hype. Concrete, tangible shifts in how you work, learn, and make decisions.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-white/[0.06]">
          <StatBadge value="40+" label="Production Prompts" />
          <StatBadge value="9" label="Industries Covered" />
          <StatBadge value="17+" label="AI Tools Profiled" />
          <StatBadge value="0" label="Sign-ups Required" />
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURE_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-[#111625]/70 border border-white/[0.07] hover:border-white/[0.15] transition-all space-y-4 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${p.color}15`, border: `1px solid ${p.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: p.color }} />
                </div>
                <h3 className="text-[15px] font-bold text-white">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA row */}
        <div className="text-center">
          <button
            onClick={() => setView('guide')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8F89FF] hover:text-white transition-colors"
          >
            Read the full AI adoption guide <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function ThoughtLeadership() {
  const { startWizard, setView } = useApp();
  return (
    <section className="py-20 sm:py-28 bg-[#080B15] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            <div className="pill-divider"><Lightbulb className="w-3.5 h-3.5 text-amber-400" />Four Principles</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The right mental model for AI changes everything.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
              Before you open ChatGPT, before you run a single prompt — understand these four truths. They separate people who use AI effectively from people who give up after a week.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={startWizard}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#635BFF] hover:bg-[#5851EA] text-white text-sm font-semibold transition-all shadow-[0_4px_14px_rgba(99,91,255,0.4)]"
              >
                Find your path <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('guide')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm font-semibold hover:bg-white/[0.09] transition-all"
              >
                Read the full guide
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {THOUGHT_PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.number}
                  className="flex gap-4 p-5 rounded-2xl bg-[#0D1120] border border-white/[0.07] hover:border-white/[0.14] transition-all group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${p.iconColor}15`, border: `1px solid ${p.iconColor}30` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: p.iconColor }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-slate-600">{p.number}</span>
                      <h4 className="text-sm font-bold text-white">{p.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
