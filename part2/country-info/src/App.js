import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';


const Search = ({ newSearch, handleSearch }) =>
  <div>Search: <input value={newSearch} onChange={handleSearch} /></div>

const RenderWeather = ({ capital }) => {
  //key from https://weatherstack.com/dashboard
  const apiKey = process.env.REACT_APP_API_KEY
  const request = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`
  const [weather, setWeather] = useState([])
  const hook = () => {
    axios.get(request).then(response => { setWeather(response.data.current) })
  }
  useEffect(hook, [])
  console.log(Object.keys(weather))
  return (
    <div>
      <div><b>temperature:</b> {weather.temperature}</div>
      <img src={weather.weather_icons} alt='weather icon' />
      <div><b>wind:</b> {weather.wind_speed}</div>
    </div>
  )
}


const Render10 = ({ filteredList, setNewSearch }) =>
  filteredList.map(country =>
    <div key={country.name}>
      {country.name}
      <button onClick={() => setNewSearch(country.name)}> Show </button>
    </div>)



const Render1 = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div><b>Capital: </b>{country.capital}</div>
      <div><b>Population: </b>{country.population}</div>

      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>

      <img src={country.flag} alt={`Flag of ${country.name}`} style={{ width: 250, height: 140 }} />

      <h3>Weather in {country.capital}</h3>
      <RenderWeather capital={country.capital} />
    </div>
  )
}


const RenderMaster = ({ filteredList, setNewSearch }) => {
  if (filteredList.length === 1) {
    return (<Render1 country={filteredList[0]} />)
  }
  else if (filteredList.length < 10) {
    return (<Render10 filteredList={filteredList} setNewSearch={setNewSearch} />)
  }
  return (<div>Too many matches</div>)
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => { setCountries(response.data) })
  }
  useEffect(hook, [])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }


  const filteredList = newSearch === '' ? [] : countries.filter(country =>
    country.name.toLowerCase().includes(newSearch.toLowerCase()))


  return (
    <div>
      <Search newSearch={newSearch} handleSearch={handleSearch} />
      <RenderMaster filteredList={filteredList} setNewSearch={setNewSearch} />
    </div>
  )
}

export default App;
