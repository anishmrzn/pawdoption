import { Link, useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useEffect } from "react";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import FeaturedItems from "../components/FeaturedItems";
import AddToCart from "./AddToCart";

const API = "http://127.0.0.1:8000/api/products/";

function SingleProduct() {
  const { singleProduct, getSingleProduct } = useProductContext();
  const { id } = useParams();

  useEffect(() => {
    getSingleProduct(`${API}${id}/`);
  }, [singleProduct]);

  return (
    <div className="flex flex-col gap-20 md:gap-[5rem]">
      <PageNav />
      <div className="flex flex-col md:flex-row gap-16 lg:gap-16 mx-auto">
        <img
          src={singleProduct.productImgUrl}
          alt="product"
          className="w-[30rem] h-[20rem] lg:h-[30rem] object-cover rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-500"
        />

        <div className="flex flex-col gap-6 lg:mt-[5rem] text-center lg:items-start">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800">
            {singleProduct.productName}
          </h1>
          <div className="flex items-center lg:items-start gap-5 justify-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-[#f67d00] font-extrabold">
                ★★★★☆
              </span>
              <span className="text-sm text-gray-600">42 Reviews</span>
            </div>
          </div>
          <div className="flex items-center gap-5 justify-center">
            <h1 className="text-2xl font-extrabold text-green-600">
              <span className="mr-2">Rs.</span>
              {(
                singleProduct.price -
                singleProduct.price * (singleProduct.discount / 100)
              ).toFixed(2)}
            </h1>
            <div className="flex items-center gap-3 px-4 py-2 bg-[#1cadd9] rounded-md">
              <span className="text-white font-bold">
                {singleProduct.discount}% off
              </span>
              <span className="text-lg text-white line-through pl-2">
                Rs. {singleProduct.price}
              </span>
            </div>
          </div>
          <p className="text-lg text-gray-700 w-[25rem] leading-relaxed">
            {singleProduct.Description}
          </p>
          <div className="flex items-center gap-5 justify-center">
            <AddToCart product={singleProduct} />
          </div>
          <div className="flex items-center gap-3 text-gray-700 justify-center">
            <span>
              Availability:
              {singleProduct.stock === 0 ? "Not Available" : "In Stock"}
            </span>
            <span>Estimated Delivery: 3-5 days</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 justify-center">
            <span>Seller: {singleProduct.seller}</span>
            <span>Seller: {singleProduct.contact}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <h1 className="text-[#c9a687] font-bold text-center text-2xl">
          Other Products
        </h1>
        <div>
          <FeaturedItems />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SingleProduct;
