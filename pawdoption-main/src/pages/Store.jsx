import PageNav from "../components/PageNav";
import ProductContainer from "../components/ProductContainer";
import { useProductContext } from "../context/ProductContext";

function Store() {
  const { products } = useProductContext();
  return (
    <div className="grid grid-cols-5 gap-10 lg:gap-16">
      <div className="col-span-5">
        <PageNav />
      </div>

      <div className="col-span-2 flex items-center justify-center ">
        <button className="mx-16 font-semibold text-md hover:text-gray-500 md:text-xl lg:text-2xl">
          Dog
        </button>
        <button className="font-semibold text-md hover:text-gray-500 md:text-xl lg:text-2xl">
          Cat
        </button>
      </div>

      <div className="col-span-3 flex   md:flex-row items-center  justify-end lg:mr-16">
        <input
          type="text"
          name="search"
          className="border-2 border-black rounded-xl px-3 w-[12rem] "
          placeholder="Search..."
        ></input>
      </div>
      <div className="col-span-1 h-screen flex flex-col items-center justify-start">
        <h1 className="text-md font-extrabold mb-5 md:text-lg lg:text-2xl">
          Categories
        </h1>
        <ul className="flex flex-col gap-3 items-center">
          <li className="text-sm hover:text-gray-500  md:text-md lg:text-xl">
            All
          </li>
          <li className="text-sm hover:text-gray-500  md:text-md lg:text-xl">
            Accessories
          </li>
          <li className="text-sm hover:text-gray-500  md:text-md lg:text-xl ">
            Pet Food
          </li>
          <li className="text-sm hover:text-gray-500  md:text-md lg:text-xl">
            Grooming
          </li>
        </ul>
      </div>
      <div className="col-span-4 h-screen">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((products) => {
            return <ProductContainer products={products} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Store;
