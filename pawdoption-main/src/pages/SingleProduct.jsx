import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useEffect } from "react";
import PageNav from "../components/PageNav";
const API = "http://127.0.0.1:8000/api/products/";

function SingleProduct() {
  const { singleProduct, getSingleProduct } = useProductContext();

  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(`${API}${id}/`);
  }, []);
  return (
    <div>
      <PageNav />
      <h1>{singleProduct.productName}</h1>
      <p>{singleProduct.Description}</p>
    </div>
  );
}

export default SingleProduct;
