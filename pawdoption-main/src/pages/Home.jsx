import About from "../components/About";
import Adoption from "../components/Adoption";
import FeaturedItems from "../components/FeaturedItems";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { useProductContext } from "../context/ProductContext";

function Home() {
  return (
    <div className="flex flex-col gap-10  ">
      <Hero />
      <Adoption />
      <h1 className="text-[#c9a687] font-bold text-xl text-center">
        Featured Items
      </h1>
      <FeaturedItems />

      <About />
      <Footer />
    </div>
  );
}

export default Home;
