import { Card } from '../common/Card';
import { USER_TYPES } from '../../data/userTypes';
import { useUser } from '../../context/UserContext';
import type { UserRole } from '../../types';

interface UserTypeStepProps {
  onNext: () => void;
}

export function UserTypeStep({ onNext }: UserTypeStepProps) {
  const { user, updateUser } = useUser();

  const handleSelect = (typeId: UserRole) => {
    updateUser({ type: typeId });
    setTimeout(onNext, 200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Select Your Primary Profile</h2>
        <p className="text-gray-400 text-sm mt-1">This tunes your discovery journey to your current stage</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {USER_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = user.type === type.id;
          return (
            <Card
              key={type.id}
              hover
              selected={isSelected}
              onClick={() => handleSelect(type.id)}
              className="p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{type.label}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{type.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}