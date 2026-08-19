import { useState } from 'react';

export function useStepNavigation(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  return {
    currentStep,
    isAnimating,
    nextStep,
    prevStep,
    goToStep,
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1
  };
}