import { FormFacadeReturn, FormConfig } from "../model/types";
import { useForm as useReactHookForm, FieldValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";

export function useFormFacade<T extends FieldValues>(config: FormConfig<T>): FormFacadeReturn<T> {
  const reactHookForm = useReactHookForm<T>({
    defaultValues: config.initialValues,
    resolver: zodResolver(config.validationSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    setError: rhfSetError,
    reset: rhfReset,
  } = reactHookForm;

  const handleSubmitWrapper = rhfHandleSubmit((data: T) => {
    config.onSubmit(data);
  });

  //{[inputName]: errorMessage}
  const formattedErrors = useMemo(() => {
    return Object.fromEntries(
      Object.entries(errors).map(([key, error]) => [key, (error?.message as string) || ""]),
    ) as Partial<Record<keyof T, string>>;
  }, [errors]);

  return {
    errors: formattedErrors,
    isSubmitting,
    isValid,
    handleSubmit: handleSubmitWrapper,
    setError: (field: keyof T, message: string) => {
      rhfSetError(field as Path<T>, { message });
    },
    reset: rhfReset,
    register,
    reactHookForm,
    isDirty,
  };
}
