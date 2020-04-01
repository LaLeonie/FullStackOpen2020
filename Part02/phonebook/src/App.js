import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "07481 234 234" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = event => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };
    let equalName = persons.filter(
      p => p.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    equalName.length > 0
      ? window.alert(`${newPerson.name} is already added to phonebook`)
      : setPersons(persons.concat(newPerson));

    setNewName("");
    equalName = [];
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /> <br />
          number: <input calue={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => (
        <p key={p.name}>
          {p.name} {p.number}
        </p>
      ))}
    </div>
  );
};

export default App;
