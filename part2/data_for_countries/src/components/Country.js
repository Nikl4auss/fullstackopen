import axios from "axios"
import { useState, useEffect } from "react"
const api_key = process.env.REACT_APP_API_KEY

const Country = ({showButton, country}) => {
    
    const [show, setShow] = useState(!showButton)
    const [weather, setWeather] = useState({})
useEffect(() => {
    const fetchData = async () => {
        console.log(api_key)
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
        console.log(response.data)
        setWeather(response.data)
    }
    fetchData()
}, [])
    return (
        <div>
            {!show 
            ? <><p>{country.name.common}</p> 
            <button onClick={() => setShow(!show)}>show</button>
            </>
            : (
                <>
                    <h1>{country.name.common}</h1>
                    <p>capital {country.capital}</p>
                    <p>population {country.population}</p>
                    <h2>languagues</h2>
                    <ul>
                        {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
                    </ul>
                    <img src={country.flags.png} alt="country flag" />
                    <br />
                    {weather.main
                    ? (
                        <>
                            <h2>Wather in {country.capital}</h2>
                            <p><strong>temperature:</strong> {weather.main.temp} celcius</p>
                            <p><strong>Wind:</strong> {weather.wind.speed} mph</p>
                            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                        </>
                    )
                    : <p>Weather not avaible for this country</p>
                }
                    {showButton 
                    ? <button onClick={() => setShow(!show)}>hide</button>
                    : null
                }
                </>
            )
            }
        </div>    
    )
}

export default Country