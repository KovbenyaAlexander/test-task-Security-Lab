"use client";

import { useFormContext } from "../form-adapter";

interface StepProps {
  children: React.ReactNode;
  step: number;
}

export const Step: React.FC<StepProps> = ({ children, step }) => {
  const { multiStep } = useFormContext();
  return multiStep?.currentStep === step ? <>{children}</> : null;
};
