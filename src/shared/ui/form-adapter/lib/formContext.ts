"use client";

import { createContext, useContext } from "react";
import { FieldValues } from "react-hook-form";
import { FormFacadeReturn } from "../model/types";

export const FormContext = createContext<FormFacadeReturn<FieldValues> | null>(null);

export function useFormContext<T extends FieldValues>(): FormFacadeReturn<T> {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Context error");
  }
  return context as FormFacadeReturn<T>;
}
