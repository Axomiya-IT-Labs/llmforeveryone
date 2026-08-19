import { useState, useMemo } from 'react';
import { RotateCcw, Compass, User, Briefcase, Award } from 'lucide-react';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { ContentViewer } from './ContentViewer';
import { useUser } from '../../context/UserContext';
import { generateContent } from '../../utils/contentGenerator';

interface ExploreViewProps {
  onReset: () => void;
}

export function ExploreView({ onReset }: ExploreViewProps) {
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);

  const modules = useMemo(() => generateContent(user), [user]);

  const currentModule = modules[currentIndex] || modules[0];
  const totalModules = modules.length;

  const handleNext = () => {
    if (currentIndex < totalModules - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelectIndex = (idx: number) => {
    if (idx >= 0 && idx < totalModules) {
      setCurrentIndex(idx);
    }
  };

  if (modules.length === 0) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto" />
          <p className="text-gray-300 font-mono text-sm">Generating your personalized AI modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10">
      <Container maxWidth="lg">
        {/* Profile Pathway Summary Bar */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-semibold">
              <User className="w-3.5 h-3.5" />
              <span className="capitalize">{user.type || 'Explorer'}</span>
            </div>

            {user.field && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-semibold">
                <Briefcase className="w-3.5 h-3.5" />
                <span className="capitalize">{user.field}</span>
              </div>
            )}

            {user.experience && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300 font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span className="capitalize">{user.experience}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>{currentIndex + 1} / {totalModules}</span>
            </div>

            <Button
              onClick={onReset}
              variant="outline"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Change Focus
            </Button>
          </div>
        </div>

        {/* Content Viewer Component */}
        <ContentViewer
          module={currentModule}
          currentIndex={currentIndex}
          totalModules={totalModules}
          onNext={handleNext}
          onPrev={handlePrev}
          onSelectIndex={handleSelectIndex}
          allModules={modules}
        />
      </Container>
    </div>
  );
}