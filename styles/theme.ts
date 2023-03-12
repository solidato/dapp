import { Red_Hat_Display } from "@next/font/google";

import { createTheme, experimental_extendTheme as extendTheme, responsiveFontSizes } from "@mui/material/styles";

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

export const LightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
    },
    ...COMMON,
  }),
);

export const DarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
    },
    ...COMMON,
  }),
);

export const newTheme = extendTheme({
  colorSchemes: {
    light: {
      ...LightTheme,
    },
    dark: {
      ...DarkTheme,
    },
  },
});
