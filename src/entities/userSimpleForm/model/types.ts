import z from "zod";
import { userSchema } from "../lib/userFormSchema";

export type UserSimpleFormData = z.infer<typeof userSchema>;
