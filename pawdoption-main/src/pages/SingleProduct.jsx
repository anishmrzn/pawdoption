import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useEffect } from "react";
const API = "http://localhost:8000/products";
function SingleProduct() {
  const { singleProduct, getSingleProduct } = useProductContext();
  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(`${API}/${id}`);
  }, []);
  return (
    <div>
      <h1>{singleProduct.productName}</h1>
    </div>
  );
}

export default SingleProduct;
