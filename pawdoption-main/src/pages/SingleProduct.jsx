import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useEffect } from "react";
const API = "http://127.0.0.1:8000/api/single-product";
function SingleProduct() {
  const { singleProduct, getSingleProduct } = useProductContext();

  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(`http://127.0.0.1:8000/api/single-product/${id}`);
  }, []);
  return (
    <div>
      <h1>{singleProduct.productName}</h1>
    </div>
  );
}

export default SingleProduct;
