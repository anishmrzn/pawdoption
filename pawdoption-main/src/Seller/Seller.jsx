import { Link, Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

function Seller() {
  return (
    <div className="grid grid-cols-5 gap-16">
      <div className="col-span-5">
        <PageNav />
      </div>

      <div className="col-span-1 flex flex-col items-center px-10 gap-5">
        <h1 className="text-md font-semibold">Manage Products</h1>
        <ul className="flex flex-col items-center gap-3 text-sm">
          <li>
            <Link to="/seller/add">Add</Link>
          </li>
          <li>
            <Link to="/seller/update">Update</Link>
          </li>
        </ul>
      </div>
      <div className="col-span-4 flex  justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Seller;
