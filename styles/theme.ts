import { Red_Hat_Display } from "@next/font/google";
import { createTheme } from "@mui/material/styles";

export const redHatFont = Red_Hat_Display({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const COMMON = {
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  typography: {
    fontFamily: redHatFont.style.fontFamily,
  },
};

export const LightTheme = createTheme({
  palette: {
    mode: "light",
  },
  ...COMMON,
});

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  ...COMMON,
});

export const getTheme = (mode: "dark" | "light") => (mode === "dark" ? DarkTheme : LightTheme);
