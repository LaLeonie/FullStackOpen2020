import React from "react";
import Person from "./Person";

const Persons = ({ list, onButtonClick }) => {
  return (
    <div>
      {list.map(p => (
        <Person
          key={p.name}
          name={p.name}
          number={p.number}
          id={p.id}
          onButtonClick={onButtonClick}
        />
      ))}
    </div>
  );
};

export default Persons;
