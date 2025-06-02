import { JSX } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { FieldWrapper, FieldWrapperProps } from "./field-wrapper";

export type TextAreaInputFormProps<T extends FieldValues> = UseControllerProps<T> & Pick<FieldWrapperProps, "label">;

export const TextAreaInputForm = <T extends FieldValues>({ label, ...props }: TextAreaInputFormProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <FieldWrapper label={label} errorMessage={error?.message}>
      <TextareaAutosize {...field} aria-label="minimum height" minRows={8} style={{ backgroundColor: "#FFFFFF" }} />
    </FieldWrapper>
  );
};
