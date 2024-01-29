import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { useProductContext } from "../context/ProductContext";
const API = "http://127.0.0.1:8000/api/products/";

function UpdateProduct() {
  const [productImg, setProductImg] = useState("");
  const [Description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  const [animalCategory, setAnimalCategory] = useState("");

  const { singleProduct, getSingleProduct } = useProductContext();
  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(`${API}${id}/`);
  }, []);

  useEffect(() => {
    if (singleProduct) {
      setProductImg(singleProduct.productImg || "");
      setDescription(singleProduct.Description || "");
      setProductName(singleProduct.productName || "");
      setPrice(singleProduct.price || "");
      setDiscount(singleProduct.discount || "");
      setStock(singleProduct.stock || "");
      setCategory(singleProduct.category || "");
      setShortDescription(singleProduct.shortDescription || "");
      setFeatured(singleProduct.featured || "");
      setAnimalCategory(singleProduct.animalCategory || "");
    }
  }, [singleProduct]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("productImg", productImg);
      formData.append("Description", Description);
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("shortDescription", shortDescription);
      formData.append("featured", featured);
      formData.append("supplierId", supplierId);
      formData.append("animalCategory", animalCategory);
      //   const { data } = await axios.put(
      //     `http://127.0.0.1:8000/update/${id}/`,
      //     formData,
      //     { headers: { "Content-Type": "multipart/form-data" } }
      //   );
      // } catch (err) {
      //   console.log(err);
      // }
      const response = await fetch(`http://127.0.0.1:8000/api/update/${id}/`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        toast.success("Product Updated");
        window.location.replace("http://localhost:5173/store");
      }
    } catch (error) {
      toast.error("Error");
    }
  };
  const handleDelete = async () => {
    try {
      // let answer = window.prompt(
      //   "Are you sure you want to delete this product?"
      // );
      // if (!answer) return;
      //   const { data } = await axios.delete(
      //     `http://127.0.0.1:8000/delete/${id}/`
      //   );
      //   toast.success("product deleted successfully");
      //   navigate("/seller");
      // } catch (error) {
      //   console.log(error);
      //   toast.error("error deleting");
      // }
      let answer = window.prompt(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Product deleted");
        // navigate("/store");
        window.location.replace("http://localhost:5173/store");
      }
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <div className="flex flex-col gap-10 items-center border-2 px-16 py-10 rounded-2xl shadow-xl ">
      <h1 className=" font-extrabold text-2xl">Update your product </h1>
      <form className="grid grid-cols-3 gap-5 font-semibold">
        <label htmlFor="productImg">Product Image :</label>
        <input
          type="file"
          id="productImg"
          accept="image/*"
          onChange={(e) => {
            setProductImg(e.target.files[0]);
          }}
          className="col-span-2 border-2  rounded-xl border-gray-400"
        />
        <label htmlFor="productName">Product Name :</label>
        <input
          type="text"
          id="productName"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          value={productName}
          className="col-span-2 border-2  rounded-xl border-gray-400 py-1 px-5"
        />
        <label htmlFor="productShortDes">Product shortDescription :</label>
        <input
          type="text"
          id="productShortDes"
          onChange={(e) => {
            setShortDescription(e.target.value);
          }}
          value={shortDescription}
          maxLength="40"
          className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
        />
        <label htmlFor="productDes">Product description :</label>
        <input
          type="text"
          id="productDes"
          value={Description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
        />
        <label htmlFor="productPrice">Product price :</label>
        <input
          type="text"
          id="productPrice"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
        />
        <label htmlFor="productDis">Product discount :</label>
        <input
          type="text"
          id="productDis"
          value={discount}
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
          className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
        />
        <label htmlFor="productCat">Product Categoty :</label>
        <select
          type="file"
          id="productCat"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
        >
          <option value="Accessories">Accessories</option>
          <option value="Pet Food">Pet Food</option>
          <option value="Grooming">Grooming</option>
        </select>
        <label htmlFor="animal">Animal Category :</label>
        <select
          id="animal"
          value={animalCategory}
          onChange={(e) => {
            setAnimalCategory(e.target.value);
          }}
          className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
        >
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => {
            setStock(e.target.value);
          }}
          className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
        />
        <label htmlFor="featured">Featured</label>
        <input
          type="checkbox"
          id="featured"
          checked={featured}
          onChange={(e) => {
            setFeatured(e.target.checked);
          }}
          className="col-span-2 rounded-xl border-gray-400 py-1 px-5"
        />
        <div className="col-span-3 flex justify-between ">
          <button onClick={handleSubmit} className="button">
            Update Product
          </button>
          <button
            onClick={handleDelete}
            className=" px-5 py-1 rounded-xl text-white bg-red-500"
          >
            Delete Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;
