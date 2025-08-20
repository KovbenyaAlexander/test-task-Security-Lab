"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const formSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(6, "Password should be more than 6 char"),
});

type FormData = z.infer<typeof formSchema>;

export default function MyForm() {
  const initialValues: FormData = {
    email: "",
    password: "",
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(formSchema)}
      onSubmit={onSubmit}
    >
      <Form noValidate>
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" component="span" />
        <br />

        <Field name="password" type="password" placeholder="Пароль" />
        <ErrorMessage name="password" component="span" />
        <br />

        <button type="submit">Send</button>
      </Form>
    </Formik>
  );
}
