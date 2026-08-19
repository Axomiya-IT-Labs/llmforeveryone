import { ArrowRight, GraduationCap } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { PROFESSIONS } from '../../data/professions';
import { useApp } from '../../context/AppContext';

export function IndustryGrid() {
  const { openIndustryInExplorer } = useApp();
  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-xl space-y-3">
          <Badge variant="cyan" size="sm">9 Professions</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI for your exact discipline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every field has unique bottlenecks. Select yours to browse vetted prompt frameworks built for your day-to-day tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Students */}
          <Card hover variant="elevated" onClick={() => openIndustryInExplorer('student')} className="p-6 group flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-[#635BFF]/10 border border-[#635BFF]/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 text-[#8F89FF]" />
              </div>
              <span className="text-[11px] font-mono text-slate-500">5 prompts</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-[#8F89FF] transition-colors">Students &amp; Academics</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Study guides, essays, exam prep, career readiness</p>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#8F89FF] border-t border-white/[0.06] pt-4 transition-colors">
              <span>Explore prompts</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Card>

          {/* 8 Professions */}
          {PROFESSIONS.map(p => {
            const Icon = p.icon;
            return (
              <Card key={p.id} hover variant="elevated" onClick={() => openIndustryInExplorer(p.id)} className="p-6 group flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${p.color}10`, border: `1px solid ${p.color}28` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">4 prompts</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-white transition-colors">{p.label}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{p.description}</p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-white border-t border-white/[0.06] pt-4 transition-colors">
                  <span>Browse workflows</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
