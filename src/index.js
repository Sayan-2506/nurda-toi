import React, { createContext } from "react";
import { createRoot } from "react-dom/client";
import Store from "./store/store";

import App from "./App";
import "./index.css";

const store = new Store();

export const Context = createContext({
  store,
});

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        store,
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
