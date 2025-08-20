"use client";

import React, { createContext, useContext } from "react";
import {
  useForm as useReactHookForm,
  UseFormRegister,
  FieldValues,
  Path,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormConfig<T> = {
  initialValues: DefaultValues<T>;
  validationSchema: z.ZodType<T, any, any>;
  onSubmit: (values: T) => void;
};

type FormFacadeReturn<T extends FieldValues> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
  handleSubmit: (e?: React.FormEvent) => void;
  setError: (field: keyof T, message: string) => void;
  reset: () => void;
  register: UseFormRegister<T>;
};

const FormContext = createContext<FormFacadeReturn<FieldValues> | null>(null);

export function useFormFacade<T extends FieldValues>(config: FormConfig<T>): FormFacadeReturn<T> {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError: rhfSetError,
    reset: rhfReset,
    watch,
  } = useReactHookForm<T>({
    defaultValues: config.initialValues,
    resolver: zodResolver(config.validationSchema),
    mode: "onSubmit",
  });

  const values = watch();

  const formattedErrors: Partial<Record<keyof T, string>> = {};
  Object.keys(errors).forEach((key) => {
    const error = errors[key as keyof typeof errors];
    if (error?.message && typeof error.message === "string") {
      formattedErrors[key as keyof T] = error.message;
    }
  });

  const handleSubmitWrapper = rhfHandleSubmit((data: T) => {
    config.onSubmit(data);
  });

  return {
    values,
    errors: formattedErrors,
    isSubmitting,
    isValid,
    handleSubmit: handleSubmitWrapper,
    setError: (field: keyof T, message: string) => {
      rhfSetError(field as Path<T>, { message });
    },
    reset: rhfReset,
    register,
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
      <form onSubmit={formState.handleSubmit} noValidate className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export function useFormContext<T extends FieldValues>(): FormFacadeReturn<T> {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a Form component");
  }
  return context as FormFacadeReturn<T>;
}
