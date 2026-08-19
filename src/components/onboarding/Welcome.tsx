import { Sparkles, ArrowRight, ShieldCheck, Zap, BookOpen } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { USER_TYPES } from '../../data/userTypes';
import { useUser } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';
import { Container } from '../common/Container';
import type { UserRole } from '../../types';

interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  const { user, updateUser } = useUser();
  const { theme } = useTheme();

  const handleSelectType = (typeId: UserRole) => {
    updateUser({ type: typeId });
  };

  const handleBegin = () => {
    if (!user.type) {
      updateUser({ type: 'professional' });
    }
    onStart();
  };

  return (
    <div className="py-8 sm:py-16">
      <Container maxWidth="lg">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-full px-5 py-2 mb-8 shadow-xl">
            <div className="w-5 h-5 rounded-md bg-cyan-400/20 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            </div>
            <span className="text-cyan-300 font-mono text-xs tracking-wider uppercase font-semibold">
              Interactive AI Discovery Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            LLM <span className={`bg-gradient-to-r ${theme.gradientText} bg-clip-text text-transparent`}>For Everyone</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed">
            Discover tailored AI workflows, context-engineered prompt recipes, and high-impact LLM applications customized for your career path.
          </p>

          {/* Quick Stats / Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-xs sm:text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" /> 8+ Industry Domains
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-400" /> 40+ Production Prompts
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Private &amp; Free
            </span>
          </div>
        </div>

        {/* Selection Cards */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-300 font-bold">
              Step 1: Choose Your Starting Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {USER_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = user.type === type.id;
              return (
                <Card
                  key={type.id}
                  hover
                  selected={isSelected}
                  onClick={() => handleSelectType(type.id)}
                  className="p-6 sm:p-8"
                >
                  <div className="text-center flex flex-col items-center">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                        isSelected
                          ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/30'
                          : 'bg-white/5 border border-white/10 text-gray-300'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{type.label}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{type.description}</p>
                    
                    <div className="mt-4 pt-4 border-t border-white/5 w-full flex items-center justify-center">
                      <span className={`text-xs font-semibold ${isSelected ? 'text-cyan-300' : 'text-gray-400'}`}>
                        {isSelected ? 'Selected' : 'Select ' + type.label}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Begin Button */}
          <div className="pt-4 flex justify-center">
            <Button
              size="lg"
              onClick={handleBegin}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="w-full sm:w-auto min-w-[240px] text-base"
            >
              Begin Discovery Journey
            </Button>
          </div>
        </div>

        {/* Feature Grid Below */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto border-t border-white/10 pt-12">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Role-Specific Pathways
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Curated modules tailored specifically for engineers, clinicians, educators, lawyers, marketers, designers, and financiers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Interactive Integration
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              One-click prompt export to ChatGPT, Claude, and Gemini with formatted templates ready to run.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-400" />
              Zero Authentication
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              No account creation or passwords. Instant access with 100% private in-browser memory.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}