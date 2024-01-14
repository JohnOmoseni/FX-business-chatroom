import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthContextProvider } from "@context/AuthContext";
import store from "../redux/store";

import ReactModal from "react-modal";
import "./index.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactModal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthContextProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            className="font-poppins tracking-wide"
            theme="dark"
          />
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
