import { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Layers, 
  RotateCcw,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Wrench
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ACADEMIC_LEVELS, ACADEMIC_BRANCHES } from '../../data/studentTracks';
import { ALL_PROFESSIONS } from '../../data/professionalTracks';
import { INTERESTS } from '../../data/interests';
import { AI_TOOLS } from '../../data/aiTools';
import { generateContent } from '../../utils/contentGenerator';
import { getDuckDuckGoIconUrl } from '../../utils/aiToolIcons';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PromptCard } from '../explorer/PromptCard';

export function DiscoveryWizard() {
  const { user, updateUser, setView, openIndustryInExplorer } = useApp();
  const [step, setStep] = useState(0);

  const isStudent = user.type === 'student';
  const maxStepIndex = isStudent ? 4 : 3;

  const handleNext = () => {
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('home');
    }
  };

  // Generate tailored prompt stack based on profile
  const tailoredModules = useMemo(() => {
    return generateContent(user);
  }, [user]);

  // Recommended AI tools for this specific profile
  const recommendedTools = useMemo(() => {
    if (user.type === 'student') {
      if (user.academicLevel === 'phd' || user.academicBranch === 'medical') {
        return AI_TOOLS.filter(t => ['notebooklm', 'consensus', 'elicit', 'claude'].includes(t.id));
      }
      if (user.academicBranch === 'engineering') {
        return AI_TOOLS.filter(t => ['cursor', 'chatgpt', 'v0', 'github-copilot'].includes(t.id));
      }
      return AI_TOOLS.filter(t => ['notebooklm', 'chatgpt', 'perplexity', 'claude'].includes(t.id));
    }
    
    // For professionals
    const profId = user.professionCategory || user.field;
    if (profId === 'doctor' || profId === 'nurse') {
      return AI_TOOLS.filter(t => ['claude', 'consensus', 'elicit', 'notebooklm'].includes(t.id));
    }
    if (profId === 'software_developer') {
      return AI_TOOLS.filter(t => ['cursor', 'github-copilot', 'claude', 'v0'].includes(t.id));
    }
    if (profId === 'farmer' || profId === 'homemaker') {
      return AI_TOOLS.filter(t => ['chatgpt', 'gemini', 'perplexity'].includes(t.id));
    }
    if (profId === 'founder' || profId === 'finance') {
      return AI_TOOLS.filter(t => ['julius', 'claude', 'chatgpt', 'perplexity'].includes(t.id));
    }
    if (profId === 'lawyer') {
      return AI_TOOLS.filter(t => ['claude', 'harvey', 'casetext', 'perplexity'].includes(t.id));
    }
    return AI_TOOLS.filter(t => t.featured);
  }, [user]);

  const roleTitle = user.type === 'student'
    ? `${user.academicLevel ? user.academicLevel.replace('_', ' ').toUpperCase() : 'STUDENT'} • ${user.academicBranch ? user.academicBranch.replace('_', ' ').toUpperCase() : 'ACADEMIC'}`
    : ALL_PROFESSIONS.find(p => p.id === (user.professionCategory || user.field))?.label || 'CAREER EXPLORER';

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Wizard Topbar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 0 ? 'Back to Overview' : 'Previous Step'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#8F89FF]">
              {step < maxStepIndex ? `Step ${step + 1} of ${maxStepIndex}` : 'Plan Synthesized'}
            </span>
          </div>
        </div>

        {/* Step Progress Bar */}
        {step < maxStepIndex && (
          <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#635BFF] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((step + 1) / maxStepIndex) * 100}%` }}
            />
          </div>
        )}

        {/* ══════════════════════════════════════════
            STEP 0: Select Primary Track (Cleanly Separated)
        ══════════════════════════════════════════ */}
        {step === 0 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <Badge variant="violet" size="sm">Step 1 of 4</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Select your primary discovery track
              </h2>
              <p className="text-slate-400 text-sm">
                Choose your track. Prompts and tools are tailored specifically to each individual path without overlap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* SECTION A: Students & Academics */}
              <Card
                hover
                selected={user.type === 'student'}
                onClick={() => {
                  updateUser({ type: 'student' });
                  setTimeout(handleNext, 180);
                }}
                className="p-6 sm:p-7 text-left flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#635BFF]/15 border border-[#635BFF]/30 flex items-center justify-center text-[#8F89FF] group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8F89FF]">Track 01</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Students &amp; Academics</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Structured across 4 distinct academic tiers: High School (K-12), Undergraduate (UG), Postgraduate (PG / Master’s), and PhD / Doctoral Researchers.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#8F89FF] group-hover:text-white">
                  <span>Enter Student Pathway</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>

              {/* SECTION B: Working Professionals & Life Roles */}
              <Card
                hover
                selected={user.type === 'professional'}
                onClick={() => {
                  updateUser({ type: 'professional' });
                  setTimeout(handleNext, 180);
                }}
                className="p-6 sm:p-7 text-left flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#00D4FF]/15 border border-[#00D4FF]/30 flex items-center justify-center text-[#38BDF8] group-hover:scale-105 transition-transform">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00D4FF]">Track 02</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Working Professionals &amp; Life Roles</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Tailored workflows for Doctors, Nurses, Software Developers, Teachers, Marketing Heads, Founders, Farmers, Homemakers, Lawyers, and Financial Analysts.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#38BDF8] group-hover:text-white">
                  <span>Enter Professional Pathway</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            STUDENT PATH: STEP 1 (Academic Level Selection)
        ══════════════════════════════════════════ */}
        {isStudent && step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <Badge variant="cyan" size="sm">Student Track • Step 2 of 4</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                What is your academic level?
              </h2>
              <p className="text-slate-400 text-sm">
                Prompts and difficulty will calibrate to your exact educational stage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ACADEMIC_LEVELS.map((lvl) => {
                const Icon = lvl.icon;
                const isSelected = user.academicLevel === lvl.id;
                return (
                  <Card
                    key={lvl.id}
                    hover
                    selected={isSelected}
                    onClick={() => {
                      updateUser({ academicLevel: lvl.id });
                      setTimeout(handleNext, 180);
                    }}
                    className="p-5 text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${lvl.color}15`, border: `1px solid ${lvl.color}35` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: lvl.color }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{lvl.label}</h3>
                        <p className="text-[11px] font-mono text-[#8F89FF] mt-0.5">{lvl.sublabel}</p>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{lvl.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            STUDENT PATH: STEP 2 (Academic Branch/Discipline)
        ══════════════════════════════════════════ */}
        {isStudent && step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <Badge variant="violet" size="sm">Student Track • Step 3 of 4</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                What is your academic major or branch?
              </h2>
              <p className="text-slate-400 text-sm">
                Select your academic discipline to unlock domain-specific templates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {ACADEMIC_BRANCHES.map((branch) => {
                const Icon = branch.icon;
                const isSelected = user.academicBranch === branch.id;
                return (
                  <Card
                    key={branch.id}
                    hover
                    selected={isSelected}
                    onClick={() => {
                      updateUser({ academicBranch: branch.id, field: branch.id });
                      setTimeout(handleNext, 180);
                    }}
                    className="p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${branch.color}15`, border: `1px solid ${branch.color}35` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: branch.color }} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{branch.label}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{branch.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            PROFESSIONAL PATH: STEP 1 (Role Selection Grouped by Sector)
        ══════════════════════════════════════════ */}
        {!isStudent && step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <Badge variant="cyan" size="sm">Professional Track • Step 2 of 3</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Select your specific profession or role
              </h2>
              <p className="text-slate-400 text-sm">
                Each profession has dedicated prompt frameworks, workflows, and vetted tool recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {ALL_PROFESSIONS.map((prof) => {
                const Icon = prof.icon;
                const isSelected = user.professionCategory === prof.id || user.field === prof.id;
                return (
                  <Card
                    key={prof.id}
                    hover
                    selected={isSelected}
                    onClick={() => {
                      updateUser({ professionCategory: prof.id, field: prof.id });
                      setTimeout(handleNext, 180);
                    }}
                    className="p-4 flex flex-col justify-between text-left group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${prof.color}15`, border: `1px solid ${prof.color}35` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: prof.color }} />
                        </div>
                        <h4 className="text-sm font-bold text-white">{prof.label}</h4>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{prof.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            SHARED STEP: Capabilities & Goal Priorities
        ══════════════════════════════════════════ */}
        {((isStudent && step === 3) || (!isStudent && step === 2)) && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="violet" size="sm">
                  {isStudent ? 'Step 4 of 4' : 'Step 3 of 3'}
                </Badge>
                <span className="text-xs font-mono text-[#8F89FF]">
                  {user.interests.length} selected
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                What capabilities do you want to unlock?
              </h2>
              <p className="text-slate-400 text-sm">
                Select your high-priority goals to customize your recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTERESTS.map((interest) => {
                const Icon = interest.icon;
                const isSelected = user.interests.includes(interest.id);
                return (
                  <Card
                    key={interest.id}
                    hover
                    selected={isSelected}
                    onClick={() => {
                      const updated = isSelected
                        ? user.interests.filter(i => i !== interest.id)
                        : [...user.interests, interest.id];
                      updateUser({ interests: updated });
                    }}
                    className="p-3.5 text-left"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#635BFF] text-white' : 'bg-white/[0.05] text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">{interest.label}</h4>
                          {interest.description && (
                            <p className="text-[11px] text-slate-400 truncate">{interest.description}</p>
                          )}
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                          isSelected ? 'bg-[#635BFF] border-[#635BFF] text-white' : 'border-white/20'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="stripe"
                onClick={handleNext}
                disabled={user.interests.length === 0}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Synthesize My AI Plan ({user.interests.length} Selected)
              </Button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            FINAL OUTPUT: Synthesized Tailored Plan
        ══════════════════════════════════════════ */}
        {((isStudent && step === 4) || (!isStudent && step === 3)) && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* Header Banner */}
            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#12182B] via-[#0E1322] to-[#0A0D18] border border-[#635BFF]/35 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#635BFF]/20 border border-[#635BFF]/40 flex items-center justify-center text-[#8F89FF]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#8F89FF] uppercase tracking-wider">
                    Personalized AI Plan Generated
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep(0)}
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    Change Pathway
                  </Button>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {roleTitle} • AI Roadmap
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Here are your {tailoredModules.length} vetted prompt templates and recommended AI tools. You can customize variables live or edit the text directly before copying to your clipboard.
              </p>
            </div>

            {/* Recommended AI Tools Section */}
            {recommendedTools.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#00D4FF]" />
                  <span>Recommended AI Toolstack for Your Track</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {recommendedTools.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 rounded-2xl bg-[#0D1120] border border-white/[0.08] flex flex-col justify-between space-y-3 group hover:border-white/20 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={getDuckDuckGoIconUrl(t.url)}
                              alt={t.name}
                              className="w-4 h-4 rounded object-contain shrink-0"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <h4 className="text-sm font-bold text-white truncate">{t.name}</h4>
                          </div>
                          <Badge variant={t.pricing === 'Free' ? 'emerald' : t.pricing === 'Paid' ? 'amber' : 'violet'} size="sm">
                            {t.pricing}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{t.tagline}</p>
                      </div>

                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-[#8F89FF] hover:text-white flex items-center gap-1 pt-2 border-t border-white/[0.06] transition-colors"
                      >
                        <span>Open Tool</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tailored Prompts Section with Live Preference/Edit feature */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#635BFF]" />
                  <span>Curated Prompt Recipes ({tailoredModules.length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {tailoredModules.map((m) => (
                  <PromptCard key={m.id} module={m} />
                ))}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={() => setView('explorer')}
              >
                Browse Entire 50+ Prompt Catalog
              </Button>

              <Button
                variant="stripe"
                onClick={() => {
                  if (user.field) openIndustryInExplorer(user.field);
                  else setView('explorer');
                }}
              >
                Explore Full Category Hub →
              </Button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
