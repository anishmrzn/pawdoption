import About from "../components/About";
import Adoption from "../components/Adoption";
import FeaturedItems from "../components/FeaturedItems";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="flex flex-col gap-10  ">
      <Hero />
      <Adoption />

      <FeaturedItems />

      <About />
      <Footer />
    </div>
  );
}

export default Home;
