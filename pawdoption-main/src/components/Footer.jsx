import { Link } from "react-router-dom";
function Footer() {
  const userToken = localStorage.getItem("userToken");
  const sellerToken = localStorage.getItem("sellerToken");
  return (
    <div className="bg-[#b98e6d]  px-10">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4   pt-20 pb-10 gap-10 ">
        <div className="flex flex-col items-center  gap-10">
          <span className="text-3xl text-black font-bold">Pawdoption</span>

          <p className="text-black w-[15rem] text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when
          </p>
          {!(userToken || sellerToken) ? (
            <Link
              to="/login"
              className="font-bold text-black border-2 border-[#a67b5b] text-lg hover:shadow-2xl transition-all duration-500 bg-[#b98e6d] px-10 py-3 rounded-xl"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/aboutus"
              className="font-bold text-black border-2 border-[#a67b5b] text-lg hover:shadow-2xl transition-all duration-500 bg-[#b98e6d] px-10 py-3 rounded-xl"
            >
              About Us
            </Link>
          )}
        </div>
        <div className="flex flex-col items-center  gap-10">
          <span className="text-black text-3xl font-bold">Contact</span>
          <p className="text-black w-[20rem] text-center">
            Footpath,Newroad, Nepal <br />
            9832124430 <br />
            contact@pawdoption.com <br />
            www.pawdoption.com <br />
          </p>
          <div className="flex gap-10 ">
            <button className="icon text-2xl hover:translate-y-[-10%] transition-all duration-500">
              <ion-icon name="logo-facebook"></ion-icon>
            </button>
            <button className="icon text-2xl hover:translate-y-[-10%] transition-all duration-500">
              <ion-icon name="logo-instagram"></ion-icon>
            </button>
            <button className="icon text-2xl hover:translate-y-[-10%] transition-all duration-500">
              <ion-icon name="logo-youtube"></ion-icon>
            </button>
            <button className="icon text-2xl hover:translate-y-[-10%] transition-all duration-500">
              <ion-icon name="logo-github"></ion-icon>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center  gap-10">
          <span className="text-black text-3xl font-bold">Info</span>
          <p className="text-black  text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when
          </p>
        </div>
        <div className="flex flex-col items-center  gap-10">
          <span className="text-black text-3xl font-bold">Info</span>
          <p className="text-black  text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when
          </p>
        </div>
      </div>
      <p className="text-sm font-semibold text-black pt-10 flex flex-col items-center justify-center gap-10 pb-5">
        &copy; Copyright 2023 Lorem epsum siter
      </p>
    </div>
  );
}

export default Footer;
