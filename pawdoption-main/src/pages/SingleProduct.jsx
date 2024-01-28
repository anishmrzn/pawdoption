import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useEffect } from "react";
import PageNav from "../components/PageNav";

function SingleProduct() {
  const { singleProduct, getSingleProduct } = useProductContext();

  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(`http://127.0.0.1:8000/api/single-product/${id}`);
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
