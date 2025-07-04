import { JSX } from "react";
import TextField from "@mui/material/TextField";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { FieldWrapper, FieldWrapperProps } from "./field-wrapper";

export type InputFormProps<T extends FieldValues> = {
  type?: string;
} & UseControllerProps<T> &
  Pick<FieldWrapperProps, "label">;

export const TextInputForm = <T extends FieldValues>({ label, type, ...props }: InputFormProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <FieldWrapper label={label} errorMessage={error?.message}>
      <TextField {...field} value={field.value ?? ""} fullWidth variant="outlined" type={type} />
    </FieldWrapper>
  );
};
