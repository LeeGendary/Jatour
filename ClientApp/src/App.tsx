import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route } from "react-router";
import Home from "./pages/HomePage/Home";
import Header from "./components/header/Header";

import "./custom.css";
import tripDetails from "./pages/TripDetails/tripDetails";
import settingPage from "./pages/SettingPage/settingPage";
import profilePage from "./pages/profilePage/profilePage";

export default function App() {
  const [mode, setMode] = useState<string | "light">("light");

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  function handleThemeChange() {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

  return (
    <ThemeProvider theme={theme}>
      <Header handleThemeChange={handleThemeChange} />
      <Route exact path="/" component={Home} />
      <Route path="/details/:id" component={tripDetails} />
      <Route path="/profile" component={profilePage} />
      <Route path="/setting" component={settingPage} />
    </ThemeProvider>
  );
}
