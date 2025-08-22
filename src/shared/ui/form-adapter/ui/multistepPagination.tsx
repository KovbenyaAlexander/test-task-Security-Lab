"use client";
import { useFormContext } from "../form-adapter";
import { Button } from "@/src/shared/ui";
interface multistepPaginationProps {
  children?: React.ReactNode;
  nextStepBtn: (onClick: () => void, disabled: boolean) => React.ReactNode;
  prevStepBtn?: (onClick: () => void, disabled: boolean) => React.ReactNode;
}
export const MultistepPagination: React.FC<multistepPaginationProps> = ({
  nextStepBtn,
  prevStepBtn,
}) => {
  const { multiStepConfig, isValid, errors, isDirty, trigger } = useFormContext();
  if (!multiStepConfig) return null;
  const { currentStep, setNextStep, setPrevStep, stepsFields, totalSteps } = multiStepConfig;

  const nextStepHandler = async () => {
    const isValid = await trigger(stepsFields[currentStep], { shouldFocus: true });
    if (!isValid) return;
    setNextStep();
  };

  const prevStepHandler = () => {
    setPrevStep();
  };

  return (
    <>
      {prevStepBtn && prevStepBtn(prevStepHandler, !isDirty || Object.keys(errors).length > 0)}

      {currentStep < totalSteps ? (
        nextStepBtn(nextStepHandler, !isDirty || Object.keys(errors).length > 0)
      ) : (
        <Button type="submit" disabled={!isValid} key="submit">
          Submit
        </Button>
      )}
    </>
  );
};
