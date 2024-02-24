import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import breed_desc from "../constants/constants";

import Layout from "../layouts/Layout";

function PetQuiz() {
  const [userResponses, setUserResponses] = useState({});
  // temperament_values: 5,
  //   min_height: 33.02,
  //   max_height: 38.1,
  //   min_weight: 5.89670081,
  //   max_weight: 13.6077711,
  //   min_expectancy: 10.0,
  //   max_expectancy: 15.0,
  //   group_values: 1,
  //   grooming_frequency_value: 0.6,
  //   shedding_value: 0.6,
  //   energy_level_value: 0.8,
  //   trainability_value: 0.6,
  //   demeanor_value: 0.8,
  const [recommendedBreed, setRecommendedBreed] = useState(null);

  const sampleQuestions = [
    {
      question: "How would you describe your dog's temperament?",
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
  ];

  //   const handleInputChange = (key, value) => {
  //     setUserResponses((prevResponses) => ({ ...prevResponses, [key]: value }));
  //   };
  //   const handleSubmit = async () => {
  //     console.log(userResponses);
  //     try {
  //       const response = await fetch("http://localhost:8000/api/predict/", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ userResponses }),
  //       });

  //       const data = await response.json();
  //       console.log(data);
  //       setRecommendedBreed(data.recommended_breed);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  // const handleSubmit = async () => {
  //   console.log(userResponses);
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/api/predict/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ user_responses: userResponses }),
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //     setRecommendedBreed(data.recommended_breed);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const handleInputChange = (key, value) => {
    setUserResponses((prevResponses) => ({ ...prevResponses, [key]: value }));
    // console.log(userResponses);
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
      // console.log(response);
      const data = await response.json();
      console.log(breed_desc[data.recommended_breed]);
      setRecommendedBreed(data.recommended_breed);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 my-10">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-4">Dog Breed Recommender</h1>
          {sampleQuestions.map((question) => (
            <div key={question.key} className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {question.question}
              </label>
              {question.type === "radio" ? (
                Object.entries(question.options).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-start">
                    <input
                      name={question.key}
                      id={key}
                      value={value}
                      type="radio"
                      onChange={(e) => handleInputChange(question.key, value)}
                      className="border rounded-md px-3 py-2 w-full text-center text-black"
                    />

                    <label htmlFor={key} className="text-center">
                      {key}
                    </label>
                  </div>
                ))
              ) : (
                <input
                  type="number"
                  onChange={(e) =>
                    handleInputChange(question.key, parseInt(e.target.value))
                  }
                  className="border rounded-md px-3 py-2 w-full"
                />
              )}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className=" text-black  px-4 py-2 rounded-md mt-4"
          >
            Submit
          </button>
          {recommendedBreed && (
            <>
              <p className="mt-4 text-green-700">
                Recommended Dog Breed: {recommendedBreed}
              </p>
              <p className="mt-4 text-green-700 text-justify">
                Description: {breed_desc[recommendedBreed]}
              </p>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default PetQuiz;
