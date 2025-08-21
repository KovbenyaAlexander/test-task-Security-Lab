"use client";

import React, { createContext, useContext, useMemo } from "react";
import {
  useForm as useReactHookForm,
  UseFormRegister,
  FieldValues,
  Path,
  DefaultValues,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormConfig<T> = {
  initialValues: DefaultValues<T>;
  validationSchema: z.ZodType<T, any, any>;
  onSubmit: (values: T) => void;
  mode?: "onSubmit" | "onChange" | "onBlur" | "onTouched" | "all";
  reValidateMode?: "onChange" | "onBlur" | "onSubmit";
};

type FormFacadeReturn<T extends FieldValues> = {
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
  handleSubmit: (e?: React.FormEvent) => void;
  setError: (field: keyof T, message: string) => void;
  reset: () => void;
  register: UseFormRegister<T>;
  reactHookForm: UseFormReturn<T>;
};

const FormContext = createContext<FormFacadeReturn<FieldValues> | null>(null);

export function useFormFacade<T extends FieldValues>(config: FormConfig<T>): FormFacadeReturn<T> {
  const reactHookForm = useReactHookForm<T>({
    defaultValues: config.initialValues,
    resolver: zodResolver(config.validationSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError: rhfSetError,
    reset: rhfReset,
  } = reactHookForm;

  const handleSubmitWrapper = rhfHandleSubmit((data: T) => {
    config.onSubmit(data);
  });

  //{[inputName]: errorMessage}
  const formattedErrors = useMemo(() => {
    return Object.fromEntries(
      Object.entries(errors).map(([key, error]) => [key, (error?.message as string) || ""]),
    ) as Partial<Record<keyof T, string>>;
  }, [errors]);

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
  };
}

export function Form<T extends FieldValues>(props: {
  children: React.ReactNode;
  formState: FormFacadeReturn<T>;
  className?: string;
}) {
  const { children, formState, className } = props;

  return (
    <FormContext.Provider value={formState as FormFacadeReturn<any>}>
      <FormProvider {...formState.reactHookForm}>
        <form onSubmit={formState.handleSubmit} noValidate className={className}>
          {children}
        </form>
      </FormProvider>
    </FormContext.Provider>
  );
}

export function useFormContext<T extends FieldValues>(): FormFacadeReturn<T> {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Context error");
  }
  return context as FormFacadeReturn<T>;
}
