import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

function ManageProducts() {
  const { products } = useProductContext();

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="font-extrabold text-2xl">
        Choose the product you want to update
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10  justify-between">
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
                  src={product.productImgUrl}
                  alt="item"
                />
                <div className="font-bold">{product.productName}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ManageProducts;
