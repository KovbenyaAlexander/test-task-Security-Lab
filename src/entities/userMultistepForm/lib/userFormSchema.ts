import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Enter valid email"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(2, "Address must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
