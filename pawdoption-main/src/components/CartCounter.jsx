function CartCounter({ amount, setDecrease, setIncrease }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button onClick={() => setDecrease()} className="text-xl font-extrabold">
        -
      </button>
      <p>{amount}</p>

      <button onClick={() => setIncrease()} className="text-xl font-extrabold">
        +
      </button>
    </div>
  );
}

export default CartCounter;
