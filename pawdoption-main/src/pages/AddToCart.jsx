import { Link } from "react-router-dom";

import { useCartContext } from "../context/cartContext";

function AddToCart({ product }) {
  const { productId, productName, productImgUrl, price, stock } = product;
  const { addtToCart } = useCartContext();
  const userToken = localStorage.getItem("userToken");
  const sellerToken = localStorage.getItem("sellerToken");
  return (
    <div className="flex gap-6">
      {!(userToken || sellerToken) ? (
        <Link to="/login">
          <button className="bg-red-500 px-5 py-3 rounded-xl text-white font-bold">
            Add to cart
          </button>
        </Link>
      ) : (
        <Link
          to="/cart"
          onClick={() =>
            addtToCart(
              productId,
              productName,
              productImgUrl,
              price,

              stock,
              product
            )
          }
        >
          <button className="bg-[#4f8549] px-5 py-3 rounded-xl text-white font-bold">
            Add to cart
          </button>
        </Link>
      )}
    </div>
  );
}

export default AddToCart;
