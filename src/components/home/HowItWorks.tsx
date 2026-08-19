import { Sliders, Play, Compass, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

const STEPS = [
  {
    step: '01',
    title: 'Select Role & Focus',
    description: 'Choose your profession or study field, experience level, and day-to-day workflow goals.',
    icon: Compass,
    color: '#635BFF',
  },
  {
    step: '02',
    title: 'Inject Live Variables',
    description: 'Customize bracketed variables like [tech stack] or [target persona] directly in the interactive editor.',
    icon: Sliders,
    color: '#00D4FF',
  },
  {
    step: '03',
    title: 'Execute Across AI Models',
    description: 'One-click launch directly into ChatGPT, Claude, or Gemini with production-ready prompt framing.',
    icon: Play,
    color: '#10B981',
  },
];

export function HowItWorks() {
  const { startWizard } = useApp();

  return (
    <section className="py-16 sm:py-24 border-t border-white/[0.06] bg-[#080B15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="violet" size="sm">
            Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How LLM For Everyone works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From role discovery to live prompt execution in three simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="p-8 rounded-2xl bg-[#111625]/70 border border-white/[0.08] relative group hover:border-white/20 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${s.color}15`,
                      border: `1px solid ${s.color}35`,
                      color: s.color,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-mono font-extrabold text-slate-600 group-hover:text-slate-400 transition-colors">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#635BFF]/20 via-[#00D4FF]/10 to-[#0A2540]/60 border border-[#635BFF]/30 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to upgrade your daily AI workflow?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Get personalized prompt templates tailored to your background in less than a minute. No registration or credit card required.
          </p>
          <div>
            <Button
              variant="stripe"
              size="lg"
              onClick={startWizard}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Start Free Discovery Wizard
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
