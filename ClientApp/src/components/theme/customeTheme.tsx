import { createTheme } from "@mui/material";
import { useState } from "react";

const mode = "light";
export default createTheme({
  palette: {
    common: {},
    mode: mode,
    primary: {
      main: "#ff4400",
      dark: "#132255",
    },
    secondary: {
      main: "#ff5f6cdd",
    },
  },
  typography: {
    h2: {
      fontFamily: "Roboto, Arial",
      fontSize: 12,
    },
  },
});

// mybutton: {
//   textDecoration: "none",
//   background: "linear-gradient(to right, #ff5f6d, #ffc371);",
//   border: 0,
//   boxShadow: "0 3px 5px 2px #ff5f6cdd",
//   color: "white !important",
//   width: "100%",
// },
