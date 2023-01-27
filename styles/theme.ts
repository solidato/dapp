import { Red_Hat_Display } from "@next/font/google";
import { createTheme } from "@mui/material/styles";

export const redHatFont = Red_Hat_Display({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0500bf",
    },
  },
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
});
