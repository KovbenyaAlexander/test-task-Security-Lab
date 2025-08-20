"use client";

import { Input } from "@/src/shared/ui";
import React from "react";
import { useFormContext } from "@/src/shared/ui/form-adapter/form-adapter";

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  [key: string]: any;
};

export function Field(props: Props) {
  const formState = useFormContext();

  const { name, type = "text", placeholder, label, className, ...restProps } = props;

  const input = (
    <Input
      id={name}
      type={type}
      placeholder={placeholder}
      className={className}
      {...formState.register(name as any)}
      {...restProps}
    />
  );

  return label ? (
    <>
      <label htmlFor={name}>{label}</label>
      {input}
    </>
  ) : (
    input
  );
}
