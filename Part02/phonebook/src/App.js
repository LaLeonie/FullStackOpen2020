import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setnewFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

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

    setNewNumber("");
    setNewName("");
    equalName = [];
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setnewFilter(event.target.value);
  };

  const personsToShow =
    newFilter !== ""
      ? persons.filter(p =>
          p.name.toLowerCase().includes(newFilter.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} onInputChange={handleFilterChange} />

      <h2>Add a new persone</h2>
      <PersonForm
        onSubmitChange={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons list={personsToShow} />
    </div>
  );
};

export default App;
