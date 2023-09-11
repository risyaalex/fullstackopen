import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import CountriesList from './components/CountriesList';
import SearchForm from './components/SearchForm';
import Error from './components/Error';
import CountryInfo from './components/CountryInfo';

const apiKey = import.meta.env.VITE_API_KEY;


function App() {
  const [countries, setCountries] = useState([]);
  const [inputChange, setInputChange] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState([]);
  const [errorMessageWeather, setErrorMessageWeather] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
        setErrorMessage('')
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setErrorMessage('Error fetching data')
      });
  }, []);

  const changeEventHandler = (event) => {
    setInputChange(event.target.value)
    setSelectedCountry(null);
  }

  const countriesToShow = inputChange
    ? countries.filter((country) =>
        country.name.common && country.name.common.toLowerCase().startsWith(inputChange.toLowerCase())
      )
    : countries;
  
  const showCountryOnclick = (country) => {
    setSelectedCountry(country);
  }

  useEffect(() => {
  if (selectedCountry) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${apiKey}&units=metric`)

      .then(response => {
        setWeather(response.data);
        setErrorMessageWeather('')
      })
      .catch(error => {
        console.error('Error fetching data Weather API:', error);
        setErrorMessageWeather('Error fetching data Weather API')
      });
  }
}, [selectedCountry]);


 return (
  <div>
    <h1>Countries:</h1>
    <SearchForm value={inputChange} inputChange={changeEventHandler} />
     {errorMessage ? (<Error message={errorMessage} />) : ''}
     {countriesToShow.length > 10 ? (
         <Error message={"Too many matches, specify another filter"} />
       ) : selectedCountry ? (
         <CountryInfo country={selectedCountry} errorMessageWeather={errorMessageWeather} weather={weather} />
      ) : (countries.length >0 && countriesToShow.length === 0) ? (
         <Error message={"No matches, specify another filter"} />
      ) : (
        <CountriesList countries={countriesToShow} onClick={showCountryOnclick} />
       )
     }
  </div>
);

}

export default App
