"use client";

import React from "react";
import { Button, ErrorMessage, Field, Form, useFormFacade } from "@/src/shared/ui";
import { userFormConfig } from "../config/formConfig";
import { UserSimpleFormData } from "../model/types";

export function UserSimpleForm({ onSubmit }: { onSubmit: (data: UserSimpleFormData) => void }) {
  const formState = useFormFacade<UserSimpleFormData>({ ...userFormConfig, onSubmit });

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <Form formState={formState} className="mt-4">
        <div className="space-y-4">
          <div>
            <Field name="email" type="email" label="Email" placeholder="email" />
            <ErrorMessage name="email" />
          </div>

          <div>
            <Field name="address" type="text" label="Address" placeholder="address" />
            <ErrorMessage name="address" />
          </div>

          <div>
            <Field name="name" type="text" label="Name" placeholder="name" />
            <ErrorMessage name="name" />
          </div>

          <div>
            <Field name="password" type="password" label="Password" placeholder="password" />
            <ErrorMessage name="password" />
          </div>

          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
}
