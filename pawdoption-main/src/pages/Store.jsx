import PageNav from "../components/PageNav";

function Store() {
  return (
    <div>
      <PageNav />
      <div className="flex justify-between mt-10 items-center px-32">
        <div className="flex gap-10">
          <button>Dog</button>
          <button>Cat</button>
        </div>
        <div className="flex gap-5">
          <label>Search :</label>
          <input
            value={Text}
            name="search"
            placeholder=""
            className="border-2 border-black rounded-xl"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Store;
