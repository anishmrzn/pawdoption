import { Link } from "react-router-dom";

import { useCartContext } from "../context/cartContext";

function AddToCart({ product }) {
  const { productId, productName, productImg, price, stock } = product;
  const { addtToCart } = useCartContext();
  const token = localStorage.getItem("token");
  return (
    <div className="flex gap-6">
      {!token ? (
        <Link to="/login">
          <button className="bg-red-500 px-5 py-3 rounded-xl">
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
              productImg,
              price,

              stock,
              product
            )
          }
        >
          <button className="bg-red-500 px-5 py-3 rounded-xl">
            Add to cart
          </button>
        </Link>
      )}
    </div>
  );
}

export default AddToCart;
