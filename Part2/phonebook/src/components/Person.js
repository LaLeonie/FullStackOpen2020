import React from "react";

const Person = ({ name, number, id, onButtonClick }) => {
  return (
    <p>
      {name} {number}
      <button onClick={() => onButtonClick(name, id)}>Delete</button>
    </p>
  );
};

export default Person;
