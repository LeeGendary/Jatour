import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route } from "react-router";
// import Home from "./pages/HomePage/Home";
import Header from "./components/header/Header";

import "./custom.css";
import tripDetails from "./pages/TripDetails/tripDetails";
import settingPage from "./pages/SettingPage/settingPage";
import profilePage from "./pages/profilePage/profilePage";
import LeftBar from "./pages/LeftBar/LeftBar";
import Layout from "./pages/ContentLayout/Layout";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores/store";
import LoadingPage from "./pages/LoadingPage/Loding";
import SignInSide from "./components/Form/LoginForm";
import ModalContainer from "./components/Modals/ModalContainer";
import SnackBarContainer from "./components/snackbar/snackbarContainer";

export default observer(function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getuser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  const [mode, setMode] = useState<string | "light">("light");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  function handleThemeChange() {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

  if (!commonStore.apploaded)
    return (
      <LoadingPage loading={commonStore.apploaded} content="Loading app.." />
    );
  return (
    <>
      <ThemeProvider theme={theme}>
        <ModalContainer />
        <SnackBarContainer />
        <Route exact path="/" component={SignInSide} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Box sx={{ display: "flex" }}>
              <Header handleThemeChange={handleThemeChange} />
              <LeftBar />
              <Box component="main" sx={{ flexGrow: 1, mt: 10 }}>
                <Route exact path="/home" component={Layout} />
                <Route path="/details/:id" component={tripDetails} />
                <Route path="/profile" component={profilePage} />
                <Route path="/setting" component={settingPage} />
              </Box>
            </Box>
          )}
        />
      </ThemeProvider>
    </>
  );
});
