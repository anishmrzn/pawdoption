import { NavLink } from "react-router-dom";

function ProductContainer({ products }) {
  console.log(products);
  return (
    <NavLink to={`/singleproducts/${products.id}`}>
      <div className="border-2 rounded-xl overflow-hidden flex flex-col gap-5 cursor-pointer hover:shadow-2xl">
        <img
          src={products.productImg}
          alt="Items"
          className="w-[20rem] transform hover:scale-110 transition-all duration-500 "
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-center font-bold">{products.productName}</h3>
          <div className="flex gap-5 ml-3">
            <span>
              Rs.{products.price - products.price * (products.discount / 100)}
            </span>
            <span className="line-through text-gray-500">
              Rs.{products.price}
            </span>
          </div>
          <p className="text-center">{products.shortDescription}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default ProductContainer;
