import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/productReducer";

const UpdateContext = createContext();
const token = localStorage.getItem("sellerToken");

const API = "http://127.0.0.1:8000/api/get-product-seller/";

const UpdateProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const products = await res.data;

      dispatch({ type: "PRODUCTS", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const singleProduct = await res.data;

      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <UpdateContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </UpdateContext.Provider>
  );
};

const useUpdateContext = () => {
  return useContext(UpdateContext);
};

export { UpdateProvider, UpdateContext, useUpdateContext };
