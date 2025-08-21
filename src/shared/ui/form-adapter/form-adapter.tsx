"use client";

import React, { createContext, useContext } from "react";
import { FieldValues, FormProvider } from "react-hook-form";
import { useFormLeaveGuard } from "./hooks/useFormLeaveGuard";

import { FormFacadeReturn } from "./model/types";

const FormContext = createContext<FormFacadeReturn<FieldValues> | null>(null);

export function Form<T extends FieldValues>(props: {
  children: React.ReactNode;
  formState: FormFacadeReturn<T>;
  className?: string;
}) {
  const { children, formState, className } = props;

  useFormLeaveGuard(formState.isDirty);

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
