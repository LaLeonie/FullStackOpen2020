import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setnewFilter] = useState("");
  const [newNotification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data);
      })
      .catch(error => displayMessage("there has been an error", "error"));
  }, []);

  const resetInputFields = () => {
    setNewNumber("");
    setNewName("");
  };

  const displayMessage = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const updatePerson = (oldPerson, newPerson) => {
    const answer = window.confirm(
      `${oldPerson.name} is already added to phonebook, replace the older number with a new one?`
    );
    if (answer) {
      personService.update(oldPerson.id, newPerson).then(response => {
        setPersons(persons.map(p => (p.id !== oldPerson.id ? p : response)));
        resetInputFields();
        displayMessage(`Number for ${oldPerson.name} was changed`, "success");
      });
    } else {
      resetInputFields();
    }
  };

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
      ? updatePerson(equalName[0], newPerson)
      : personService.create(newPerson).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          resetInputFields();
          displayMessage(
            `${returnedPerson.name} was added to the Phonebook`,
            "success"
          );
        });
  };

  const onButtonClick = (name, id) => {
    personService
      .deletePerson(id)
      .then(data => {
        const answer = window.confirm(`Delete ${name}?`);
        if (answer) {
          setPersons(persons.filter(p => p.id !== id));
          displayMessage(`${name} has been deleted`, "success");
        } else {
          setPersons(persons);
        }
      })
      .catch(error => {
        displayMessage(`${name} has already been deleted`, "error");
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
      <Notification notificationObject={newNotification} />
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
