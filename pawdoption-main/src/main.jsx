import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import LoginContextProvider from "./context/LoginContextProvider.jsx";
import { AppProvider } from "./context/ProductContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <LoginContextProvider>
        <ToastContainer />
        <App />
      </LoginContextProvider>
    </AppProvider>
  </React.StrictMode>
);
