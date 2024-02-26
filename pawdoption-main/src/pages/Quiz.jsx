import PageNav from "../components/PageNav";

import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Quiz() {
  return (
    <div>
      <PageNav />
      <div className="flex flex-col lg:flex-row items-center gap-20 bg-gray-200 px-5 lg:px-16 py-16 justify-center my-10 rounded-xl">
        <img
          src="/petgallery (9).webp"
          alt="quiz start"
          className="h-[10rem] md:h-[17rem] lg:h-[25rem]  rounded-lg"
        />
        <div className="flex flex-col items-center gap-12 justify-center">
          <h1 className="text-4xl text-center font-extrabold text-[#b98e6d]">
            Find the Best Dog Breed for You!
          </h1>
          <p className="text-justify text-lg">
            Answer a series of quick questions to help us find your best dog
            breed matches! We’ll ask about your preferences and needs for your
            new dog, and we’ll ask about your everyday lifestyle. The more
            questions you answer, the better matches we can make. Keep in mind
            that these matches are a great starting point, but we always
            encourage you to meet your favorite breeds in person, and talk with
            people who own or breed them to learn more!
          </p>
          <Link
            to="/petquiz"
            className="text-md  px-16 py-3 text-white font-bold hover:shadow-lg transition-all duration-300 cursor-pointer bg-[#ceae93] hover:bg-[#c9a687]  rounded-full  focus:outline-none"
          >
            Start Quiz
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Quiz;
