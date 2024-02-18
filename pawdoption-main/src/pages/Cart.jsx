// Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import PageNav from "../components/PageNav";
import CartItem from "../components/CartItem";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";

const Cart = () => {
  const { cart, clearCart, total_amount } = useCartContext();
  const { user } = useUserContext();
  const checkoutItems = cart.map((item) => ({
    productId: item.productId,
    quantity: item.amount,
  }));

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-checkout-session/",
        {
          products: checkoutItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const checkoutUrl = response.data.url;

      window.location.href = checkoutUrl;
      if ((response.data.success = true)) {
        localStorage.removeItem("pawcart");
      }
    } catch (error) {
      toast.error("Unsuccessful");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <PageNav />
      <div className="container mx-auto my-12 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Shopping Cart
        </h1>
        <div className="grid grid-cols-5 gap-8 justify-items-center text-lg font-semibold text-gray-700">
          <p>Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
          <p>Remove</p>
        </div>
        <hr className="my-6 border-t border-gray-300" />
        <div>
          {cart.map((curEl) => (
            <CartItem key={curEl.productId} {...curEl} />
          ))}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="container mx-auto flex justify-between items-center mt-8 space-x-4">
          <Link to="/store">
            <button className="button bg-gray-500 hover:bg-gray-600 transform transition-all duration-300">
              Continue Shopping
            </button>
          </Link>
          <button
            className="button bg-red-500 hover:bg-red-600 transform transition-all duration-300"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      )}

      {cart.length > 0 && (
        <div className="container mx-auto flex flex-col gap-4 items-end mt-8">
          <div className="bg-gray-200 p-6 rounded-md shadow-md w-[16rem]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Items in Cart:</h3>
              <ul className="list-disc list-inside">
                {cart.map((item) => (
                  <li key={item.productId}>
                    {item.productName} x {item.amount}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Shipping Details:</h3>
              <p>Address: {user.address}</p>
              <p>Contact: {user.contact}</p>
            </div>
            <div className="flex items-center justify-between text-xl font-extrabold text-gray-800">
              <p>Total Price:</p>
              <p className="ml-2">Rs {total_amount.toFixed(2)}</p>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="button bg-green-500 hover:bg-green-600 transform transition-all duration-300 mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
