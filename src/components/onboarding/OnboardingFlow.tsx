import { Container } from '../common/Container';
import { Stepper } from '../layout/Stepper';
import { Navigation } from '../layout/Navigation';
import { UserTypeStep } from './UserTypeStep';
import { ProfessionStep } from './ProfessionStep';
import { InterestsStep } from './InterestsStep';
import { ExperienceStep } from './ExperienceStep';
import { UsageStep } from './UsageStep';
import { useStepNavigation } from '../../hooks/useStepNavigation';
import { useUser } from '../../context/UserContext';
import { isStepComplete } from '../../utils/validators';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { user } = useUser();
  const totalSteps = 5;
  const { currentStep, isAnimating, nextStep, prevStep, isFirst, isLast } = useStepNavigation(totalSteps);

  const canProceed = isStepComplete(user, currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <UserTypeStep onNext={nextStep} />;
      case 1:
        return <ProfessionStep onNext={nextStep} />;
      case 2:
        return <InterestsStep onNext={nextStep} />;
      case 3:
        return <ExperienceStep onNext={nextStep} />;
      case 4:
        return <UsageStep onComplete={onComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="py-6 sm:py-10">
      <Container maxWidth="lg">
        {/* Stepper Header */}
        <div className="mb-8 p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
          <Stepper currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Step Content with animation transition */}
        <div
          className={`transition-all duration-300 ${
            isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {renderStep()}
        </div>

        {/* Bottom Navigation for intermediate steps */}
        {currentStep < 4 && (
          <Navigation
            onNext={nextStep}
            onPrev={prevStep}
            isFirst={isFirst}
            isLast={isLast}
            nextDisabled={!canProceed}
            nextLabel={currentStep === 3 ? 'Final Step →' : 'Next Step →'}
          />
        )}
      </Container>
    </div>
  );
}