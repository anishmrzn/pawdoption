function StartQuiz({ dispatch }) {
  return (
    <div>
      <h1>Let's See which pet is Best for you</h1>
      <button onClick={() => dispatch({ type: "start" })}>Start</button>
    </div>
  );
}

export default StartQuiz;
