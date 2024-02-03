import PageNav from "../components/PageNav";
import ProductContainer from "../components/ProductContainer";

import { useFilterContext } from "../context/filterContext";

function Store() {
  const { filter_products } = useFilterContext();

  const {
    filters: { text },
    all_products,
    updateFilterValue,
  } = useFilterContext();
  const getUniqueData = (data, property) => {
    let newVal = data.map((curEl) => {
      return curEl[property];
    });

    return (newVal = [...new Set(newVal)]);
  };
  const getUniqueData2 = (data, property) => {
    let newVal = data.map((curEl) => {
      return curEl[property];
    });

    return (newVal = [...new Set(newVal)]);
  };
  const categoryOnlyData = getUniqueData(all_products, "category");
  const animalCategoryOnlyData = getUniqueData2(all_products, "animalCategory");

  return (
    <div className="grid grid-cols-5 gap-10 lg:gap-16">
      <div className="col-span-5">
        <PageNav />
      </div>

      <div className="col-span-2 flex items-center justify-center ">
        {/* <button className="mx-16 font-semibold text-md hover:text-gray-500 md:text-xl lg:text-2xl">
          Dog
        </button>
        <button className="font-semibold text-md hover:text-gray-500 md:text-xl lg:text-2xl">
          Cat
        </button> */}

        {animalCategoryOnlyData.map((curEl, index) => {
          return (
            <button
              key={index}
              type="button"
              name="animalCategory"
              value={curEl}
              onClick={updateFilterValue}
              className="mx-16 font-semibold text-md hover:text-gray-500 md:text-xl lg:text-2xl"
            >
              {curEl}
            </button>
          );
        })}
      </div>

      <div className="col-span-3 flex   md:flex-row items-center  justify-end lg:mr-16">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={updateFilterValue}
            className="border-2 border-black rounded-xl px-3 w-[12rem] "
            placeholder="Search..."
          ></input>
        </form>
      </div>
      <div className="col-span-1 h-screen flex flex-col items-center justify-start">
        <h1 className="text-md font-extrabold mb-5 md:text-lg lg:text-2xl">
          Categories
        </h1>
        <div className="flex flex-col gap-3 items-center">
          {/* <li className="text-sm hover:text-gray-500  md:text-md lg:text-xl">
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
          </li> */}

          {categoryOnlyData.map((curEl, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curEl}
                onClick={updateFilterValue}
              >
                {curEl}
              </button>
            );
          })}
        </div>
      </div>
      <div className="col-span-4 h-screen">
        <h1 className="text-center text-2xl font-bold mb-5">Products</h1>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {filter_products.map((products) => {
            return <ProductContainer products={products} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Store;
