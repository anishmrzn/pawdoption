import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import breed_desc from "../constants/constants";
import Layout from "../layouts/Layout";

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
      question: "2. Do you want a short dog or a tall dog?",
      key: ["min_height"],
      type: "number",
    },
    {
      question: "2. Do you want a short dog or a tall dog?",
      key: "max_height",
      type: "number",
    },
    {
      question: "3. Do you want a lighter dog or a heavier dog?",
      key: ["min_weight"],
      type: "number",
    },
    {
      question: "3. Do you want a lighter dog or a heavier dog?",
      key: "max_weight",
      type: "number",
    },
    {
      question:
        "How many joyful years would you like to share with your furry friend?",
      key: ["min_expectancy"],
      type: "number",
    },
    {
      question:
        "How many joyful years would you like to share with your furry friend?",
      key: "max_expectancy",
      type: "number",
    },
    {
      question:
        "Which group of dog breeds would you consider most compatible with your preference?",
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
      question: "How often are you willing to groom your pet?",
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
      question: "How much coat shedding can you deal with?",
      options: {
        tnfrequent: 0.2,
        occasional: 0.4,
        seasonal: 0.6,
        regularly: 0.8,
        frequent: 1,
      },
      key: "shedding_value",
      type: "radio",
    },
    {
      question: "How energetic would you like your dog to be?",
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
      question: "How trainable do you want your dog to be?",
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
        "How would you describe your dogs behaviour around other people?",
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
  };
  console.log(userResponses);

  const handleNextQuestion = () => {
    if (questionIndex < sampleQuestions.length) {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
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
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const restartQuiz = () => {
    setUserResponses({});
    setQuestionIndex(0);
    setRecommendedBreed(null);
  };

  const currentQuestion = sampleQuestions[questionIndex];

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 my-10">
        <div className="bg-white p-8  shadow-2xl rounded-2xl max-w-md w-full">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Dog Breed Recommender
          </h1>

          {questionIndex !== sampleQuestions.length && (
            <div key={currentQuestion.key} className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {currentQuestion.question}
              </label>
              {currentQuestion.type === "radio"
                ? Object.entries(currentQuestion.options).map(
                    ([key, value]) => (
                      <div key={key} className="flex items-center mb-2">
                        <input
                          name={currentQuestion.key}
                          id={key}
                          value={value}
                          type="radio"
                          onChange={(e) =>
                            handleInputChange(currentQuestion.key, value)
                          }
                          className="border rounded-md px-3 py-2 mr-2 text-black"
                        />
                        <label htmlFor={key} className="text-black">
                          {key}
                        </label>
                      </div>
                    )
                  )
                : Array.isArray(currentQuestion.key)
                ? currentQuestion.key.map((k) => {
                    return <input key={k} type="number" />;
                  })(
                    <input
                      type="number"
                      onChange={(e) =>
                        handleInputChange(
                          currentQuestion.key,
                          parseFloat(e.target.value)
                        )
                      }
                      className="border rounded-md px-3 py-2 w-full"
                    />
                  )
                : ""}
            </div>
          )}

          {questionIndex !== sampleQuestions.length && (
            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                className="text-white bg-gray-600 px-4 py-2 rounded-md mt-4 button"
                disabled={questionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                className="text-white bg-blue-500 px-4 py-2 rounded-md mt-4 button"
                disabled={questionIndex === sampleQuestions.length - 1}
              >
                Next
              </button>
            </div>
          )}

          {recommendedBreed ? (
            <div className="mb-6">
              <p className="text-2xl font-semibold text-green-700 mb-2">
                Recommended Dog Breed: {recommendedBreed}
              </p>
              <p className="text-gray-700 text-justify">
                Description: {breed_desc[recommendedBreed]}
              </p>
              <button
                onClick={restartQuiz}
                className="text-white bg-indigo-500 px-4 py-2 rounded-md mt-4 button"
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            questionIndex === sampleQuestions.length - 1 && (
              <button
                onClick={handleSubmit}
                className="text-white bg-green-500 px-4 py-2 rounded-md mt-4 button"
              >
                Submit
              </button>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}

export default PetQuiz;
