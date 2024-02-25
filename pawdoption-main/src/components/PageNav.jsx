import React, { useEffect, useState, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useUserContext } from "../context/UserContext";

function PageNav() {
  const { removeUser } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { total_item } = useCartContext();
  const sellerToken = localStorage.getItem("sellerToken");
  const userToken = localStorage.getItem("userToken");
  const [btnState, setBtnState] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const [sticky, setSticky] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 400);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSticky(false);
  }, [location.pathname]);

  function handleClick() {
    setBtnState((btnState) => !btnState);
  }

  function handleLogout() {
    localStorage.removeItem("sellerToken");
    localStorage.removeItem("userToken");
    removeUser();
    navigate("/");
  }

  function handleDropdown() {
    setDropDown((dropDown) => !dropDown);
  }

  let toggleClassDropdown = dropDown ? "" : "hidden";
  let toggleClassOpen = btnState ? "open" : "";
  let toggleClassHidden = btnState ? "flex" : "hidden";

  const stickyClass = sticky && location.pathname === "/" ? "sticky" : "";

  return (
    <div className={stickyClass}>
      <nav className="relative">
        <ul className="hidden md:flex flex-col items-center ">
          <div className="flex gap-20">
            <li>
              <NavLink
                to="/"
                className=" font-bold text-lg hover:text-[#c9a687] transition-all duration-500"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/store"
                className="font-bold text-lg hover:text-[#c9a687] transition-all duration-500"
              >
                Store
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/quiz"
                className="font-bold text-lg hover:text-[#c9a687] transition-all duration-500"
              >
                Quiz
              </NavLink>
            </li>
          </div>
        </ul>
        {!(sellerToken || userToken) ? (
          <div className="hidden md:flex absolute left-[88%] top-[0%]">
            <Link
              to="/login"
              className="bg-[#c9a687] text-white py-2 px-4 w-[6rem] text-center rounded-xl shadow-md hover:bg-[#a57b50] transition-all duration-300"
            >
              Login
            </Link>
          </div>
        ) : (
          <>
            <div>
              <button
                className="hidden md:flex absolute left-[88%] top-[0%] text-md hover:shadow-2xl shadow-black border-2 rounded-full px-4 py-4 hover:text-[#c9a687] transition-all duration-500"
                onClick={handleDropdown}
              >
                <ion-icon name="person"></ion-icon>
              </button>

              <div
                ref={dropdownRef}
                className={`${toggleClassDropdown} absolute left-[86.4%] top-[180%]  clip  bg-gray-300  }`}
              >
                <div className="smallClip bg-white  px-6 py-5">
                  <ul className="flex flex-col gap-3 text-md">
                    {!sellerToken ? (
                      <li className="text-black hover:scale-110 transition-all hover:text-gray-500 duration-500 mt-2">
                        <Link to="/account" onClick={window.location.reload}>
                          My Account
                        </Link>
                      </li>
                    ) : (
                      <li className="text-black hover:scale-110 transition-all hover:text-gray-500 mt-2">
                        <Link to="/seller">Seller</Link>
                      </li>
                    )}
                    {!sellerToken ? (
                      <li className="text-black hover:scale-110 transition-all hover:text-gray-500">
                        <Link to="/orders">My Orders</Link>
                      </li>
                    ) : (
                      <li className="text-black hover:scale-110 transition-all hover:text-gray-500 mt-2">
                        <Link to="/sales">Sales Records</Link>
                      </li>
                    )}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-black hover:scale-110 transition-all hover:text-gray-500"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Link to="/cart">
              <div className="hidden md:flex absolute left-[94%] top-[0%] text-lg border-2 rounded-full px-4 py-4 hover:text-[#c9a687] transition-all duration-500 hover:shadow-2xl shadow-black ">
                <ion-icon name="cart"></ion-icon>
                <div className="bg-[#d9c0ab] flex rounded-full border-2 font-bold shadow-2xl px-1 w-7 h-7 absolute top-[-20%] left-[50%] items-center justify-center text-sm bounce">
                  {total_item}
                </div>
              </div>
            </Link>
          </>
        )}

        <div className="md:hidden flex  justify-end px-5 py-3">
          <button
            id="menu-btn"
            className={`z-50 ${toggleClassOpen} block hamburger lg:hidden focus:outline-none`}
            onClick={handleClick}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
        <menu
          id="menu"
          className={`absolute z-40 bg-black top-0 bottom-0 left-0 ${toggleClassHidden} flex-col items-center justify-center   w-full h-[35rem] py-1 space-y-10 text-lg text-white uppercase  `}
        >
          <NavLink to="/" className="hover:text-[#c9a687]">
            Home
          </NavLink>
          <NavLink to="/store" className="hover:text-[#c9a687]">
            Store
          </NavLink>
          <NavLink to="/quiz" className="hover:text-[#c9a687]">
            Quiz
          </NavLink>
          {!(sellerToken || userToken) ? (
            <div className=" flex ">
              <Link to="/login" className="button ">
                Login
              </Link>
            </div>
          ) : (
            <>
              <div>
                <button className="flex text-md  hover:text-[#c9a687] transition-all duration-500">
                  <div className="flex items-center justify-center gap-3 ">
                    <ion-icon name="person"></ion-icon>
                    <h1 className="text-lg">ACCOUNT</h1>
                  </div>
                </button>

                <div
                  className={` flex flex-col items-center justify-center gap-2`}
                >
                  {!sellerToken ? (
                    <li className="text-white hover:underline  mt-5">
                      <Link to="/account" onClick={window.location.reload}>
                        My Account
                      </Link>
                    </li>
                  ) : (
                    <li className="text-white hover:underline  mt-5">
                      <Link to="/seller">Seller</Link>
                    </li>
                  )}
                  {!sellerToken ? (
                    <div className="text-white hover:underline">
                      <Link to="/orders">My Orders</Link>
                    </div>
                  ) : (
                    <li className="text-white hover:underline  mt-5">
                      <Link to="/sales">Sales Records</Link>
                    </li>
                  )}

                  <div>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:underline"
                    >
                      LOG OUT
                    </button>
                  </div>
                </div>
              </div>

              <button className="flex  text-md  hover:text-[#c9a687] transition-all duration-500 ">
                <Link
                  to="/cart"
                  className="flex items-center  justify-center gap-3"
                >
                  <ion-icon name="cart"></ion-icon>
                  <h1 className="text-lg">CART</h1>
                </Link>
              </button>
            </>
          )}
        </menu>
      </nav>
    </div>
  );
}

export default PageNav;
