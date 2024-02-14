import PageNav from "../components/PageNav";
import { useCartContext } from "../context/cartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

function Cart() {
  const { cart, clearCart, total_amount } = useCartContext();
  const checkoutItems = cart.map((item) => ({
    productId: item.productId,
    quantity: item.amount,
  }));
  console.log(checkoutItems);

  const handleCheckout = async () => {
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-checkout-session/",
        {
          products: checkoutItems,
        }
      );

      // Extract the checkout URL from the response data
      const checkoutUrl = response.data.url;

      // Redirect the user to the Stripe checkout page
      window.location.href = checkoutUrl;
      if ((response.data.success = true)) {
      }
    } catch (error) {
      // Handle errors from the backend
      toast.error("Unsuccessfull");
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <PageNav />
        <h1 className="container flex items-center justify-center mt-[10rem]">
          No Items in Cart
        </h1>
        ;
      </>
    );
  }
  return (
    <div>
      <PageNav />
      <div className="container mt-20">
        <div className="grid grid-cols-5 gap-10 justify-items-center ">
          <p>Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>SubTotal</p>
          <p>Remove</p>
        </div>
        <hr className="mt-5"></hr>
        <div>
          {cart.map((curEl) => {
            return <CartItem key={curEl.productId} {...curEl} />;
          })}
        </div>
      </div>

      <div className="container flex justify-between">
        <Link to="/store">
          <button className="button">Continue Shopping</button>
        </Link>
        <button className="button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
      <div className="flex flex-col gap-3 justify-end items-end mr-20 mt-10">
        <div className="flex gap-3 justify-end">
          <p className="text-xl font-extrabold">Total Price :</p>
          <p className="text-xl font-extrabold">Rs {total_amount.toFixed(2)}</p>
        </div>
        <button onClick={handleCheckout} className="button flex justify-end">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
