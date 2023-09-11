const Weather = ({ weatherArr }) => {
  if (!weatherArr || !weatherArr.weather || !weatherArr.weather[0]) {
    return <div>Loading weather data...</div>;
  }

  const { name, main, weather } = weatherArr;

  return (
    <div className="weather">
      <h4>Weather in {name}</h4>
      <div className="weathericon">
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].main}
          title={weather[0].description}
              />
        </div>
        <p>{weather[0].main}</p>
        <h2>{Math.round(main.temp)}°C</h2>
        <p>Feels like: {Math.round(main.feels_like)}°C</p>
        <p>Humidity: {main.humidity} %</p>   
      
    </div>
  );
};

export default Weather;
