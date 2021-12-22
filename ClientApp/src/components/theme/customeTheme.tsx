import { createTheme } from "@mui/material";
import { useState } from "react";

const [mode, setMode] = useState<string | "light">("light");
export default const myTheme = createTheme({
  
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
  mybutton: {
    textDecoration: "none",
    background: "linear-gradient(to right, #ff5f6d, #ffc371);",
    border: 0,
    boxShadow: "0 3px 5px 2px #ff5f6cdd",
    color: "white !important",
    width: "100%",
  },
});
