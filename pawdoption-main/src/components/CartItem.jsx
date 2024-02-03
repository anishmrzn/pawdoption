import { useState } from "react";
import { useCartContext } from "../context/cartContext";
import CartCounter from "./CartCounter";

function CartItem({
  productId,
  productName,
  productImg,
  stock,
  amount,
  price,
}) {
  const { removeItem, setIncrease, setDecrease } = useCartContext();
  // const [amount, setAmount] = useState(1);
  // const setDecrease = () => {
  //   amount > 1 ? setAmount(amount - 1) : setAmount(1);
  // };
  // const setIncrease = () => {
  //   amount < stock ? setAmount(amount + 1) : setAmount(stock);
  // };

  return (
    <>
      <div className="grid grid-cols-5 gap-10 justify-items-center mt-5">
        <div className="flex items-center justify-center gap-5">
          <img
            src={"http://127.0.0.1:8000" + productImg}
            alt="product"
            className="w-20"
          />
          <p>{productName}</p>
        </div>

        <div className="flex items-center justify-center">Rs {price}</div>
        <CartCounter
          amount={amount}
          setDecrease={() => setDecrease(productId)}
          setIncrease={() => setIncrease(productId)}
        />
        <div className="flex items-center justify-center">
          Rs {price * amount}
        </div>
        <button
          className="flex items-center justify-center text-red-700 text-xl"
          onClick={() => removeItem(productId)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </>
  );
}

export default CartItem;
