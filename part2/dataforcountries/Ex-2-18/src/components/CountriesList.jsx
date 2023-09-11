const CountriesList = ({ countries, setErrorMessage  }) => {
    return (
            <div className='countriesList'>
                {countries.map((country) => (
                    <div key={country.ccn3}>{country.name.common}</div>
                ))}
            </div>
            )
}

export default CountriesList