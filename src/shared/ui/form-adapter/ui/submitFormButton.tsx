"use client";

import React from "react";
import { Button } from "@/src/shared/ui/button";

type Props = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function SubmitFormButton(props: Props) {
  const { children = "Submit", className, ...restProps } = props;

  return (
    <Button type="submit" className={className} {...restProps}>
      {children}
    </Button>
  );
}
