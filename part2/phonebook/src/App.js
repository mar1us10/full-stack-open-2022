import { useState, useEffect } from "react";
import InputField from "./components/InputField";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    const filteredPeople = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFilteredPersons(filteredPeople);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const currentPerson = persons.some(
      (person) =>
        person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );

    if (currentPerson) {
      const person = persons.find(
        (p) => p.name.trim().toLowerCase() === newName.trim().toLowerCase()
      );
      const updatedPerson = { ...person, number: newNumber };
      const { id } = person;

      const validateUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (validateUpdate) {
        personService
          .update(id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
            setMessage(`${person.name}'s number has been updated`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${person.name} has already been removed from server`
            );
            setPersons(persons.filter((p) => p.id !== id));
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });
      }

      setNewName("");
      setNewNumber("");
      return;
    }

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);

        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    const validateDelete = window.confirm(`Delete ${person.name}?`);
    if (validateDelete) {
      personService.remove(id).then(() => {
        const filteredPersons = persons.filter((person) => person.id !== id);
        setPersons(filteredPersons);
        setMessage(`Deleted ${person.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);

        setFilter("");
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={message} />
      <Error error={errorMessage} />
      <InputField
        label="filter shown with "
        htmlFor="filter"
        type="text"
        value={filter}
        onChange={handleFilter}
      />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <PersonList
        filter={filter}
        persons={persons}
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
