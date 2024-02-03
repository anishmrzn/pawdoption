function Adoption() {
  return (
    <div
      className="flex flex-col md:flex-row md:text-xl lg:text-2xl items-center justify-center gap-10 md:gap-28 border-2 px-10 py-5 md:py-20 rounded-xl"
      data-aos="zoom-in"
    >
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-[#c9a687] font-bold">Put up for Adoption</h1>
        <button className="button">I want to rehome my Pet</button>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-[#c9a687] font-bold">Adopt a Pet</h1>
        <button className="button">I want to adopt a Pet</button>
      </div>
    </div>
  );
}

export default Adoption;
