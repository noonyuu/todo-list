import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    error: {
      main: "#F00000",
    },
    black: {
      main: "#000011",
    },
    white: {
      main: "#FFFFFF",
    },
    primary: {
      main: "#076EFF",
    },
  },
});

declare module "@mui/material/styles" {
  interface SimplePaletteColorOptions {
    extraDark?: string;
    extraLight?: string;
  }
  interface PaletteColor {
    extraDark: string;
    extraLight: string;
  }
  interface Palette {
    black: Palette["primary"];
    white: Palette["primary"];
  }
  interface PaletteOptions {
    black?: PaletteOptions["primary"];
    white?: PaletteOptions["primary"];
  }
}
