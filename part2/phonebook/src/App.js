import { useState } from "react";
import AddContact from "./components/AddContact";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilter = (event) => {
    setFilterText(event.target.value);
    const newFilteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(newFilteredPersons);
    setFilteredPersons(newFilteredPersons);
  };

  const addContact = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name === newContact.name)) {
      window.alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(newContact));
    }
    setNewName("");
    setNewNumber("");
  };

  const personsToShow =
    filteredPersons.length === 0 ? persons : filteredPersons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterText={filterText} handleFilter={handleFilter} />

      <AddContact newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addContact={addContact}/>

      <Numbers personsToShow={personsToShow} />
    </div>
  );
};

export default App;
