"use client";

import React, { useEffect } from "react";
import { FieldValues, FormProvider } from "react-hook-form";

import { useModalContext } from "@/src/shared/ui/modal/lib/modalContext";
import { FormFacadeReturn } from "../model/types";
import { FormContext } from "../lib/formContext";

export function Form<T extends FieldValues>(props: {
  children: React.ReactNode;
  formState: FormFacadeReturn<T>;
  className?: string;
}) {
  const { children, formState, className } = props;

  const modalContext = useModalContext();

  useEffect(() => {
    if (!modalContext) return;
    modalContext.setIsDirty(!!formState.isDirty);
  }, [formState.isDirty, modalContext]);

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
