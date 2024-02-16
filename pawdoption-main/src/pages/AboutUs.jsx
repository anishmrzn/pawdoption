import React, { useEffect } from "react";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <PageNav />

      <section className="text-center mt-16">
        <h1 className="text-5xl font-extrabold mb-5 text-[#c9a687]">
          Welcome to Pawdoption
        </h1>
        <p className="text-lg text-gray-700">
          Connecting pets with loving families for a lifetime of joy and
          companionship.
        </p>
      </section>

      <section className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-16">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-lg bg-white p-6">
            <h2 className="text-3xl font-bold mb-4 text-[#c9a687]">
              Contact Us
            </h2>
            <form
              action="https://formspree.io/f/xkndrvgy"
              method="POST"
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                name="username"
                required
                autoComplete="off"
                className="border-2 p-2 focus:outline-none rounded-md"
              />
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                required
                autoComplete="off"
                className="border-2 p-2 focus:outline-none rounded-md"
              />
              <textarea
                name="message"
                cols="30"
                rows="6"
                required
                autoComplete="off"
                placeholder="Enter your message"
                className="border-2 p-2 focus:outline-none resize-none rounded-md"
              ></textarea>
              <button
                type="submit"
                className="bg-[#c9a687] text-white py-2 px-4 rounded-md transition duration-300 hover:bg-[#a3825d]"
              >
                SEND
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Our Location Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1766.6494992605492!2d85.31719333438105!3d27.677152231952658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1707987136734!5m2!1sen!2snp"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="mt-16 p-8 md:p-16 bg-[#f0f0f0] rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#c9a687]">
          Our Pet Adoption Gallery
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          <div className="overflow-hidden">
            <img
              src="/petgallery.webp"
              alt="Pet Adoption 3"
              className="w-[20rem] h-[10rem] hover:scale-[120%] transition-all duration-500 "
            />
          </div>
          <div className="overflow-hidden">
            <img
              src="/petgallery (2).webp"
              alt="Pet Adoption 3"
              className="w-[20rem] h-[10rem] hover:scale-[120%] transition-all duration-500"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src="/petgallery (3).webp"
              alt="Pet Adoption 3"
              className="w-[20rem] h-[10rem] hover:scale-[120%] transition-all duration-500"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src="/petgallery (4).webp"
              alt="Pet Adoption 3"
              className="w-[20rem] h-[10rem] hover:scale-[120%] transition-all duration-500"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src="/petgallery (5).webp"
              alt="Pet Adoption 3"
              className="w-[20rem] h-[10rem] hover:scale-[120%] transition-all duration-500"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src="/petgallery (6).webp"
              alt="Pet Adoption 3"
              className="w-[20rem] h-[10rem] hover:scale-[120%] transition-all duration-500"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src="/petgallery (7).webp"
              alt="Pet Adoption 3"
              className="w-[20rem] h-[10rem] hover:scale-[120%] transition-all duration-500"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src="/petgallery (8).webp"
              alt="Pet Adoption 3"
              className="w-[20rem] h-[10rem] hover:scale-[120%] transition-all duration-500"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src="/petgallery (9).webp"
              alt="Pet Adoption 3"
              className="w-[20rem] h-[10rem] hover:scale-[120%] transition-all duration-500"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src="/petgallery (10).webp"
              alt="Pet Adoption 3"
              className="w-[20rem] h-[10rem] hover:scale-[120%] transition-all duration-500"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutUs;
