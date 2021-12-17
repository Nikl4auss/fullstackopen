import Country from "./Country"

const Countries = ({countries}) => {
    return (
        <>
            {countries.map(country => <Country showButton={true} country={country} />)}
        </>
    )
}

export default Countries