import { useEffect, useState } from "react";
import axios from "axios";

function AddProduct() {
  const [productImg, setProductImg] = useState("");
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  const [animalCategory, setAnimalCategory] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("http://localhost:8000/singleProduct");
        const product = await res.data;
        console.log(product);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("prductImg", productImg);
      formData.append("description", description);
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("shortDescription", shortDescription);
      formData.append("featured", featured);
      formData.append("supplierId", supplierId);
      formData.append("animalCategory", animalCategory);
      const { data } = await axios.post(
        "http://localhost:8000/singleProduct",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form encType="multipart/form-data" className="grid grid-cols-3 gap-5">
        <label htmlFor="productImg">Product Image :</label>
        <input
          type="file"
          id="productImg"
          accept="image/*"
          onChange={(e) => {
            setProductImg(e.target.value);
          }}
          className="col-span-2 border-2"
        />
        <label htmlFor="productName">Product Name :</label>
        <input
          type="text"
          id="productName"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          value={productName}
          className="col-span-2 border-2"
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
          className="col-span-2 border-2"
        />
        <label htmlFor="productDes">Product description :</label>
        <input
          type="text"
          id="productDes"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="col-span-2 border-2"
        />
        <label htmlFor="productPrice">Product price :</label>
        <input
          type="text"
          id="productPrice"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          className="col-span-2 border-2"
        />
        <label htmlFor="productDis">Product discount :</label>
        <input
          type="text"
          id="productDis"
          value={discount}
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
          className="col-span-2 border-2"
        />
        <label htmlFor="productCat">Product Categoty :</label>
        <select
          id="productCat"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="col-span-2 border-2"
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
          className="col-span-2 border-2"
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
          className="col-span-2 border-2"
        />
        <label htmlFor="featured">Featured</label>
        <input
          type="checkbox"
          id="featured"
          checked={featured}
          onChange={(e) => {
            setFeatured(e.target.checked);
          }}
          className="col-span-2"
        />
        <label htmlFor="seller">Seller:</label>
        <input
          type="text"
          id="seller"
          value={supplierId}
          onChange={(e) => {
            setStock(e.target.value);
          }}
          className="col-span-2 border-2"
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
export default AddProduct;
