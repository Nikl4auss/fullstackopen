import axios from "axios";
import { useState, useEffect } from "react";
import AddContact from "./components/AddContact";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
const App = () => {
  const [persons, setPersons] = useState([]);
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


  useEffect(async () => {
    const response = await axios.get("http://localhost:3001/persons")
    setPersons(response.data)
  }, [])
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
