import Button from "./Button"

const CountriesList = ({ countries, onClick }) => {
    return (
            <div className='countriesList'>
                {countries.map((country) => (
                    <p key={country.ccn3}>{country.name.common}  <Button text="Show" onClick={() => onClick(country)} /></p>
                ))}
            </div>
            )
}

export default CountriesList