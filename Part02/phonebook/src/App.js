import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = event => {
    event.preventDefault();
    const newPerson = {
      name: newName
    };
    let equalName = persons.filter(p => p.name === newPerson.name);
    equalName.length > 0
      ? window.alert(`${newPerson.name} is already added to phonebook`)
      : setPersons(persons.concat(newPerson));

    setNewName("");
    equalName = [];
  };

  const handleInputChange = event => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => (
        <p key={p.name}>{p.name}</p>
      ))}
    </div>
  );
};

export default App;
