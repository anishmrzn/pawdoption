import { useCartContext } from "../context/cartContext";
import CartCounter from "./CartCounter";

function CartItem({
  productId,
  productName,
  productImgUrl,
  amount,
  price,
  discount,
}) {
  const { removeItem, setIncrease, setDecrease } = useCartContext();

  return (
    <>
      <div className="grid grid-cols-5 gap-10 justify-items-center mt-5">
        <div className="flex items-center justify-center gap-5">
          <img src={productImgUrl} alt="product" className="w-20" />
          <p>{productName}</p>
        </div>

        <div className="flex items-center justify-center">
          Rs. {(price - (price * discount) / 100).toFixed(2)}
        </div>
        <CartCounter
          amount={amount}
          setDecrease={() => setDecrease(productId)}
          setIncrease={() => setIncrease(productId)}
        />
        <div className="flex items-center justify-center">
          Rs. {((price - (price * discount) / 100) * amount).toFixed(2)}
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
