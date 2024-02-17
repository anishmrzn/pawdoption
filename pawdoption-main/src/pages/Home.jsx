import React, { useState, useEffect } from "react";
import About from "../components/About";
import Adoption from "../components/Adoption";
import FeaturedItems from "../components/FeaturedItems";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonials";

function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollButton(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-10  ">
      <Hero />
      <Adoption />
      <h1 className="text-[#c9a687] font-bold text-xl text-center">
        Featured Items
      </h1>
      <FeaturedItems />

      <About />
      <Testimonial />
      <Footer />

      {showScrollButton && (
        <button
          className="fixed bottom-7 right-7 bg-blue-800 text-white text-2xl px-3 py-2 rounded-full"
          onClick={scrollToTop}
        >
          <ion-icon name="arrow-up-outline"></ion-icon>
        </button>
      )}
    </div>
  );
}

export default Home;
