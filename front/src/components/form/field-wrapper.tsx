import { FormControl, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export type FieldWrapperProps = PropsWithChildren<{
  label: string;
  errorMessage?: string;
}>;

export const FieldWrapper: React.FC<FieldWrapperProps> = ({ label, errorMessage, children }) => {
  return (
    <FormControl fullWidth sx={{ mb: 2.5 }} error={!!errorMessage}>
      <Typography sx={style.label}>{label}</Typography>
      {children}
      {errorMessage && (
        <Typography sx={style.error} color="error">
          {errorMessage}
        </Typography>
      )}
    </FormControl>
  );
};

const style = {
  label: {
    textAlign: "left",
    mb: 0.5,
    display: "block",
    fontWeight: 500,
  },
  error: {
    mt: "4px",
    fontSize: "0.75rem",
  },
};
