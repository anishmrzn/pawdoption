function Options({ question }) {
  return (
    <div>
      {question.options.map((option) => (
        <button className="button flex flex-col mt-5" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}
export default Options;
