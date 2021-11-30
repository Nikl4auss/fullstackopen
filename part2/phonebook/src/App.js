import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "11111111" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const addContact = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newContact.name)) {
      window.alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(newContact));
    }
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <label htmlFor="name">
          Name:
          <input id="name" value={newName} onChange={handleNameChange} />
        </label>
        <label htmlFor="number">
          Number:
          <input id="number" value={newNumber} onChange={handleNumberChange} />
        </label>
        <button>add contact</button>
      </form>

      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
