const Number = ({person, key, removeContact}) => {
    return (
        <>
        <p key={key}>{person.name} {person.number}</p>
        <button onClick={() => removeContact(person.name, person.id)}>delete</button>
        </>
    )
}

export default Number