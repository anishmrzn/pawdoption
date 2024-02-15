function About() {
  return (
    <div className="container mx-auto my-16 px-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-[#c9a687] mb-8 text-center">
        Why Choose Pawdoption?
      </h1>
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center justify-center bg-white p-12 rounded-lg shadow-lg"
        data-aos="fade-left"
      >
        <div className="text-center border border-gray-300 rounded-lg p-6">
          <div className="text-[#a67b5b] text-[5rem]">
            <ion-icon name="heart-outline"></ion-icon>
          </div>
          <h1 className="text-lg lg:text-2xl font-semibold text-[#c9a687] mt-4">
            Kind to Everyone
          </h1>
          <ul className="list-disc marker:text-[#a67b5b] mt-3 text-gray-700">
            <li>Every pet deserves to be safe, loved, and respected.</li>
            <li>
              People who are great candidates for adoption shouldn't be put off
              by complicated processes or one-size-fits-all rules.
            </li>
            <li>
              People who need to rehome their pets should be empowered to do so
              without being judged.
            </li>
          </ul>
        </div>

        <div className="text-center border border-gray-300 rounded-lg p-6">
          <div className="text-[#a67b5b] text-[5rem]">
            <ion-icon name="paw-outline"></ion-icon>
          </div>
          <h1 className="text-lg lg:text-2xl font-semibold text-[#c9a687] mt-4">
            Advocate Adoption
          </h1>
          <ul className="list-disc marker:text-[#a67b5b] mt-3 text-gray-700">
            <li>This value sits at the heart of everything we do.</li>
            <li>
              Adoption reduces the demand for puppy farming, industrial-scale
              breeding, illegal pet imports, and other forms of exploitation and
              abuse.
            </li>
            <li>We're proud supporters of #AdoptDontShop.</li>
          </ul>
        </div>

        <div className="text-center border border-gray-300 rounded-lg p-6">
          <div className="text-[#a67b5b] text-[5rem]">
            <ion-icon name="home-outline"></ion-icon>
          </div>
          <h1 className="text-lg lg:text-2xl font-semibold text-[#c9a687] mt-4">
            Responsible Rehoming
          </h1>
          <ul className="list-disc marker:text-[#a67b5b] mt-3 text-gray-700">
            <li>We're champions of rehoming, but not at any cost.</li>
            <li>
              We believe in finding the right match between adopters and pets,
              not taking risks or rushing.
            </li>
            <li>
              We always prioritize pet welfare and offer a safer, more ethical,
              and professional alternative to online marketplaces like Preloved,
              Facebook.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
