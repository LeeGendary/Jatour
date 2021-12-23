import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { store, StoreContext } from "./stores/store";
import { createBrowserHistory } from "history";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");
export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history} basename={baseUrl}>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </Router>,
  rootElement
);

registerServiceWorker();
