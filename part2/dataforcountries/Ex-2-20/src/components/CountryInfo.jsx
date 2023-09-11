import Weather from "./Weather";
import Error from "./Error";

const CountryInfo = ({ country, errorMessageWeather, weather}) => {
  if (!country) {
    return <div>No data available</div>;
  }

  return (
    <div className="countryInfo">
      <h2>{country.name.common}</h2>
      <h3>(Official name: {country.name.official})</h3>
      <div className="flag"><img src={country.flags.svg}/> </div>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>
      <div className="block">
        <h4>Languages:</h4>
        <ul>
          {Object.keys(country.languages).map((lang) => (
            <li key={lang}>
              {country.languages[lang]}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {errorMessageWeather ? (<Error message={errorMessageWeather} />) : (<Weather weatherArr={weather} />)}
      </div>
    </div>
  );
}

export default CountryInfo;
