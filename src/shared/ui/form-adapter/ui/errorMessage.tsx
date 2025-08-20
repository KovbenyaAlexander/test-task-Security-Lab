"use client";

import React from "react";
import { useFormContext } from "@/src/shared/ui/form-adapter/form-adapter";
import { cn } from "@/src/shared/lib/utils";

export function ErrorMessage({ name, className }: { name: string; className?: string }) {
  const formState = useFormContext();
  const error = formState.errors[name];

  if (!error) return null;

  return <span className={cn("text-red-500 text-sm", className)}>{error}</span>;
}
