import { useEffect, useReducer } from "react";
import PageNav from "../components/PageNav";
import Loader from "../components/Loader";
import Error from "../components/Error";
import StartQuiz from "../components/StartQuiz";
import Question from "../components/Question";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,

        status: "active",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      throw new Error("Action unknown");
  }
}
function Quiz() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div>
      <PageNav />
      <div>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartQuiz dispatch={dispatch} />}
        {status === "active" && <Question question={questions[index]} />}
      </div>
    </div>
  );
}

export default Quiz;
