import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route } from "react-router";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header";

import CssBaseline from "@mui/material/CssBaseline";
import tripDetails from "./pages/TripDetails/tripDetails";
import settingPage from "./pages/SettingPage/settingPage";
import profilePage from "./pages/profilePage/profilePage";
import LeftBar from "./pages/LeftBar/LeftBar";
import Layout from "./pages/ContentLayout/Layout";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores/store";
import LoadingPage from "./pages/LoadingPage/Loding";
import ModalContainer from "./components/Modals/ModalContainer";
import LoginRegisterPage from "./pages/LoginRegisterPage/LoginRegisterPage";
import Home from "./pages/HomePage/Home";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "./errors/ServerError";

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
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ModalContainer />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="colored"
          hideProgressBar
        />
        <Route exact path="/" component={LoginRegisterPage} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Box sx={{ display: "flex" }}>
              <Header handleThemeChange={handleThemeChange} />
              <LeftBar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Route exact path="/home" component={Layout} />
                <Route path="/details/:id" component={tripDetails} />
                <Route path="/testing" component={Home} />
                <Route path="/profile" component={profilePage} />
                <Route path="/setting" component={settingPage} />
                <Route path="/server-error" component={ServerError} />
              </Box>
            </Box>
          )}
        />
      </ThemeProvider>
    </>
  );
});
