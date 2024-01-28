import { useProductContext } from "../context/ProductContext";
import ProductContainer from "./ProductContainer";

function FeaturedItems() {
  const { featureProducts } = useProductContext();
  return (
    <div className="flex flex-col items-center gap-10 ">
      <h1 className="text-[#c9a687] font-bold">Featured Items</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
        {featureProducts.map((products) => {
          return <ProductContainer products={products} />;
        })}
      </div>
      <button className="font-semibold text-[#c9a687] hover:underline after:content-[&rarr;] transition-all duration-500">
        View More
      </button>
    </div>
  );
}

export default FeaturedItems;
