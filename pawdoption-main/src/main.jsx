import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
// import LoginContextProvider from "./context/LoginContextProvider.jsx";
import { AppProvider } from "./context/ProductContext.jsx";
import { FilterContextProvider } from "./context/filterContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <FilterContextProvider>
        {/* <LoginContextProvider> */}
        <ToastContainer />
        <App />
        {/* </LoginContextProvider> */}
      </FilterContextProvider>
    </AppProvider>
  </React.StrictMode>
);
