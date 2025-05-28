"use client";

import { useMemo } from "react";
import MuiButton from "@mui/material/Button";
import { theme } from "@/styles";

type ButtonProps = {
  variant?: "contained" | "outlined";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: string;
};

export const Button: React.FC<ButtonProps> = ({ variant = "contained", onClick, children }) => {
  const variantStyle = useMemo(() => (variant === "contained" ? style.contained : style.outlined), [variant]);

  return (
    <MuiButton variant={variant} onClick={onClick} sx={{ ...style.button, ...variantStyle }}>
      {children}
    </MuiButton>
  );
};

const style = {
  button: {
    px: "36px",
    py: "8px",
    fontWeight: "bold",
    "&:hover": {
      boxShadow: "none",
    },
  },
  contained: {
    backgroundColor: theme.palette.black.main,
    color: theme.palette.white.main,
  },
  outlined: {
    backgroundColor: theme.palette.white.main,
    borderColor: theme.palette.black.main,
    color: theme.palette.black.main,
  },
};
