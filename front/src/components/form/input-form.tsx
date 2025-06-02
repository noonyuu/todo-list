import { JSX } from "react";
import TextField from "@mui/material/TextField";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { FieldWrapper, FieldWrapperProps } from "./field-wrapper";

export type InputFormProps<T extends FieldValues> = UseControllerProps<T> & Pick<FieldWrapperProps, "label">;

export const TextInputForm = <T extends FieldValues>({ label, ...props }: InputFormProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <FieldWrapper label={label} errorMessage={error?.message}>
      <TextField {...field} fullWidth variant="outlined" />
    </FieldWrapper>
  );
};
