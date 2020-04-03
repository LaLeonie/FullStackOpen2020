import React, { useState, useEffect } from "react";
// import axios from "axios";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setnewFilter] = useState("");

  useEffect(() => {
    console.log(personService.getAll());
    personService.getAll().then(data => {
      setPersons(data);
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
      : personService.create(newPerson).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewNumber("");
          setNewName("");
          equalName = [];
        });
  };

  const onButtonClick = (name, id) => {
    personService.deletePerson(id).then(data => {
      const answer = window.confirm(`Delete ${name}?`);
      if (answer) {
        setPersons(persons.filter(p => p.id !== id));
      } else {
        setPersons(persons);
      }
    });
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

      <h2>Add a new person</h2>
      <PersonForm
        onSubmitChange={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons list={personsToShow} onButtonClick={onButtonClick} />
    </div>
  );
};

export default App;
