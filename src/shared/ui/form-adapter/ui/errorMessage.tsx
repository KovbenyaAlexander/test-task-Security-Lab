"use client";

import React from "react";
import { useFormContext, useFormState } from "react-hook-form";

type Props = { name: string; className?: string };

export function ErrorMessage({ name, className }: Props) {
  const reactHookForm = useFormContext();
  const { errors } = useFormState({ control: reactHookForm.control, name });

  const err = errors?.[name as keyof typeof errors];
  const message = typeof err?.message === "string" ? err.message : "";

  if (!message) return null;
  return <div className={className ?? "text-red-600 text-sm mt-1"}>{message}</div>;
}
