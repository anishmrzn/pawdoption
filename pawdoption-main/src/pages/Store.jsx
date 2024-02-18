// Store.jsx
import React, { useState, useEffect } from "react";
import PageNav from "../components/PageNav";
import ProductContainer from "../components/ProductContainer";
import { useFilterContext } from "../context/filterContext";

function Store() {
  const { filter_products } = useFilterContext();
  const itemsPerPage = 12;

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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollButton(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filter_products.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="grid grid-cols-5 gap-10 lg:gap-16">
      <div className="col-span-5">
        <PageNav />
      </div>

      <div className="col-span-2 flex items-center justify-center ">
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

      <div className="col-span-4 h-screen ">
        <h1 className="text-center text-2xl font-bold mb-10">Products</h1>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts.map((products) => (
            <ProductContainer key={products.id} products={products} />
          ))}
        </div>
        <div className="flex justify-center mt-8 mb-10">
          <button
            className={`${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-800 hover:bg-blue-900"
            } text-white px-4 py-2 rounded-full mx-2 mb-10 transition-all duration-300`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`${
              currentPage === Math.ceil(filter_products.length / itemsPerPage)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-800 hover:bg-blue-900"
            } text-white px-4 py-2 rounded-full mx-2 mb-10  transition-all duration-300`}
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filter_products.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>

      {showScrollButton && (
        <button
          className="fixed bottom-7 right-7 bg-blue-800 text-white text-2xl px-3 py-2 rounded-full"
          onClick={scrollToTop}
        >
          <ion-icon name="arrow-up-outline"></ion-icon>
        </button>
      )}
    </div>
  );
}

export default Store;
