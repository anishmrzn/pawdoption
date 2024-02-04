const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { productId, productName, productImgUrl, price, stock, product } =
      action.payload;

    let existingProduct = state.cart.find(
      (curEl) => curEl.productId === productId
    );

    if (existingProduct) {
      return state;
    } else {
      let cartProduct;
      cartProduct = {
        productId,
        productName,
        price: product.price,
        productImgUrl,
        stock,
        discount: product.discount,
        amount: 1,
      };
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }
  if (action.type === "SET_DEC") {
    let updatedProduct = state.cart.map((curEl) => {
      if (curEl.productId === action.payload) {
        let decAmount = curEl.amount - 1;
        if (decAmount <= 1) {
          decAmount = 1;
        }
        return {
          ...curEl,
          amount: decAmount,
        };
      } else {
        return curEl;
      }
    });
    return { ...state, cart: updatedProduct };
  }
  if (action.type === "SET_INC") {
    let updatedProduct = state.cart.map((curEl) => {
      if (curEl.productId === action.payload) {
        let incAmount = curEl.amount + 1;
        if (incAmount >= curEl.stock) {
          incAmount = curEl.stock;
        }
        return {
          ...curEl,
          amount: incAmount,
        };
      } else {
        return curEl;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curEl) => curEl.productId !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "CLEAR_ITEM") {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === "CART_TOTAL_ITEM") {
    let updatedItemVal = state.cart.length;

    return {
      ...state,
      total_item: updatedItemVal,
    };
  }
  if (action.type === "TOTAL_PRICE") {
    let updatedPrice = state.cart.reduce((total, item) => {
      // const price = item.discount
      //   ? item.price - (item.price * item.discount) / 100
      //   : item.price;
      return total + item.amount * item.price;
    }, 0);

    return {
      ...state,
      total_amount: updatedPrice,
    };
  }
  return state;
};

export default cartReducer;
