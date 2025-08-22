import React from "react";
import {
  UseFormRegister,
  FieldValues,
  DefaultValues,
  UseFormReturn,
  UseFormTrigger,
} from "react-hook-form";
import { z } from "zod";

export type FormConfigType<T> = {
  initialValues: DefaultValues<T>;
  validationSchema?: z.ZodType<T, any, any>;
  onSubmit?: (values: T) => void;
  mode?: "onSubmit" | "onChange" | "onBlur" | "onTouched" | "all";
  reValidateMode?: "onChange" | "onBlur" | "onSubmit";
  multiStepConfig?: {
    totalSteps: number;
    stepsFields: Record<number, string[]>;
  };
};

export type FormFacadeReturn<T extends FieldValues> = {
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
  handleSubmit: (e?: React.FormEvent) => void;
  setError: (field: keyof T, message: string) => void;
  reset: () => void;
  register: UseFormRegister<T>;
  reactHookForm: UseFormReturn<T>;
  isDirty: boolean;
  multiStepConfig?: {
    totalSteps: number;
    currentStep: number;
    setNextStep: () => void;
    setPrevStep: () => void;
    stepsFields: Record<number, string[]>;
  };
  trigger: UseFormTrigger<T>;
};
