import { useState, useEffect } from "react";
import AddContact from "./components/AddContact";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import personsServices from "./services/persons"
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationID, setNotificationID] = useState(null)
  const [notificationClass, setNotificationClass] = useState(null)
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

  const addContact = () => {
    const newContact = {
      name: newName,
      number: newNumber,
    };

      personsServices
      .add(newContact)
      .then(returnContact => {
        setPersons(persons.concat(returnContact))
        if(notificationID !== null){
          clearTimeout(notificationID)
        }
        setNotificationMessage(`Added ${returnContact.name} to the contact list`)
        setNotificationClass("success")
        setNotificationID(setTimeout(() => {
          setNotificationMessage(null)
          setNotificationID(null)
          setNotificationClass(null)
        }, 5000))
        setNewName("");
        setNewNumber("");
    })
        
  };

  const updateContact = (contactToUpdate) => {
    const updatedContact = {
      ...contactToUpdate,
      number: newNumber
    }

    personsServices
    .update(updatedContact, contactToUpdate.id)
    .then(response => {
      setPersons(persons.map(contact => contact.id !== contactToUpdate.id ? contact : response))
    })
    .catch(error => {
      if(notificationID !== null){
        clearTimeout(notificationID)
      }
      setNotificationMessage(`El contacto ${contactToUpdate.name} ya ha sido borrado`)
      setNotificationClass("error")
      setNotificationID(setTimeout(() => {
        setNotificationMessage(null)
        setNotificationID(null)
        setNotificationClass(null)
      }, 5000))
      setPersons(persons.filter(contact => contact.id !== contactToUpdate.id))
    })
  }

  const removeContact = (name, id) => {
    if(window.confirm(`You want to delete ${name}?`)){
      personsServices
      .remove(id)
      .then(result =>
        {
        personsServices
        .getAll()
        .then(returnedPersons => setPersons(returnedPersons)) 
        window.alert('Contact Deleted')
        }
        )
    }
  }

  const handleNewContacts = (event) => {
    event.preventDefault()
    const contactToUpdate = persons.find(person => person.name === newName)
    if(contactToUpdate){
      if(window.confirm(`${contactToUpdate.name} is already on your phonebook, you want to update the old number with this new one?`)){
        updateContact(contactToUpdate)
      }
      else{
        window.alert("Update aborted")
      }
    }
    else {
      addContact()
    }
  }

  const personsToShow =
    filteredPersons.length === 0 ? persons : filteredPersons;


  useEffect( () => {
    personsServices
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
    .catch(error => console.log("fail", error))
  }, [])
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} notificationClass={notificationClass} />
      <Filter filterText={filterText} handleFilter={handleFilter} />

      <AddContact newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleNewContacts={handleNewContacts}/>

      <Numbers personsToShow={personsToShow} removeContact={removeContact}/>
    </div>
  );
};

export default App;
