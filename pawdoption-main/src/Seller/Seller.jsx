import { Link, Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

function Seller() {
  return (
    <div className="grid grid-cols-10 gap-16">
      <div className="col-span-10">
        <PageNav />
      </div>

      <div className="col-span-3 flex flex-col items-center px-10 gap-5">
        <h1 className="text-md font-semibold text-xl">Manage Products</h1>
        <ul className="flex flex-col items-center gap-3 text-lg  ">
          <li>
            <Link
              to="/seller/add"
              className="cursor-pointer hover:text-gray-500"
            >
              Add
            </Link>
          </li>
          <li>
            <Link
              to="/seller/manage"
              className="cursor-pointer hover:text-gray-500"
            >
              Update
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-span-7 flex  justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Seller;
