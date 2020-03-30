import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => {
  return <button onClick={props.onClickEvent}>{props.label}</button>;
};

const App = props => {
  const quotesArrLength = anecdotes.length;
  const votesArrOriginal = Array.apply(null, new Array(quotesArrLength)).map(
    Number.prototype.valueOf,
    0
  );
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(votesArrOriginal);
  const highestVote = Math.max(...votes);

  const randomSelect = () => {
    const max = quotesArrLength - 1;
    setSelected(Math.floor(Math.random() * max) + 0);
  };

  const addVote = num => {
    const copy = [...votes];
    copy[num] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <h1>Anecodte of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <p>has {votes[selected]} votes</p>
      <Button onClickEvent={() => addVote(selected)} label="vote" />
      <Button onClickEvent={randomSelect} label="next anecdote" />
      <h1>Anecodte with most votes</h1>
      {votes.every(el => el === 0) ? (
        <div>Not votes given yet</div>
      ) : (
        <div>{props.anecdotes[votes.indexOf(highestVote)]}</div>
      )}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
