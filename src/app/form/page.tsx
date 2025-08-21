"use client";

import React from "react";
import { ErrorMessage, Field, Form, SubmitFormButton, useFormFacade } from "@/src/shared/ui";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type UserFormData = z.infer<typeof userSchema>;

export default function Page() {
  const formState = useFormFacade<UserFormData>({
    initialValues: {
      email: "qwe@qwe.qwe",
      password: "",
      name: "",
    },
    validationSchema: userSchema,
    onSubmit: (data) => {
      console.log("form fata", data);
      alert(JSON.stringify(data));
    },
  });

  return (
    <div className={"max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md"}>
      <h2 className="text-4xl">CREATE A NEW USER</h2>

      <Form formState={formState} className={"mt-4"}>
        <div className="space-y-4">
          <div>
            <Field name="name" type="text" label="name" placeholder={"name"} />
            <ErrorMessage name="name" />
          </div>

          <div>
            <Field name="email" type="email" label="Email" placeholder={"email"} />
            <ErrorMessage name="email" />
          </div>

          <div>
            <Field name="password" type="password" label="passw" placeholder={"passw"} />
            <ErrorMessage name="password" />
          </div>

          <SubmitFormButton className="w-full bg-blue-700 text-white py-2  rounded-md hover:bg-blue-600 cursor-pointer">
            SUBMIT
          </SubmitFormButton>
        </div>
      </Form>
    </div>
  );
}
