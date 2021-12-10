const Number = ({person, key}) => {
    return (
        <p key={key}>{person.name} {person.number}</p>
    )
}

export default Number