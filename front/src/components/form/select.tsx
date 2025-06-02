import { JSX } from "react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { MenuItem, Select as MuiSelect } from "@mui/material";
import { FieldWrapper, FieldWrapperProps } from "./field-wrapper";

export type SelectProps<T extends FieldValues> = {
  options: { label: string; value: number }[];
} & UseControllerProps<T> &
  Pick<FieldWrapperProps, "label">;

export const Select = <T extends FieldValues>({ label, options, ...props }: SelectProps<T>): JSX.Element => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController(props);

  return (
    <FieldWrapper label={label} errorMessage={error?.message}>
      <MuiSelect value={value ?? null} variant="outlined" onChange={onChange}>
        {options.map(({ label, value }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FieldWrapper>
  );
};
