import { Link } from "react-router-dom";

import { useCartContext } from "../context/cartContext";

function AddToCart({ product }) {
  const { productId, productName, productImg, price, stock } = product;
  const { addtToCart } = useCartContext();

  return (
    <div className="flex gap-6">
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
        <button className="bg-red-500 px-5 py-3 rounded-xl">Add to cart</button>
      </Link>
    </div>
  );
}

export default AddToCart;
