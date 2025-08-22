import { FormFacadeReturn, FormConfigType } from "../model/types";
import { useForm as useReactHookForm, FieldValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import z from "zod";

export function useFormFacade<T extends FieldValues>(
  config: FormConfigType<T>,
): FormFacadeReturn<T> {
  const reactHookForm = useReactHookForm<T>({
    defaultValues: config.initialValues,
    resolver: zodResolver(config.validationSchema || z.object({})),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    setError: rhfSetError,
    reset: rhfReset,
    trigger,
  } = reactHookForm;

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = config.multiStepConfig?.totalSteps || 1;

  const setNextStep = () => {
    setCurrentStep((step) => (step < totalSteps ? step + 1 : step));
  };

  const setPrevStep = () => {
    setCurrentStep((step) => (step > 1 ? step - 1 : step));
  };

  const handleSubmitWrapper = rhfHandleSubmit((data: T) => {
    if (!config.onSubmit) return;
    config.onSubmit(data as T);
  });

  const formattedErrors = Object.fromEntries(
    Object.entries(errors).map(([key, error]) => [key, (error?.message as string) || ""]),
  ) as Partial<Record<keyof T, string>>;

  return {
    errors: formattedErrors,
    isSubmitting,
    isValid,
    handleSubmit: handleSubmitWrapper,
    setError: (field: keyof T, message: string) => {
      rhfSetError(field as Path<T>, { message });
    },
    reset: rhfReset,
    register,
    reactHookForm,
    isDirty,
    multiStepConfig: {
      totalSteps,
      currentStep,
      setNextStep,
      setPrevStep,
      stepsFields: config.multiStepConfig?.stepsFields || {},
    },
    trigger,
  };
}
