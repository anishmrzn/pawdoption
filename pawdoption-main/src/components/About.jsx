function About() {
  return (
    <div className="flex flex-col items-center gap-16 border-2 px-10 py-5 rounded-xl">
      <h1 className="text-lg lg:text-2xl font-bold text-[#c9a687]">
        Why choose Pawdoption?
      </h1>
      <div className="flex flex-col lg:flex-row justify-between gap-5 xl:gap-20">
        <div className="border-2 border-gray-200 px-10 py-5 w-[20rem] hover:shadow-2xl transition-all duration-500 rounded-lg">
          <div className="text-[#a67b5b] text-center text-[5rem]">
            <ion-icon name="heart-circle-outline"></ion-icon>
          </div>
          <h1 className="text-center font-semibold">Kind to Everyone</h1>
          <ul className="list-disc marker:text-[#a67b5b] mt-3 ">
            <li>every pet deserves to be safe, loved and respected</li>
            <li>
              people who are great candidates for adoption shouldn't be put off
              by compicated processes or one-size-fits-all rules
            </li>
            <li>
              people who need to rehome their pets should be empowered to do so
              without being judge
            </li>
          </ul>
        </div>
        <div className="border-2 border-gray-200 px-10 py-5 w-[20rem] hover:shadow-2xl transition-all duration-500 rounded-lg">
          <div className="text-[#a67b5b] text-center text-[5rem]">
            <ion-icon name="heart-circle-outline"></ion-icon>
          </div>
          <h1 className="text-center font-semibold">Advocate Adoption</h1>
          <ul className="list-disc marker:text-[#a67b5b] mt-3">
            <li>This value sits at the heart of everything we do.</li>
            <li>
              Adoption reduces the demand for puppy farming, industrial-scale
              breeding, illegal pet imports and other dorms of expploitation and
              abuse.
            </li>
            <li>We're proud supporters of #AdoptDontShop</li>
          </ul>
        </div>
        <div className="border-2 border-gray-200 px-10 py-5 w-[20rem] hover:shadow-2xl transition-all duration-500 rounded-lg">
          <div className="text-[#a67b5b] text-center text-[5rem]">
            <ion-icon name="heart-circle-outline"></ion-icon>
          </div>
          <h1 className="text-center font-semibold">Responsible Rehoming</h1>
          <ul className="list-disc marker:text-[#a67b5b] mt-3">
            <li>We're champions of rehoming. But not at any cost.</li>
            <li>
              We believe in finding the right match between adopters and pets,
              not taking risks or rushing.
            </li>
            <li>
              we always prioritise pet welfare. And we offer a safer, more
              ethical and professional alternative to online mrketplaces like
              Preloved, Facebook
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
