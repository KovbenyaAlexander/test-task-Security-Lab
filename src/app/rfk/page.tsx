"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(6, "Password should be more than 6 char"),
});

type FormData = z.infer<typeof formSchema>;

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <input {...register("email")} type="email" placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <br />
      <input {...register("password")} type="password" placeholder="Пароль" />
      {errors.password && <span>{errors.password.message}</span>}

      <br />
      <button type="submit">Send</button>
    </form>
  );
}
