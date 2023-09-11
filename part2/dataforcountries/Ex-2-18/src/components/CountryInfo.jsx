const CountryInfo = ({ country }) => {
  if (!country) {
    return <div>No data available</div>;
  }

  console.log(country)

  return (
    <div className="countryInfo">
      <h2>{country[0].name.common}</h2>
      <h3>(Official name: {country[0].name.official})</h3>
      <div className="flag"><img src={country[0].flags.svg}/> </div>
      <p>Region: {country[0].region}</p>
      <p>Capital: {country[0].capital}</p>
      <p>Area: {country[0].area}</p>
      <p>Population: {country[0].population}</p>
      <div className="block">
        <h4>Languages:</h4>
        <ul>
          {Object.keys(country[0].languages).map((lang) => (
            <li key={lang}>
              {country[0].languages[lang]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CountryInfo;
