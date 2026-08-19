import { ArrowRight, Compass, Sliders, Play } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const STEPS = [
  {
    n: '01', icon: Compass, color: '#635BFF',
    title: 'Discover Your Role',
    body: 'Answer 4 quick questions about your profession, goals, and experience with AI. Takes under 60 seconds.',
  },
  {
    n: '02', icon: Sliders, color: '#00D4FF',
    title: 'Customise Live',
    body: 'Your personalised prompt stack appears instantly. Edit bracketed variables directly — no copy-paste required.',
  },
  {
    n: '03', icon: Play, color: '#10B981',
    title: 'Launch in Any AI Tool',
    body: 'One-click to open your refined prompt directly in ChatGPT, Claude, or Gemini — ready to run.',
  },
];

export function WizardPreview() {
  const { startWizard } = useApp();
  return (
    <section className="py-20 sm:py-28 bg-[#08000B] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left copy */}
          <div className="space-y-7">
            <div className="pill-divider"><Compass className="w-3.5 h-3.5 text-[#635BFF]" />60-Second Discovery Wizard</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Your personalised AI roadmap in under a minute.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Stop sifting through generic advice. Tell us your profession and goals — we'll surface the exact prompt frameworks, AI tools, and learning path for your situation.
            </p>
            <div className="space-y-4">
              {STEPS.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.n} className="flex gap-4 items-start">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${s.color}15`, border: `1px solid ${s.color}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: s.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-600">{s.n}</span>
                        <h4 className="text-sm font-bold text-white">{s.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{s.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={startWizard}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5851EA] text-white text-sm font-semibold transition-all shadow-[0_4px_14px_rgba(99,91,255,0.4)] active:scale-[0.98]"
            >
              Start Discovery Wizard <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: mini wizard mockup card */}
          <div className="rounded-2xl bg-[#0D1020] border border-white/[0.1] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
            {/* Progress bar */}
            <div className="px-6 pt-5 pb-4 border-b border-white/[0.07]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#8F89FF]">Step 2 of 4 · Industry</span>
                <span className="text-xs text-slate-500">50%</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-[#635BFF] rounded-full" />
              </div>
            </div>

            {/* Question */}
            <div className="px-6 py-5 space-y-4">
              <p className="text-[15px] font-bold text-white">What is your primary industry?</p>
              <div className="grid grid-cols-2 gap-2.5">
                {['Technology', 'Healthcare', 'Education', 'Business', 'Law', 'Marketing'].map((item, i) => (
                  <div
                    key={item}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-default ${
                      i === 0
                        ? 'bg-[#635BFF]/15 border-[#635BFF]/50 text-[#8F89FF] shadow-[0_0_0_1px_rgba(99,91,255,0.3)]'
                        : 'bg-white/[0.03] border-white/[0.07] text-slate-400'
                    }`}
                  >
                    {item}
                    {i === 0 && <span className="ml-1.5 text-[#635BFF]">✓</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/[0.07] flex justify-between items-center">
              <span className="text-xs text-slate-600">← Back</span>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8F89FF]">
                Continue → <span className="text-slate-600">Step 3: Capabilities</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
