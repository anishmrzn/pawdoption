import PageNav from "./PageNav";
import Logo from "./Logo";

function Hero() {
  return (
    <div className=" hero h-[30rem]  relative ">
      <PageNav />
      <div className="mt-5 flex flex-col items-center gap-3 justify-center  absolute top-[30%] left-[50%]  translate-x-[-50%] translate-y-[-50%]">
        <Logo />

        <h1
          className="  font-extrabold text-md text-center text-[#c9a687]"
          data-aos="fade-down"
        >
          Where Every Paw Finds a Home!
        </h1>
      </div>
    </div>
  );
}

export default Hero;
