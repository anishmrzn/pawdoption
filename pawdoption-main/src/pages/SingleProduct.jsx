import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useEffect } from "react";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import FeaturedItems from "../components/FeaturedItems";
const API = "http://127.0.0.1:8000/api/products/";

function SingleProduct() {
  const { singleProduct, getSingleProduct } = useProductContext();

  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(`${API}${id}/`);
  }, []);
  return (
    <div className="flex flex-col gap-20 md:gap-[10rem]">
      <PageNav />
      <div className="flex flex-col md:flex-row gap-16 lg:gap-[10rem]">
        <div className="flex flex-col items-center ml-[8rem] md:ml-[0] w-[20rem] md:w-[40rem] border-2 px-5 py-5 rounded-xl">
          <img
            src="/product.jpg"
            alt="product"
            className="w-[18rem] md:w-[45rem] rounded-xl transform hover:scale-105 transition-all duration-500"
          ></img>
        </div>
        <div className="flex flex-col gap-6 lg:mt-[5rem]">
          <h1 className="text-2xl lg:text-3xl font-extrabold">
            {singleProduct.productName}
          </h1>
          <div className="flex gap-10 items-center ">
            <h1 className="text-xl font-extrabold">
              Rs.
              {(
                singleProduct.price -
                singleProduct.price * (singleProduct.discount / 100)
              ).toFixed(2)}
            </h1>
            <div className=" flex items-center gap-3 px-5  py-2 bg-green-500 rounded-xl">
              <h1 className="text-white font-bold">
                {singleProduct.discount}% off
              </h1>
              <h1 className="text-lg text-white line-through border-l-2 pl-3">
                Rs {singleProduct.price}
              </h1>
            </div>
          </div>
          <p className="text-lg">{singleProduct.Description}</p>
          <div className="flex gap-16">
            <input
              type="number"
              className="w-[3rem] text-center ml-[3rem] border-black border-2 rounded-md"
            ></input>
            <button className="bg-red-500 px-5 py-3 rounded-xl">
              ADD TO CART
            </button>
          </div>
          <h1>Category : {singleProduct.category}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <h1 className="text-[#c9a687] font-bold text-center">Other Products</h1>
        <FeaturedItems />
      </div>
      <Footer />
    </div>
  );
}

export default SingleProduct;
