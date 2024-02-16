import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Xavier Raez",
    image: "user-1.jpg",
    review:
      "I had a wonderful experience with the pet adoption website. It was easy to navigate and find the perfect furry companion. The process was smooth and efficient.",
    transform: "translate-x-[100%] ",
  },
  {
    id: 2,
    name: "Isabella Ramirez",
    image: "user-2.jpg",
    review:
      "The variety of pets available on the website was impressive. They had a diverse selection of animals, from playful puppies to loving cats, making it easy to find the perfect match.",
    transform: "translate-x-[300%]  ",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    image: "user-3.jpg",
    review:
      "Adopting a pet through the website was a straightforward and responsible process. They ensured a legal and ethical adoption by requiring necessary documentation and information.",
    transform: "translate-x-[500%]  ",
  },
];

function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const previousSlide = () => {
    if (current === 0) setCurrent(testimonials.length - 1);
    else setCurrent(current - 1);
  };
  const nextSlide = () => {
    if (current === testimonials.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
  const activateDot1 = () => {
    if (current !== 0) setCurrent(0);
  };
  const activateDot2 = () => {
    if (current !== 1) setCurrent(1);
  };
  const activateDot3 = () => {
    if (current !== 2) setCurrent(2);
  };

  return (
    <div className=" text-center">
      <h1 className="mb-[5rem] font-bold text-3xl">Testimonials</h1>
      <div className=" relative max-w-[100%] md:max-w-[60%] h-[35rem] m-auto z-99 overflow-hidden">
        <div
          className={`flex   justify-between transition ease-out duration-1000 absolute top-0 w-[100%]  h-50  `}
          style={{ transform: `translateX(-${100 * current}%)` }}
        >
          {testimonials.map((s) => {
            return (
              <div
                className={` ${s.transform}  w-[100%] flex flex-col items-center justify-between gap-3 lg:gap-10 relative`}
              >
                <div className="before:content-['\201C'] absolute text-[#c9a687] top-0 left-[-1rem] text-8xl"></div>
                <div className="w-20 border  rounded-full overflow-hidden mt-10">
                  <img src={s.image} alt="" />
                </div>
                <h6 className="font-bold text:[8px] md:text-2xl lg:text-3xl">
                  {s.name}
                </h6>
                <p className="text-justify break-all text-[12px]  lg:text-lg ">
                  {s.review}
                </p>
              </div>
            );
          })}
        </div>

        <div className="absolute top-0 h-[80%] md:h-[100%] w-full justify-between  flex  items-center text-black ">
          <button
            className="text-3xl hover:text-[#c9a687] transform hover:scale-110 transition-all duration-500 focus:outline-none"
            onClick={previousSlide}
          >
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>
          <button
            className="text-3xl hover:text-[#c9a687] transform hover:scale-110 transition-all duration-500 focus:outline-none"
            onClick={nextSlide}
          >
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </div>
        <div className="absolute top-[70%] lg:top-[90%] left-[41%] lg:left-[44%] flex gap-5">
          <button
            className={`text-[10px] lg:text-lg hover:text-[#c9a687] transition duration-500 transform hover:scale-110 focus:outline-none ${
              current === 0 ? "text-[#c9a687] transform scale-110 " : ""
            } `}
            onClick={activateDot1}
          >
            <ion-icon name="ellipse-outline"></ion-icon>
          </button>
          <button
            className={`text-[10px] lg:text-lg hover:text-[#c9a687] transition duration-500 transform hover:scale-110 focus:outline-none ${
              current === 1 ? "text-[#c9a687] transform scale-110 " : ""
            } `}
            onClick={activateDot2}
          >
            <ion-icon name="ellipse-outline"></ion-icon>
          </button>
          <button
            className={`text-[10px] lg:text-lg hover:text-[#c9a687] transition duration-500 transform hover:scale-110 focus:outline-none ${
              current === 2 ? "text-[#c9a687] transform scale-110 " : ""
            } `}
            onClick={activateDot3}
          >
            <ion-icon name="ellipse-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSlider;
