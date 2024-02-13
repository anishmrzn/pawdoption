import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Signup from "./pages/Signup";
import Admin from "./Admin/Admin";
import Aos from "aos";
import "aos/dist/aos.css";
import Seller from "./Seller/Seller";
import AddProduct from "./Seller/AddProduct";
import UpdateProduct from "./Seller/UpdateProduct";
import SingleProduct from "./pages/SingleProduct";
import SinglePet from "./pages/SinglePet";
import ManageProducts from "./Seller/ManageProducts";

import AddToCart from "./pages/AddToCart";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import AboutUs from "./pages/AboutUs";
import SellerSignup from "./pages/SellerSignUp";
import Account from "./pages/Account";

import AdoptPet from "./pet/AdoptPet";
import RehomePet from "./pet/RehomePet";

function App() {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true, mirror: true });
  }, []);
  return (
    <div className=" container  ">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="store" element={<Store />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="sellersignup" element={<SellerSignup />} />
          <Route path="admin" element={<Admin />} />
          <Route path="account" element={<Account />} />
          <Route path="rehome" element={<RehomePet />} />

          <Route path="adopt" element={<AdoptPet />} />
          <Route path="addtocart" element={<AddToCart />} />
          <Route path="cart" element={<Cart />} />
          <Route path="aboutus" element={<AboutUs />} />

          <Route path="seller" element={<Seller />}>
            <Route index element={<AddProduct />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="manage" element={<ManageProducts />} />
            <Route path="update/:id" element={<UpdateProduct />} />
          </Route>
          <Route path="singleproduct/:id" element={<SingleProduct />} />
          <Route path="singlepet/:id" element={<SinglePet />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
