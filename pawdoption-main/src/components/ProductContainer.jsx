import { Link } from "react-router-dom";

function ProductContainer({ products }) {
  return (
    <Link to={`/singleproduct/${products.productId}`}>
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 bg-white">
        <div className="relative overflow-hidden h-48">
          <img
            src={products.productImgUrl}
            alt={products.productName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 hover:opacity-100">
            <p className="text-white font-bold text-lg">View Details</p>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            {products.productName}
          </h3>
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2">
              <span className="text-green-600 font-bold">
                $
                {(
                  products.price -
                  products.price * (products.discount / 100)
                ).toFixed(2)}
              </span>
              <span className="line-through text-gray-500">
                $.{products.price}
              </span>
            </div>
          </div>
          <p className="text-gray-600">{products.shortDescription}</p>
          <div className="mt-4 flex justify-between items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductContainer;
