import { Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

const DEFAULT_LABELS = ['Role', 'Field', 'Interests', 'Experience', 'Usage'];

export function Stepper({ currentStep, totalSteps, stepLabels = DEFAULT_LABELS }: StepperProps) {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      {/* Progress Bars */}
      <div className="w-full flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isPassed = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex-1 flex flex-col gap-1.5">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  isPassed || isCurrent
                    ? `bg-gradient-to-r ${theme.gradientText} shadow-sm shadow-cyan-500/30`
                    : 'bg-white/10'
                }`}
                style={{
                  opacity: isPassed ? 1 : isCurrent ? 1 : 0.35,
                }}
              />
              <div className="hidden sm:flex items-center justify-between text-[11px]">
                <span
                  className={`font-mono transition-colors ${
                    isCurrent
                      ? 'text-cyan-300 font-bold'
                      : isPassed
                      ? 'text-gray-300'
                      : 'text-gray-500'
                  }`}
                >
                  {stepLabels[index] || `Step ${index + 1}`}
                </span>
                {isPassed && <Check className="w-3 h-3 text-cyan-400" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}