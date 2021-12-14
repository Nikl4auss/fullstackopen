import { useState, useEffect } from "react"
import axios from 'axios'
const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filterText, setFilterText] = useState("")

  const handleTextChange = (event) => {
    const newFilterText = event.target.value
    
    setFilterText(newFilterText)

    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(newFilterText.toLowerCase())))

  }
  
  useEffect( () => {
    const fetchData = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all")
      setCountries(response.data)
    }

    fetchData()
  }, [])


  return (
    <>
      <div>
        <label htmlFor="filter">
          find countries {" "} 
          <input id="filter" type="text" value={filterText} onChange={handleTextChange}/>
        </label>
      </div>
      <div>
        {filteredCountries.length > 1 
        ? <p>Too many matches, specify another filter</p> 
        : filteredCountries.map(country => {
          return (
            <div>
              <p><strong>{country.name.common}</strong></p>
              <p>capital {country.capital[0]}</p>
              <p>population {country.population}</p>
              <p><strong>languages</strong></p>
              <ul>
                {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
              </ul>
              <img src={country.flags.png} alt="country flag" />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App