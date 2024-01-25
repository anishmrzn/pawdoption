function ProductContainer() {
  return (
    <div className="border-2 rounded-xl overflow-hidden flex flex-col gap-5 cursor-pointer hover:shadow-2xl">
      <img
        src="/product.jpg"
        alt="Items"
        className="transform hover:scale-110 transition-all duration-500 "
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-center font-bold">Product Title</h3>
        <div className="flex gap-5 ml-3">
          <span>$100</span>
          <span className="line-through text-gray-500">$150</span>
        </div>
        <p className="text-center">Small description</p>
      </div>
    </div>
  );
}

export default ProductContainer;
