import { Link } from "react-router-dom";

function ProductContainer({ products }) {
  return (
    <Link to={`/singleproduct/${products.productId}`}>
      <div className="border-2 rounded-xl overflow-hidden flex flex-col gap-5 cursor-pointer hover:shadow-2xl w-[15rem] h-[25rem]">
        <div className="justify-center align-center flex w-full">
          <img
            src={products.productImgUrl}
            alt="Items"
            className="w-full h-[15rem] transform hover:scale-110 transition-all duration-500 "
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-center font-bold">{products.productName}</h3>
          <div className="flex gap-5 ml-3">
            <span>
              Rs.
              {(
                products.price -
                products.price * (products.discount / 100)
              ).toFixed(2)}
            </span>
            <span className="line-through text-gray-500">
              Rs.{products.price}
            </span>
          </div>
          <p className="text-center">{products.shortDescription}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductContainer;
