import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => {
  return <button onClick={props.onClickEvent}>{props.text}</button>;
};

const Statistic = props => {
  return (
    <tr>
      <td>{props.label}</td>
      <td>{props.score}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const totalSum = good + neutral + bad;
  const weighedTotal = good * 1 + neutral * 0 + bad * -1;

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic label="good" score={good} />
          <Statistic label="neutral" score={neutral} />
          <Statistic label="bad" score={bad} />
          <Statistic label="all" score={totalSum} />
          <Statistic
            label="average"
            score={totalSum === 0 ? 0 : weighedTotal / totalSum}
          />
          <Statistic
            label="positive"
            score={totalSum === 0 ? 0 : (good / totalSum) * 100 + "%"}
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClickEvent={() => setGood(good + 1)} text="good"></Button>
      <Button
        onClickEvent={() => setNeutral(neutral + 1)}
        text="neutral"
      ></Button>
      <Button onClickEvent={() => setBad(bad + 1)} text="bad"></Button>
      <div>
        {good === 0 && neutral === 0 && bad === 0 ? (
          "No feedback given"
        ) : (
          <Statistics good={good} neutral={neutral} bad={bad} />
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
