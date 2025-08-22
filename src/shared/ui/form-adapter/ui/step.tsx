"use client";

import { useFormContext } from "../form-adapter";

interface StepProps {
  children: React.ReactNode;
  step: number;
}

export const Step: React.FC<StepProps> = ({ children, step }) => {
  const { multiStepConfig } = useFormContext();

  return multiStepConfig?.currentStep === step ? <>{children}</> : null;
};
