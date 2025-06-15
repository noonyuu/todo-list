import { JSX } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { MenuItem, Select as MuiSelect, Box, Chip } from "@mui/material";
import { FieldWrapper, FieldWrapperProps } from "./field-wrapper";

export type SelectProps<T extends FieldValues> = {
  options: { label: string; value: string }[];
  multiple?: boolean;
  renderValue?: (value: string | string[]) => React.ReactNode;
} & UseControllerProps<T> &
  Pick<FieldWrapperProps, "label">;

export const Select = <T extends FieldValues>({ label, options, multiple = false, renderValue, ...props }: SelectProps<T>): JSX.Element => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController(props);

  const defaultRenderValue = (selected: string | string[]) => {
    if (multiple && Array.isArray(selected)) {
      return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((val) => {
            const option = options.find((opt) => opt.value === String(val));
            return <Chip key={val} label={option?.label || val} />;
          })}
        </Box>
      );
    } else {
      const option = options.find((opt) => opt.value === String(selected));
      return option?.label || selected;
    }
  };

  const selectValue = multiple ? (Array.isArray(value) ? value : []) : value ?? "";

  return (
    <FieldWrapper label={label} errorMessage={error?.message}>
      <MuiSelect value={selectValue} variant="outlined" onChange={onChange} multiple={multiple} renderValue={renderValue || defaultRenderValue}>
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FieldWrapper>
  );
};
