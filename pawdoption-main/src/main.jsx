import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
// import LoginContextProvider from "./context/LoginContextProvider.jsx";
import { AppProvider } from "./context/ProductContext.jsx";
import { FilterContextProvider } from "./context/filterContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { UpdateProvider } from "./context/SellerUpdateContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <UpdateProvider>
        <FilterContextProvider>
          <CartProvider>
            {/* <LoginContextProvider> */}
            <ToastContainer />
            <App />
            {/* </LoginContextProvider> */}
          </CartProvider>
        </FilterContextProvider>
      </UpdateProvider>
    </AppProvider>
  </React.StrictMode>
);
