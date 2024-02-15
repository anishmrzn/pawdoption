import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import ProductContainer from "./ProductContainer";

function FeaturedItems({}) {
  const { featureProducts } = useProductContext();

  return (
    <div className="flex flex-col items-center gap-10 " data-aos="fade-right">
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-10">
        {featureProducts.map((products) => {
          return (
            <ProductContainer products={products} key={products.productId} />
          );
        })}
      </div>
      <Link to="/store">
        <button className="font-semibold text-[#c9a687] hover:underline hover:after:content-['->'] transition-all duration-500">
          View More
        </button>
      </Link>
    </div>
  );
}

export default FeaturedItems;
