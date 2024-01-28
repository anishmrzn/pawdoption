import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

function ManageProducts() {
  const { products } = useProductContext();

  return (
    <>
      <div className="flex gap-10 flex-wrap justify-between">
        {products?.map((product) => {
          // return <FeatureProducts product={product} key={product._id} />;
          return (
            <Link
              key={product.productId}
              to={`/seller/update/${product.productId}`}
            >
              <div className="flex  flex-col gap-4 border p-4 rounded-3xl shadow-md">
                <img
                  className="w-52 h-60 object-cover rounded-3xl"
                  src={product.productImg}
                  alt="item"
                />
                <div className="font-bold">{product.productName}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default ManageProducts;
