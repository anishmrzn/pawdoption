import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import breed_desc from "../constants/constants";

import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

function PetQuiz() {
  const [userResponses, setUserResponses] = useState({
    // temperament_values: 0,
    // min_height: 30,
    // max_height: 40,
    // min_weight: 23,
    // max_weight: 34,
    // min_expectancy: 4,
    // max_expectancy: 5,
    // group_values: 3,
    // grooming_frequency_value: 0.8,
    // shedding_value: 0.6,
    // energy_level_value: 0.6,
    // trainability_value: 0.4,
    // demeanor_value: 0.6,
  });

  const [questionIndex, setQuestionIndex] = useState(0);
  const [recommendedBreed, setRecommendedBreed] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hidden, setHidden] = useState(false);
  const toggleClassHidden = hidden ? "hidden" : "";

  const sampleQuestions = [
    {
      question: "1. What kind of personality would you like your dog to have?",
      options: {
        loyal: 0,
        courageous: 1,
        charming: 2,
        gentle: 3,
        smart: 4,
        lively: 5,
      },
      key: "temperament_values",
      type: "radio",
    },
    {
      question:
        "2. What is the shortest you would like your pet to be? Min value (10-60 in cm)",
      // options: {
      //   tiny: 10,
      //   small: 20,
      //   medium: 30,
      //   large: 50,
      // },
      key: "min_height",
      type: "number",
    },
    {
      question:
        "3. What is the tallest you would like your pet to grow? Max value (20-82 in cm)",
      key: "max_height",
      type: "number",
    },
    {
      question:
        "4. What is the lightest you would like your pet to be? Min value (2-60 in kg)",
      key: ["min_weight"],
      type: "number",
    },
    {
      question:
        "5. What is the heaviest you would like your pet to be? Max value (3-90 in kg)",
      key: "max_weight",
      type: "number",
    },
    {
      question:
        "6. How many years at least would you like to spend with your pet? Min value (6-15 in years)",
      key: ["min_expectancy"],
      type: "number",
    },
    {
      question:
        "7. How many joyful years would you like to share with your furry friend? Max value (9-18 in years)",
      key: "max_expectancy",
      type: "number",
    },
    {
      question:
        "8. Which group of dog breeds would you consider most compatible with your preference?",
      options: {
        "toy group": 0,
        "hound group": 1,
        "working group": 2,
        "miscellaneous class": 3,
        "non-sporting group": 4,
        "herding group": 5,
        "terrier group": 6,
        "sporting group": 7,
      },
      key: "group_values",
      type: "radio",
    },
    {
      question: "9. How often are you willing to groom your pet?",
      options: {
        occasional: 0.2,
        weekly: 0.4,
        "2-3 times a week": 0.6,
        daily: 0.8,
        professional: 1,
      },
      key: "grooming_frequency_value",
      type: "radio",
    },
    {
      question: "10. How much coat shedding can you deal with?",
      options: {
        infrequent: 0.2,
        occasional: 0.4,
        seasonal: 0.6,
        regularly: 0.8,
        frequent: 1,
      },
      key: "shedding_value",
      type: "radio",
    },
    {
      question: "11. How energetic would you like your dog to be?",
      options: {
        "couch potato": 0.2,
        calm: 0.4,
        "regular exercise": 0.6,
        energetic: 0.8,
        "needs lots of activity": 1,
      },
      key: "energy_level_value",
      type: "radio",
    },
    {
      question: "12. How trainable do you want your dog to be?",
      options: {
        stubborn: 0.2,
        independent: 0.4,
        agreeable: 0.6,
        "easy training": 0.8,
        "eager to please": 1,
      },
      key: "trainability_value",
      type: "radio",
    },

    {
      question:
        "13. How would you describe your dogs behaviour around other people?",
      options: {
        wary: 0.2,
        "reserved with strangers": 0.4,
        responsive: 0.6,
        friendly: 0.8,
        outgoing: 1,
      },
      key: "demeanor_value",
      type: "radio",
    },
  ];

  const handleInputChange = (key, value) => {
    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [key]: value,
    }));
    setSelectedOption(value);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setQuestionIndex((prev) => prev + 1);
    }
    setSelectedOption(null);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_responses: [userResponses] }),
      });

      const data = await response.json();
      console.log(breed_desc[data.recommended_breed]);
      setRecommendedBreed(data.recommended_breed);
      setHidden(!hidden);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const restartQuiz = () => {
    setUserResponses({});
    setQuestionIndex(0);
    setRecommendedBreed(null);
    setHidden(!hidden);
  };

  const currentQuestion = sampleQuestions[questionIndex];

  return (
    <div className="bg-[#f1eeea] rounded-xl h-[50rem]">
      <PageNav />
      <div
        className={`${toggleClassHidden} min-h-screen flex items-center justify-center  my-10`}
      >
        <div className="bg-white border-2 border-[#b98e6d] p-10 shadow-lg rounded-3xl w-[45rem] ">
          <h1 className="text-4xl flex items-center justify-center gap-5 font-bold mb-6 text-center text-[#b98e6d]">
            Dog Breed Quiz{" "}
            <img src="/quiz.png" alt="quiz" className="h-[3rem]" />
          </h1>

          {questionIndex !== sampleQuestions.length && (
            <div key={currentQuestion.key} className="mb-6">
              <label className="block text-xl font-semibold text-black mb-5 text-center mt-5  ">
                {currentQuestion.question}
              </label>
              {currentQuestion.type === "radio" ? (
                Object.entries(currentQuestion.options).map(([key, value]) => (
                  <div key={key} className="flex items-center mb-3">
                    <input
                      name={currentQuestion.key}
                      id={key}
                      value={value}
                      type="radio"
                      onChange={(e) =>
                        handleInputChange(currentQuestion.key, value)
                      }
                      className="hidden"
                    />
                    <label
                      htmlFor={key}
                      className={`border-2 border-[#b98e6d] w-full grid grid-cols-10  rounded-xl text-center font-semibold text-lg py-2 px-5 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 ${
                        selectedOption === value ? "bg-white" : ""
                      }`}
                    >
                      <div className="col-span-1">
                        {selectedOption === value && (
                          <img
                            src="./selected.png"
                            alt="selected"
                            className="h-[1.7rem] "
                          />
                        )}
                      </div>
                      <div className="col-span-8 text-[#553d27]">{key}</div>
                    </label>
                  </div>
                ))
              ) : (
                <input
                  type="number"
                  placeholder={sampleQuestions.placeholder}
                  onChange={(e) =>
                    handleInputChange(
                      currentQuestion.key,
                      parseFloat(e.target.value)
                    )
                  }
                  className="border-2 border-[#b98e6d] w-full grid grid-cols-10 shadow-lg rounded-xl text-center font-semibold text-lg py-2 px-5 focus:outline-none"
                />
              )}
            </div>
          )}

          {questionIndex !== sampleQuestions.length && (
            <div className="flex flex-col justify-center items-center mt-14 mb-4">
              {questionIndex === sampleQuestions.length - 1 && (
                <button
                  onClick={handleSubmit}
                  className="text-md  px-20 py-3 text-white font-bold hover:shadow-lg transition-all duration-300 cursor-pointer bg-[#ceae93] hover:bg-[#c9a687]  rounded-full  focus:outline-none  "
                >
                  Submit
                </button>
              )}
              {questionIndex === sampleQuestions.length - 1 ? (
                ""
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className={`text-md  px-16 py-3 text-white font-bold hover:shadow-lg transition-all duration-300 cursor-pointer bg-[#ceae93] hover:bg-[#c9a687]  rounded-full  focus:outline-none ${
                    selectedOption === null
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  } {questionIndex === sampleQuestions.length ? "hidden":""}
                `}
                  disabled={questionIndex === sampleQuestions.length - 1}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {recommendedBreed && (
        <div className=" bg-white p-8 rounded-xl shadow-xl my-10 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-4">
            Your Perfect Match: {recommendedBreed}
          </h2>
          <p className="text-gray-700 text-lg mb-6 font-bold text-center w-[50rem]">
            Congratulations! The {recommendedBreed} is known for its friendly
            nature and loyalty. Here's a brief overview of this wonderful breed:
          </p>
          <p className="text-gray-700 text-justify mb-6 w-[60rem] ">
            {breed_desc[recommendedBreed]}
          </p>
          <div className="flex justify-between gap-[25rem] items-center">
            <div>
              <p className="text-gray-600">
                Want to learn more about {recommendedBreed} ownership?
              </p>
              <Link
                to="/blog"
                className="text-blue-500 hover:underline transition-all duration-300"
              >
                Explore Care Tips
              </Link>
            </div>
            <button
              onClick={restartQuiz}
              className="text-lg px-8 py-3 text-white font-bold rounded-2xl bg-[#ceae93] hover:bg-rounded-full transition-all duration-300 focus:outline-none"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetQuiz;
