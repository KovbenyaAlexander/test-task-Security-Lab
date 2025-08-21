"use client";

import React from "react";
import { Button, ErrorMessage, Field, Form, useFormFacade } from "@/src/shared/ui";
import { z } from "zod";
import { Step } from "@/src/shared/ui/form-adapter/ui/step";
import { MultistepPagination } from "@/src/shared/ui/form-adapter/ui/multistepPagination";

const userSchema = z.object({
  email: z.string().email("Enter valid email"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type UserFormData = z.infer<typeof userSchema>;

export default function Page() {
  const formState = useFormFacade<UserFormData>({
    initialValues: {
      email: "",
      name: "",
    },
    multiStep: {
      totalSteps: 2,
      currentStep: 1,
    },
    validationSchema: userSchema,
    onSubmit: (data) => {
      console.log("form data", data);
      alert(JSON.stringify(data));
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-4xl">Create a new user</h2>

      <Form formState={formState} className="mt-4">
        <div className="space-y-4">
          <Step step={1}>
            <div>
              <Field name="email" type="email" label="Email" placeholder="email" />
              <ErrorMessage name="email" />
            </div>
          </Step>

          <Step step={2}>
            <div>
              <Field name="name" type="text" label="Name" placeholder="name" />
              <ErrorMessage name="name" />
            </div>
          </Step>

          <MultistepPagination
            nextStepBtn={(onClick, disabled) => (
              <Button onClick={onClick} type="button" disabled={disabled}>
                Next
              </Button>
            )}
          />
        </div>
      </Form>
    </div>
  );
}
