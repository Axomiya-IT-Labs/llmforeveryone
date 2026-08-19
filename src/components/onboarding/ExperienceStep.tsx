import { Card } from '../common/Card';
import { EXPERIENCE_LEVELS } from '../../data/experience';
import { useUser } from '../../context/UserContext';
import { Check } from 'lucide-react';

interface ExperienceStepProps {
  onNext: () => void;
}

export function ExperienceStep({ onNext }: ExperienceStepProps) {
  const { user, updateUser } = useUser();

  const handleSelect = (experienceId: string) => {
    updateUser({ experience: experienceId });
    setTimeout(onNext, 200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Your AI Experience Level</h2>
        <p className="text-gray-400 text-sm mt-1">We adjust prompt complexity based on your familiarity</p>
      </div>

      <div className="space-y-3">
        {EXPERIENCE_LEVELS.map((exp) => {
          const isSelected = user.experience === exp.id;
          return (
            <Card
              key={exp.id}
              hover
              selected={isSelected}
              onClick={() => handleSelect(exp.id)}
              className="p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-white font-bold text-base">{exp.label}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">{exp.description}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                      : 'border-white/20 bg-white/5'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}