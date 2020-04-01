import React from "react";
import Person from "./Person";

const Persons = ({ list }) => {
  return (
    <div>
      {list.map(p => (
        <Person key={p.name} name={p.name} number={p.number} />
      ))}
    </div>
  );
};

export default Persons;
