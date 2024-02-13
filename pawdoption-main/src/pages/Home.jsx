import About from "../components/About";
import Adoption from "../components/Adoption";
import FeaturedItems from "../components/FeaturedItems";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

function Home() {
  const cart = localStorage.getItem("pawcart");

  // Check if 'pawcart' exists in localStorage
  if (cart) {
    // Parse the JSON array
    const parsedCart = JSON.parse(cart);

    // Use map to extract and log every item's id
    const itemIds = parsedCart.map((product) => product.productId);

    console.log(itemIds);
  } else {
    console.log("No 'pawcart' found in localStorage.");
  }
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
