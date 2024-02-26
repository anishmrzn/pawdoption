import { Link } from "react-router-dom";

function Footer() {
  const userToken = localStorage.getItem("userToken");
  const sellerToken = localStorage.getItem("sellerToken");

  return (
    <div className="bg-[#b98e6d] py-10 rounded-xl">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-3xl text-black font-bold">Pawdoption</span>

          <p className="text-black max-w-sm">
            Welcome to Pawdoption, where we connect pets with loving families.
            Find your furry friend today and embark on a journey filled with joy
            and companionship.
          </p>

          {!(userToken || sellerToken) ? (
            <Link
              to="/login"
              className="font-bold text-black border-2 border-[#a67b5b] text-lg hover:shadow-2xl transition-all duration-500 bg-[#b98e6d] px-8 py-3 rounded-xl"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/aboutus"
              className="font-bold text-black border-2 border-[#a67b5b] text-lg hover:shadow-2xl transition-all duration-500 bg-[#b98e6d] px-8 py-3 rounded-xl"
            >
              About Us
            </Link>
          )}
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-black text-3xl font-bold">Contact</span>
          <p className="text-black max-w-sm">
            Visit us at our location on Paw Street, find us on social media, or
            drop us an email. We're here to assist you!
            <br />
            123 Paw Street, Labim Mall <br />
            +977 9809876554 <br />
            pawdoption0@gmail.com <br />
            www.pawdoption.com
          </p>

          <div className="flex gap-6 mt-4">
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

        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-black text-3xl font-bold">
            Adoption Process
          </span>
          <p className="text-black max-w-sm">
            Ready to welcome a new member to your family? Our adoption process
            is simple and includes a meet-and-greet with your potential furry
            friend. Start your adoption journey with Pawdoption!
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-black text-3xl font-bold">Pet Care Tips</span>
          <p className="text-black max-w-sm">
            We care about the well-being of every pet. Explore our blog for
            helpful tips on pet care, training, and creating a happy home for
            your new family member.
          </p>
          <Link
            to="/blog"
            className="font-bold text-black border-2 border-[#a67b5b] text-lg hover:shadow-2xl transition-all duration-500 bg-[#b98e6d] px-8 py-3 rounded-xl"
          >
            Blog
          </Link>
        </div>
      </div>

      <p className="text-sm font-semibold text-black text-center pt-8">
        &copy; Copyright 2023 Pawdoption
      </p>
    </div>
  );
}

export default Footer;
