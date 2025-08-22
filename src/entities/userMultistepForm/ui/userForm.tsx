"use client";

import React from "react";
import { Button, ErrorMessage, Field, Form, useFormFacade } from "@/src/shared/ui";
import { Step } from "@/src/shared/ui/form-adapter/ui/step";
import { MultistepPagination } from "@/src/shared/ui/form-adapter/ui/multistepPagination";
import { userFormConfig } from "../config/formConfig";
import { UserMultistepFormData } from "../model/types";

export function UserMultistepForm({
  onSubmit,
}: {
  onSubmit: (data: UserMultistepFormData) => void;
}) {
  const formState = useFormFacade<UserMultistepFormData>({ ...userFormConfig, onSubmit });

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <Form formState={formState} className="mt-4">
        <div className="space-y-4">
          <Step step={1}>
            <div>
              <Field name="email" type="email" label="Email" placeholder="email" />
              <ErrorMessage name="email" />
            </div>

            <div>
              <Field name="address" type="text" label="Address" placeholder="address" />
              <ErrorMessage name="address" />
            </div>
          </Step>

          <Step step={2}>
            <div>
              <Field name="name" type="text" label="Name" placeholder="name" />
              <ErrorMessage name="name" />
            </div>

            <div>
              <Field name="password" type="password" label="Password" placeholder="password" />
              <ErrorMessage name="password" />
            </div>
          </Step>

          <MultistepPagination
            nextStepBtn={(onClick, disabled) => (
              <Button onClick={onClick} type="button" disabled={disabled} key="next">
                Next
              </Button>
            )}
            prevStepBtn={(onClick, disabled) => (
              <Button onClick={onClick} type="button" disabled={disabled} key="prev">
                Prev
              </Button>
            )}
          />
        </div>
      </Form>
    </div>
  );
}
