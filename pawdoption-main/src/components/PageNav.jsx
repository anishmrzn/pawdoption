import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

function PageNav() {
  const token = localStorage.getItem("token");
  console.log(token);
  const [btnState, setBtnState] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  function handleClick() {
    setBtnState((btnState) => !btnState);
  }
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.replace("http://localhost:5173/");
  }
  function handleDropdown() {
    setDropDown((dropDown) => !dropDown);
  }
  let toggleClassDropdown = dropDown ? "" : "hidden";
  let toggleClassOpen = btnState ? "open" : "";
  let toggleClassHidden = btnState ? "flex" : "hidden";
  return (
    <div className={`${sticky ? "sticky" : ""} `}>
      <nav className=" relative">
        <ul className=" hidden md:flex flex-col items-center ">
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
        {token === null ? (
          <div className=" hidden md:flex absolute left-[88%] top-[-20%]">
            <Link to="/login" className="button ">
              Login
            </Link>
          </div>
        ) : (
          <>
            <div>
              <button
                className=" hidden md:flex absolute left-[88%] top-[0%] text-md border-2 rounded-full px-4 py-4 hover:text-[#c9a687] transition-all duration-500"
                onClick={handleDropdown}
              >
                <ion-icon name="person"></ion-icon>
              </button>
              <div
                className={`${toggleClassDropdown} absolute left-[86.4%] top-[180%]  px-6 py-5 clip bg-[#c9a687] }`}
              >
                <ul className="flex flex-col gap-3">
                  <li>My Account</li>
                  <li>My Orders</li>
                  <li>
                    <button onClick={handleLogout}>Log out</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden md:flex absolute left-[94%] top-[0%] text-lg border-2 rounded-full px-4 py-4 hover:text-[#c9a687] transition-all duration-500 ">
              <ion-icon name="cart"></ion-icon>
            </div>
          </>
        )}

        <div className="md:hidden flex  justify-end px-5 py-3">
          <button
            id="menu-btn"
            className={` z-50 ${toggleClassOpen} block hamburger lg:hidden focus:outline-none`}
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
          <Link to="/login" className="button ">
            Login
          </Link>
        </menu>
      </nav>
    </div>
  );
}

export default PageNav;
