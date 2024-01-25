import ProductContainer from "./ProductContainer";

function FeaturedItems() {
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-[#c9a687] font-bold">Featured Items</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <ProductContainer />
        <ProductContainer />
        <ProductContainer />
        <ProductContainer />
      </div>
    </div>
  );
}

export default FeaturedItems;
