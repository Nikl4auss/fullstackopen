import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addContact = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
    };

    setPersons(persons.concat(newContact));
    setNewName("");
  };
  const handleNameChange = (event) => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <label htmlFor="name">
          Name:
          <input id="name" value={newName} onChange={handleNameChange} />
        </label>
        <button>add contact</button>
      </form>

      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <p key={i}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
