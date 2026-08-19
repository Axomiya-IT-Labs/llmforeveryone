import { Card } from '../common/Card';
import { INTERESTS } from '../../data/interests';
import { useUser } from '../../context/UserContext';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

interface InterestsStepProps {
  onNext?: () => void;
}

export function InterestsStep({ onNext }: InterestsStepProps) {
  const { user, updateUser } = useUser();

  const handleToggle = (interestId: string) => {
    const updated = user.interests.includes(interestId)
      ? user.interests.filter(i => i !== interestId)
      : [...user.interests, interestId];
    updateUser({ interests: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">What AI capabilities interest you?</h2>
          <p className="text-gray-400 text-sm mt-1">Select all areas you want to explore</p>
        </div>
        <div className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 self-start sm:self-auto">
          {user.interests.length} selected
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {INTERESTS.map((interest) => {
          const Icon = interest.icon;
          const isSelected = user.interests.includes(interest.id);

          return (
            <Card
              key={interest.id}
              hover
              selected={isSelected}
              onClick={() => handleToggle(interest.id)}
              className="p-4 sm:p-5"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold text-sm">{interest.label}</h3>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                  {interest.description && (
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{interest.description}</p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {onNext && user.interests.length > 0 && (
        <div className="pt-2 flex justify-end">
          <Button
            onClick={onNext}
            variant="outline"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Save &amp; Continue
          </Button>
        </div>
      )}
    </div>
  );
}