"use client";

import { useFormContext } from "../form-adapter";
import { Button } from "@/src/shared/ui";

interface multistepPaginationProps {
  children?: React.ReactNode;
  nextStepBtn: (onClick: () => void, disabled: boolean) => React.ReactNode;
}

export const MultistepPagination: React.FC<multistepPaginationProps> = ({ nextStepBtn }) => {
  const nextStepHandler = () => {
    if (!multiStep) return;
    multiStep.setNextStep();
  };
  const { multiStep, isValid, errors, isDirty } = useFormContext();

  return (
    <>
      {nextStepBtn(nextStepHandler, !isDirty || Object.keys(errors).length > 0)}

      {multiStep?.currentStep === multiStep?.totalSteps && (
        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      )}
    </>
  );
};
