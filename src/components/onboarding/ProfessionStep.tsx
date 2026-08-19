import { Card } from '../common/Card';
import { PROFESSIONS } from '../../data/professions';
import { useUser } from '../../context/UserContext';

interface ProfessionStepProps {
  onNext: () => void;
}

export function ProfessionStep({ onNext }: ProfessionStepProps) {
  const { user, updateUser } = useUser();

  const handleSelect = (fieldId: string) => {
    updateUser({ field: fieldId });
    setTimeout(onNext, 200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">What is your industry or focus?</h2>
        <p className="text-gray-400 text-sm mt-1">Choose the area where you want to apply AI workflows</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {PROFESSIONS.map((prof) => {
          const Icon = prof.icon;
          const isSelected = user.field === prof.id;

          return (
            <Card
              key={prof.id}
              hover
              selected={isSelected}
              onClick={() => handleSelect(prof.id)}
              className="p-4 sm:p-5"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${prof.color}18`,
                    border: `1px solid ${prof.color}35`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: prof.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm tracking-tight">{prof.label}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{prof.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}