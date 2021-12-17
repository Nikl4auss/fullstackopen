import { useState, useEffect } from "react"
import axios from 'axios'
import Countries from "./components/Countries"
import Country from "./components/Country"
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
        {filteredCountries.length === 0
        ? null 
        : filteredCountries.length > 10 
        ? <p>Too many matches, specify another filter</p> 
        : filteredCountries.length > 1
        ? <Countries countries={filteredCountries}/>
        : <Country showButton={false} country={filteredCountries[0]} />
        }
      </div>
    </>
  )
}

export default App