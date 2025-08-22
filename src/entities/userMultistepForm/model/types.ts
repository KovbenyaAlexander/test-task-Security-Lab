import z from "zod";
import { userSchema } from "../lib/userFormSchema";

export type UserMultistepFormData = z.infer<typeof userSchema>;
