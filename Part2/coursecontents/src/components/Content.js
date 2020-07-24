import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
      <p>
        total of{" "}
        {parts.reduce((total, cur) => {
          return total + cur.exercises;
        }, 0)}{" "}
        exercises
      </p>
    </div>
  );
};

export default Content;
