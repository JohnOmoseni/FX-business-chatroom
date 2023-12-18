import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "react-auth-kit";
import store from "../redux/store";
import "./index.css";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      > */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </AuthProvider> */}
    </Provider>
  </React.StrictMode>
);
