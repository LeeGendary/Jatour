import { createTheme } from "@mui/material";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#ff4400",
      dark: "#132255",
    },
    secondary: {
      main: "#6787e0",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
    fontSize: 12,
  },
});
