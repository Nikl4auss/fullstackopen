const AddContact = ({newName, handleNameChange, newNumber, handleNumberChange, addContact}) => {
    return (
        <>
        <h2>Add a new Contact</h2>
        <form onSubmit={addContact}>
            <label htmlFor="name">
                Name:
                <input id="name" value={newName} onChange={handleNameChange} />
            </label>
            <br />
            <br />
            <label htmlFor="number">
                Number:
                <input id="number" value={newNumber} onChange={handleNumberChange} />
            </label>
            <button>add contact</button>
        </form>
      </>
    )
}

export default AddContact