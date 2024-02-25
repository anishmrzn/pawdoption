// import React, { useState } from "react";
// import "tailwindcss/tailwind.css";
// import breed_desc from "../constants/constants";

// import Layout from "../layouts/Layout";

// function PetQuiz() {
//   const [userResponses, setUserResponses] = useState({
//     temperament_values: 0,
//     min_height: 30,
//     max_height: 40,
//     min_weight: 23,
//     max_weight: 34,
//     min_expectancy: 4,
//     max_expectancy: 5,
//     group_values: 3,
//     grooming_frequency_value: 0.8,
//     shedding_value: 0.6,
//     energy_level_value: 0.6,
//     trainability_value: 0.4,
//     demeanor_value: 0.6,
//   });
//   // temperament_values: 5,
//   // min_height: 33.02,
//   // max_height: 38.1,
//   // min_weight: 5.89670081,
//   // max_weight: 13.6077711,
//   // min_expectancy: 10.0,
//   // max_expectancy: 15.0,
//   // group_values: 1,
//   // grooming_frequency_value: 0.6,
//   // shedding_value: 0.6,
//   // energy_level_value: 0.8,
//   // trainability_value: 0.6,
//   // demeanor_value: 0.8,

//   const [recommendedBreed, setRecommendedBreed] = useState(null);

//   const sampleQuestions = [
//     {
//       question: "1. How would you describe your dog's temperament?",
//       options: {
//         loyal: 0,
//         courageous: 1,
//         charming: 2,
//         gentle: 3,
//         smart: 4,
//         lively: 5,
//       },
//       key: "temperament_values",
//       type: "radio",
//     },
//     {
//       question: "2. Do you want a short dog or a tall dog?",
//       key: "min_height",
//       type: "number",
//     },
//     {
//       question: "2. Do you want a short dog or a tall dog?",
//       key: "max_height",
//       type: "number",
//     },
//     {
//       question: "3. Do you want a lighter dog or a heavier dog?",
//       key: "min_weight",
//       type: "number",
//     },
//     {
//       question: "3. Do you want a lighter dog or a heavier dog?",
//       key: "max_weight",
//       type: "number",
//     },
//     {
//       question: "4. How trainable do you want your dog to be?",
//       options: {
//         stubborn: 0.2,
//         independent: 0.4,
//         agreeable: 0.6,
//         "easy training": 0.8,
//         "eager to please": 1,
//       },
//       key: "trainability_value",
//       type: "radio",
//     },
//     {
//       question: "5. How energetic would you like your dog to be?",
//       options: {
//         "couch potato": 0.2,
//         calm: 0.4,
//         "regular exercise": 0.6,
//         energetic: 0.8,
//         "needs lots of activity": 1,
//       },
//       key: "energy_level_value",
//       type: "radio",
//     },
//     {
//       question: "6. Can you deal with coat shedding?",
//       options: {
//         tnfrequent: 0.2,
//         occasional: 0.4,
//         seasonal: 0.6,
//         regularly: 0.8,
//         frequent: 1,
//       },
//       key: "shedding_value",
//       type: "radio",
//     },
//     {
//       question:
//         "7.	What are the main reasons that you are choosing to get a dog?",
//       options: {
//         "toy group": 0,
//         "hound group": 1,
//         "working group": 2,
//         "miscellaneous class": 3,
//         "non-sporting group": 4,
//         "herding group": 5,
//         "terrier group": 6,
//         "sporting group": 7,
//       },
//       key: "group_values",
//       type: "radio",
//     },
//     {
//       question: "8.	Do you have children or guests frequently visiting?",
//       options: {
//         wary: 0.2,
//         "reserved with strangers": 0.4,
//         responsive: 0.6,
//         friendly: 0.8,
//         outgoing: 1,
//       },
//       key: "demeanor_value",
//       type: "radio",
//     },
//     {
//       question: "9. How often can you groom your pet?",
//       options: {
//         occasional: 0.2,
//         weekly: 0.4,
//         "2-3 times a week": 0.6,
//         daily: 0.8,
//         professional: 1,
//       },
//       key: "grooming_frequency_value",
//       type: "radio",
//     },
//     {
//       question:
//         "10.	How many joyful years would you like to share with your furry friend?",
//       key: "min_expectancy",
//       type: "number",
//     },
//     {
//       question:
//         "10.	How many joyful years would you like to share with your furry friend?",
//       key: "max_expectancy",
//       type: "number",
//     },
//   ];

//   //   const handleInputChange = (key, value) => {
//   //     setUserResponses((prevResponses) => ({ ...prevResponses, [key]: value }));
//   //   };
//   //   const handleSubmit = async () => {
//   //     console.log(userResponses);
//   //     try {
//   //       const response = await fetch("http://localhost:8000/api/predict/", {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({ userResponses }),
//   //       });

//   //       const data = await response.json();
//   //       console.log(data);
//   //       setRecommendedBreed(data.recommended_breed);
//   //     } catch (error) {
//   //       console.error("Error:", error);
//   //     }
//   //   };

//   // const handleSubmit = async () => {
//   //   console.log(userResponses);
//   //   try {
//   //     const response = await fetch("http://127.0.0.1:8000/api/predict/", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ user_responses: userResponses }),
//   //     });

//   //     const data = await response.json();
//   //     console.log(data);
//   //     setRecommendedBreed(data.recommended_breed);
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //   }
//   // };
//   const handleInputChange = (key, value) => {
//     setUserResponses((prevResponses) => ({
//       ...prevResponses,
//       [key]: value,
//     }));
//   };
//   console.log(userResponses);

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/api/predict/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user_responses: [userResponses] }),
//       });

//       const data = await response.json();
//       console.log(breed_desc[data.recommended_breed]);
//       setRecommendedBreed(data.recommended_breed);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 my-10">
//         <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
//           <h1 className="text-2xl font-semibold mb-4">Dog Breed Recommender</h1>
//           {sampleQuestions.map((question) => (
//             <div key={question.key} className="mb-4">
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 {question.question}
//               </label>
//               {question.type === "radio" ? (
//                 Object.entries(question.options).map(([key, value]) => (
//                   <div key={key} className="text-left">
//                     <input
//                       name={question.key}
//                       id={key}
//                       value={value}
//                       type="radio"
//                       onChange={(e) => handleInputChange(question.key, value)}
//                       className="border rounded-md px-3 py-2 w-full  text-black"
//                     />

//                     <label htmlFor={key} className="">
//                       {key}
//                     </label>
//                   </div>
//                 ))
//               ) : (
//                 <input
//                   type="number"
//                   onChange={(e) =>
//                     handleInputChange(question.key, parseFloat(e.target.value))
//                   }
//                   className="border rounded-md px-3 py-2 w-full"
//                 />
//               )}
//             </div>
//           ))}
//           <button
//             onClick={handleSubmit}
//             className=" text-black  px-4 py-2 rounded-md mt-4"
//           >
//             Submit
//           </button>
//           {recommendedBreed && (
//             <>
//               <p className="mt-4 text-green-700">
//                 Recommended Dog Breed: {recommendedBreed}
//               </p>
//               <p className="mt-4 text-green-700 text-justify">
//                 Description: {breed_desc[recommendedBreed]}
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default PetQuiz;
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
      question: "1. How would you describe your dog's temperament?",
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
      key: "min_height",
      type: "number",
    },
    {
      question: "2. Do you want a short dog or a tall dog?",
      key: "max_height",
      type: "number",
    },
    {
      question: "3. Do you want a lighter dog or a heavier dog?",
      key: "min_weight",
      type: "number",
    },
    {
      question: "3. Do you want a lighter dog or a heavier dog?",
      key: "max_weight",
      type: "number",
    },
    {
      question: "4. How trainable do you want your dog to be?",
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
      question: "5. How energetic would you like your dog to be?",
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
      question: "6. Can you deal with coat shedding?",
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
      question:
        "7.	What are the main reasons that you are choosing to get a dog?",
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
      question: "8.	Do you have children or guests frequently visiting?",
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
    {
      question: "9. How often can you groom your pet?",
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
      question:
        "10.	How many joyful years would you like to share with your furry friend?",
      key: "min_expectancy",
      type: "number",
    },
    {
      question:
        "10.	How many joyful years would you like to share with your furry friend?",
      key: "max_expectancy",
      type: "number",
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
    if (questionIndex < sampleQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
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

  const currentQuestion = sampleQuestions[questionIndex];

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 my-10">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-4">Dog Breed Recommender</h1>
          <div key={currentQuestion.key} className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {currentQuestion.question}
            </label>
            {currentQuestion.type === "radio" ? (
              Object.entries(currentQuestion.options).map(([key, value]) => (
                <div key={key} className="text-left">
                  <input
                    name={currentQuestion.key}
                    id={key}
                    value={value}
                    type="radio"
                    onChange={(e) =>
                      handleInputChange(currentQuestion.key, value)
                    }
                    className="border rounded-md px-3 py-2 w-full  text-black"
                  />
                  <label htmlFor={key} className="">
                    {key}
                  </label>
                </div>
              ))
            ) : (
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
            )}
          </div>
          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              className="text-black px-4 py-2 rounded-md mt-4"
              disabled={questionIndex === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              className="text-black px-4 py-2 rounded-md mt-4"
              disabled={questionIndex === sampleQuestions.length - 1}
            >
              Next
            </button>
          </div>
          {questionIndex === sampleQuestions.length - 1 && (
            <button
              onClick={handleSubmit}
              className="text-black px-4 py-2 rounded-md mt-4"
            >
              Submit
            </button>
          )}
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
