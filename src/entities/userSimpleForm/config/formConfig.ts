import { FormConfigType } from "@/src/shared/ui/form-adapter/model/types";
import { UserSimpleFormData } from "../model/types";
import { userSchema } from "../lib/userFormSchema";

export const userFormConfig: FormConfigType<UserSimpleFormData> = {
  initialValues: {
    email: "",
    name: "",
    address: "",
    password: "",
  },
  validationSchema: userSchema,
};
