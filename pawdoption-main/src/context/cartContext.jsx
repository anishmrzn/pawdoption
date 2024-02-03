import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let newCartData = localStorage.getItem("pawcart");
  if (newCartData == []) {
    return [];
  } else {
    return JSON.parse(newCartData);
  }
};
const initialState = {
  cart: getLocalCartData() || [],
  total_item: 0,
  total_amount: "",
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addtToCart = (
    productId,
    productName,
    productImg,
    price,
    stock,

    product
  ) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productId,
        productName,
        productImg,
        price,
        stock,

        product,
      },
    });
  };
  const setDecrease = (productId) => {
    dispatch({ type: "SET_DEC", payload: productId });
  };
  const setIncrease = (productId) => {
    dispatch({ type: "SET_INC", payload: productId });
  };

  const removeItem = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_ITEM" });
  };
  useEffect(() => {
    dispatch({ type: "CART_TOTAL_ITEM" });
    dispatch({ type: "TOTAL_PRICE" });
    localStorage.setItem("pawcart", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addtToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
const useCartContext = () => {
  return useContext(CartContext);
};
export { CartProvider, useCartContext };
