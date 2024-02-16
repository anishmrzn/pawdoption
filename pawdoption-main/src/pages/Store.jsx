import React, { useState, useEffect } from "react";
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

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Set showScrollButton to true when user scrolls down, false when at the top
      setShowScrollButton(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      <div className="col-span-3 flex md:flex-row items-center justify-end lg:mr-16 ">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={updateFilterValue}
            className="border border-gray-300 p-3 rounded-xl w-64 ml-2 mr-10"
            placeholder="Search Products"
          />
        </form>
      </div>

      <div className="col-span-1 h-screen flex flex-col items-center justify-start">
        <h1 className="text-md font-extrabold mb-5 md:text-lg lg:text-2xl">
          Categories
        </h1>
        <div className="flex flex-col gap-3 items-center">
          {categoryOnlyData.map((curEl, index) => (
            <button
              key={index}
              type="button"
              name="category"
              value={curEl}
              onClick={updateFilterValue}
            >
              {curEl}
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-4 h-screen">
        <h1 className="text-center text-2xl font-bold mb-5">Products</h1>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {filter_products.map((products) => (
            <ProductContainer key={products.id} products={products} />
          ))}
        </div>
      </div>

      {showScrollButton && (
        <button
          className="fixed bottom-7 right-7 bg-blue-500 text-white text-2xl px-3 py-2 rounded-full"
          onClick={scrollToTop}
        >
          <ion-icon name="arrow-up-outline"></ion-icon>
        </button>
      )}
    </div>
  );
}

export default Store;
