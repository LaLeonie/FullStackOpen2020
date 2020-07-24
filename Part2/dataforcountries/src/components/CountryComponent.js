import React, { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const CountryComponent = props => {
  const [weatherInfo, setWeatherInfo] = useState({});
  const URL = `http://api.weatherstack.com/current?access_key=${api_key}&query=${props.capital}`;

  useEffect(() => {
    axios.get(URL).then(response => {
      setWeatherInfo(response.data.current);
    });
  }, [URL]);

  return (
    <div>
      <h1>{props.name}</h1>
      <p>capital {props.capital}</p>
      <p>population {props.population}</p>
      <h2>languages</h2>
      <ul>
        {props.languages.map(lang => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={props.flag} alt={`${props.name} flag`} />
      <h2>Weather in {props.capital}</h2>
      <p>temperature: {weatherInfo.temperature} Celsius</p>
      <img src={weatherInfo.weather_icons} alt="weather icon" />
      <p>
        wind: {weatherInfo.wind_speed} mph, direction {weatherInfo.wind_dir}
      </p>
    </div>
  );
};

export default CountryComponent;
