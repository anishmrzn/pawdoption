import { Link } from "react-router-dom";

function Footer() {
  const userToken = localStorage.getItem("userToken");
  const sellerToken = localStorage.getItem("sellerToken");

  return (
    <div className="bg-[#b98e6d] px-10">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-20 pb-10 gap-10">
        <div className="flex flex-col items-center gap-10">
          <span className="text-3xl text-black font-bold">Pawdoption</span>

          <p className="text-black w-[15rem] text-center">
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

        <div className="flex flex-col items-center gap-10">
          <span className="text-black text-3xl font-bold">Contact</span>
          <p className="text-black w-[20rem] text-center">
            Visit us at our location on Paw Street, find us on social media, or
            drop us an email. We're here to assist you!
            <br />
            123 Paw Street, Barksville <br />
            +1 123 456 7890 <br />
            contact@pawdoption.com <br />
            www.pawdoption.com <br />
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

        <div className="flex flex-col items-center gap-10">
          <span className="text-black text-3xl font-bold">
            Adoption Process
          </span>
          <p className="text-black text-center">
            Ready to welcome a new member to your family? Our adoption process
            is simple and includes a meet-and-greet with your potential furry
            friend. Start your adoption journey with Pawdoption!
          </p>
        </div>

        <div className="flex flex-col items-center gap-10">
          <span className="text-black text-3xl font-bold">Pet Care Tips</span>
          <p className="text-black text-center">
            We care about the well-being of every pet. Explore our blog for
            helpful tips on pet care, training, and creating a happy home for
            your new family member.
          </p>
        </div>
      </div>

      <p className="text-sm font-semibold text-black pt-10 flex flex-col items-center justify-center gap-5 pb-5">
        &copy; Copyright 2023 Pawdoption
      </p>
    </div>
  );
}

export default Footer;
