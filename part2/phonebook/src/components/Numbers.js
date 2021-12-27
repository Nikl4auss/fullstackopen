import Number from "./Number"

const Numbers = ({personsToShow, removeContact}) => {
    return (
        <>
        <h2>Numbers</h2>
        {personsToShow.map((person, i) => (
            <Number person={person} key={i} removeContact={removeContact}/>
        ))}
        </>
    )
}

export default Numbers