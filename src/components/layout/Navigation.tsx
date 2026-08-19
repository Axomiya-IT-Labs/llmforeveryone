import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../common/Button';

interface NavigationProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  nextLabel?: string;
  prevLabel?: string;
  nextDisabled?: boolean;
}

export function Navigation({
  onNext,
  onPrev,
  isFirst,
  nextLabel = 'Next Step',
  prevLabel = 'Back',
  nextDisabled = false,
}: NavigationProps) {
  return (
    <div className="flex justify-between items-center gap-4 mt-8 pt-6 border-t border-white/10">
      <Button
        onClick={onPrev}
        disabled={isFirst}
        variant="secondary"
        icon={<ChevronLeft className="w-4 h-4" />}
      >
        {prevLabel}
      </Button>
      <Button
        onClick={onNext}
        disabled={nextDisabled}
        variant="primary"
        icon={<ChevronRight className="w-4 h-4" />}
        iconPosition="right"
      >
        {nextLabel}
      </Button>
    </div>
  );
}