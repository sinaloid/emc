import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";


import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./services/context";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <AppContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </AppContextProvider>
);
