import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    mode: "light",

    primary: { main: "#F8BF12", contrastText: "#ffffff" },
    primaryLight: { main: "#ffd042ff", contrastText: "#ffffff" },
    secondary: { main: "#252654", contrastText: "#ffffff" },
    error: { main: "#d32f2f" },

    success: { main: "#16A34A" },
    warning: { main: "#F59E0B" },
    info: { main: "#2F80ED" },

    background: {
      default: "#F9FBFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
      disabled: "#9CA3AF",
      hint: "#9CA3AF",
      inverse: "#FFFFFF",

      white100: "#FFFFFF",
      white90: "rgba(255, 255, 255, 0.9)",
      white80: "rgba(255, 255, 255, 0.8)",
      white70: "rgba(255, 255, 255, 0.7)",
      white60: "rgba(255, 255, 255, 0.6)",

      black100: "#000000",
      black90: "rgba(0, 0, 0, 0.9)",
      black80: "rgba(0, 0, 0, 0.8)",
      black70: "rgba(0, 0, 0, 0.7)",
      black60: "rgba(0, 0, 0, 0.6)",
      black50: "rgba(0, 0, 0, 0.5)",
      black40: "rgba(0, 0, 0, 0.4)",
      black30: "rgba(0, 0, 0, 0.3)",
    },

    brand: {
      main: "#008001",
      light: "#26A626",
      dark: "#005C00",
      contrastText: "#FFFFFF",
    },
    accent: {
      main: "#00B894",
      light: "#66D1C2",
      dark: "#008F74",
      contrastText: "#0B0F12",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    fontWeightRegular: 400,
    h1: { fontSize: "96px" },
    h2: { fontSize: "60px" },
    h3: { fontSize: "48px" },
    h4: { fontSize: "34px" },
    h5: { fontSize: "24px" },
    h6: { fontSize: "20px" },
    subtitle1: { fontSize: "16px" },
    subtitle2: { fontSize: "14px" },
    body1: { fontSize: "16px" },
    body2: { fontSize: "14px" },
    button: { fontSize: "14px" },
    caption: { fontSize: "12px" },
    overline: { fontSize: "10px" },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
