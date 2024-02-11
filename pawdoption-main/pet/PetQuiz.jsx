import React, { useState } from "react";
import "tailwindcss/tailwind.css";

function App() {
  const [userResponses, setUserResponses] = useState({});
  const [recommendedBreed, setRecommendedBreed] = useState(null);

  const sampleQuestions = [
    {
      question: "How would you describe your dog's temperament?",
      key: "temperament",
      type: "text",
    },
    {
      question: "On a scale of 1 to 5, how popular should the breed be?",
      key: "popularity",
      type: "number",
    },
    {
      question: "What is the minimum height (in inches) for the breed?",
      key: "min_height",
      type: "number",
    },
    {
      question: "What is the maximum height (in inches) for the breed?",
      key: "max_height",
      type: "number",
    },
    {
      question: "What is the minimum weight (in pounds) for the breed?",
      key: "min_weight",
      type: "number",
    },
    {
      question: "What is the maximum weight (in pounds) for the breed?",
      key: "max_weight",
      type: "number",
    },
    {
      question: "What is the minimum life expectancy (in years) for the breed?",
      key: "min_expectancy",
      type: "number",
    },
    {
      question: "What is the maximum life expectancy (in years) for the breed?",
      key: "max_expectancy",
      type: "number",
    },
    {
      question: "Which group does the breed belong to?",
      key: "group",
      type: "text",
    },
    {
      question: "On a scale of 1 to 5, how often should the breed be groomed?",
      key: "grooming_frequency_value",
      type: "number",
    },
    {
      question: "How would you categorize the grooming frequency?",
      key: "grooming_frequency_category",
      type: "text",
    },
    {
      question: "On a scale of 1 to 5, how much does the breed shed?",
      key: "shedding_value",
      type: "number",
    },
    {
      question: "How would you categorize the shedding?",
      key: "shedding_category",
      type: "text",
    },
    {
      question: "On a scale of 1 to 5, how energetic is the breed?",
      key: "energy_level_value",
      type: "number",
    },
    {
      question: "How would you categorize the energy level?",
      key: "energy_level_category",
      type: "text",
    },
    {
      question: "On a scale of 1 to 5, how trainable is the breed?",
      key: "trainability_value",
      type: "number",
    },
    {
      question: "How would you categorize the trainability?",
      key: "trainability_category",
      type: "text",
    },
    {
      question: "On a scale of 1 to 5, what is the demeanor of the breed?",
      key: "demeanor_value",
      type: "number",
    },
    {
      question: "How would you categorize the demeanor?",
      key: "demeanor_category",
      type: "text",
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
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_responses: userResponses }),
      });

      const data = await response.json();
      setRecommendedBreed(data.recommended_breed);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Dog Breed Recommender</h1>
        {sampleQuestions.map((question) => (
          <div key={question.key} className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {question.question}
            </label>
            {question.type === "text" ? (
              <input
                type="text"
                onChange={(e) =>
                  handleInputChange(question.key, e.target.value)
                }
                className="border rounded-md px-3 py-2 w-full"
              />
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
          <p className="mt-4 text-green-700">
            Recommended Dog Breed: {recommendedBreed}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
// import React, { useState } from "react";
// import "tailwindcss/tailwind.css";

// function App() {
//   const [userResponses, setUserResponses] = useState([]);
//   const [recommendedBreed, setRecommendedBreed] = useState(null);

//   const sampleQuestions = [
//     {
//       question: "How would you describe your dog's temperament?",
//       key: "temperament",
//       type: "text",
//     },
//     {
//       question: "On a scale of 1 to 5, how popular should the breed be?",
//       key: "popularity",
//       type: "number",
//     },
//     // Add more questions as needed
//   ];

//   //   const handleInputChange = (key, value) => {
//   //     setUserResponses((prevResponses) => [{...prevResponses},  [key]: value ]);
//   //   };
//   const handleInputChange = (key, value) => {
//     setUserResponses((prevResponses) => {
//       const updatedResponses = { ...prevResponses[0], [key]: value };
//       return [updatedResponses];
//     });
//   };

//   const handleSubmit = async () => {
//     console.log(userResponses);
//     try {
//       const response = await fetch("http://localhost:8000/api/predict/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user_responses: userResponses }),
//       });

//       const data = await response.json();
//       console.log(data);
//       setRecommendedBreed(data.recommended_breed);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
//         <h1 className="text-2xl font-semibold mb-4">Dog Breed Recommender</h1>
//         {sampleQuestions.map((question) => (
//           <div key={question.key} className="mb-4">
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               {question.question}
//             </label>
//             {question.type === "text" ? (
//               <input
//                 type="text"
//                 onChange={(e) =>
//                   handleInputChange(question.key, e.target.value)
//                 }
//                 className="border rounded-md px-3 py-2 w-full"
//               />
//             ) : (
//               <input
//                 type="number"
//                 onChange={(e) =>
//                   handleInputChange(question.key, parseInt(e.target.value))
//                 }
//                 className="border rounded-md px-3 py-2 w-full"
//               />
//             )}
//           </div>
//         ))}
//         <button
//           onClick={handleSubmit}
//           className=" text-black px-4 py-2 rounded-md mt-4"
//         >
//           Submit
//         </button>
//         {recommendedBreed && (
//           <p className="mt-4 text-green-700">
//             Recommended Dog Breed: {recommendedBreed}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
