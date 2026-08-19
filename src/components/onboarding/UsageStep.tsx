import { useState } from 'react';
import { Card } from '../common/Card';
import { USAGE_OPTIONS } from '../../data/usageOptions';
import { useUser } from '../../context/UserContext';
import { Button } from '../common/Button';
import { Sparkles, Check } from 'lucide-react';

interface UsageStepProps {
  onComplete: () => void;
}

export function UsageStep({ onComplete }: UsageStepProps) {
  const { user, updateUser } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleToggle = (option: string) => {
    const updated = user.usage.includes(option)
      ? user.usage.filter(u => u !== option)
      : [...user.usage, option];
    updateUser({ usage: updated });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onComplete();
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How will you apply AI day-to-day?</h2>
          <p className="text-gray-400 text-sm mt-1">Select your intended workflows</p>
        </div>
        <div className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 self-start sm:self-auto">
          {user.usage.length} selected
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {USAGE_OPTIONS.map((option) => {
          const isSelected = user.usage.includes(option);
          return (
            <Card
              key={option}
              hover
              selected={isSelected}
              onClick={() => handleToggle(option)}
              className="p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`text-sm font-medium ${isSelected ? 'text-white font-semibold' : 'text-gray-300'}`}>
                  {option}
                </span>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                    isSelected ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'border-white/20 bg-white/5'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="pt-4">
        <Button
          onClick={handleGenerate}
          disabled={user.usage.length === 0 || isGenerating}
          variant="primary"
          icon={<Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />}
          iconPosition="right"
          size="lg"
          className="w-full justify-center text-base"
        >
          {isGenerating ? 'Synthesizing Your AI Discovery Modules...' : 'Generate My Tailored AI Journey'}
        </Button>
      </div>
    </div>
  );
}