import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => {
  return <button onClick={props.onClickEvent}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalSum = good + neutral + bad;
  const weighedTotal = good * 1 + neutral * 0 + bad * -1;

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClickEvent={() => setGood(good + 1)} text="good"></Button>
      <Button
        onClickEvent={() => setNeutral(neutral + 1)}
        text="neutral"
      ></Button>
      <Button onClickEvent={() => setBad(bad + 1)} text="bad"></Button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {totalSum}</p>
      <p>average {totalSum === 0 ? 0 : weighedTotal / totalSum}</p>
      <p>positive {totalSum === 0 ? 0 : (good / totalSum) * 100 + "%"}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
