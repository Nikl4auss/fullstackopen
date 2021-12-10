import Number from "./Number"

const Numbers = ({personsToShow}) => {
    return (
        <>
        <h2>Numbers</h2>
        {personsToShow.map((person, i) => (
            <Number person={person} key={i}/>
        ))}
        </>
    )
}

export default Numbers