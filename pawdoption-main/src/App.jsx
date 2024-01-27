import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Signup from "./pages/Signup";
import Admin from "./Admin/Admin";
import Seller from "./Seller/Seller";
import AddProduct from "./Seller/AddProduct";
import UpdateProduct from "./Seller/UpdateProduct";
import SingleProduct from "./pages/SingleProduct";

function App() {
  return (
    <div className=" container  ">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="store" element={<Store />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="admin" element={<Admin />} />
          <Route path="seller" element={<Seller />}>
            <Route index element={<AddProduct />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="update/:id" element={<UpdateProduct />} />
          </Route>
          <Route path="singleproduct/:id" element={<SingleProduct />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
