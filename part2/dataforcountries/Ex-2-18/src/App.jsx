import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import CountriesList from './components/CountriesList';
import SearchForm from './components/SearchForm';
import Error from './components/Error';
import CountryInfo from './components/CountryInfo';

function App() {
  const [countries, setCountries] = useState([]);
  const [inputChange, setinputChange] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

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
    setinputChange(event.target.value)
  }

    const countriesToShow = inputChange
    ? countries.filter((country) =>
        country.name.common && country.name.common.toLowerCase().startsWith(inputChange.toLowerCase())
      )
    : countries;


 return (
  <div>
    <h1>Countries:</h1>
    <SearchForm value={inputChange} inputChange={changeEventHandler} />
     {errorMessage ? (<Error message={errorMessage} />) : ''}
     {countriesToShow.length > 10 ? (
         <Error message={"Too many matches, specify another filter"} />
      ) : countriesToShow.length === 1 ? (
         <CountryInfo country={countriesToShow[0]} />
      ) : (countries.length >0 && countriesToShow.length === 0) ? (
         <Error message={"No matches, specify another filter"} />
      ) : (
        <CountriesList countries={countriesToShow} />
       )
     }
  </div>
);

}

export default App
