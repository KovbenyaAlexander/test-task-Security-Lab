import { FormConfigType } from "@/src/shared/ui/form-adapter/model/types";
import { UserMultistepFormData } from "../model/types";
import { userSchema } from "../lib/userFormSchema";

export const userFormConfig: FormConfigType<UserMultistepFormData> = {
  initialValues: {
    email: "",
    name: "",
    address: "",
    password: "",
  },
  multiStepConfig: {
    totalSteps: 2,
    stepsFields: {
      1: ["email", "address"],
      2: ["name", "password"],
    },
  },
  validationSchema: userSchema,
};
