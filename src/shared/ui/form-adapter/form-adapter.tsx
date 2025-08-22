"use client";

import React, { createContext, useContext, useEffect } from "react";
import { FieldValues, FormProvider } from "react-hook-form";

import { FormFacadeReturn } from "./model/types";
import { useModalDirty } from "@/src/shared/ui/modal/modal";

const FormContext = createContext<FormFacadeReturn<FieldValues> | null>(null);

export function Form<T extends FieldValues>(props: {
  children: React.ReactNode;
  formState: FormFacadeReturn<T>;
  className?: string;
}) {
  const { children, formState, className } = props;

  const modalDirtyCtx = useModalDirty();
  useEffect(() => {
    if (!modalDirtyCtx) return;
    modalDirtyCtx.setIsDirty(!!formState.isDirty);
  }, [formState.isDirty, modalDirtyCtx]);

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
