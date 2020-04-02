import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryComponent = props => {
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
    </div>
  );
};

const ListComponent = ({ name, capital, population, languages, flag }) => {
  const [infoDisplay, setInfoDisplay] = useState(false);

  const toggleDisplay = event => {
    setInfoDisplay(!infoDisplay);
  };

  return infoDisplay ? (
    <div>
      <button onClick={toggleDisplay}>{infoDisplay ? "hide" : "show"}</button>
      <CountryComponent
        name={name}
        capital={capital}
        population={population}
        languages={languages}
        flag={flag}
      />
    </div>
  ) : (
    <div>
      <p>
        {name}{" "}
        <button onClick={toggleDisplay}>{infoDisplay ? "hide" : "show"}</button>
      </p>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data));
  }, []);

  const onFilterInputHandler = event => {
    setFilter(event.target.value);
  };

  const filteredList = countries.filter(country => {
    return country.name.toLowerCase().includes(filter.toLowerCase());
  });

  const countryDisplay =
    filteredList.length > 10 ? (
      "To many matches, specify another filter"
    ) : filteredList.length === 1 ? (
      <CountryComponent
        name={filteredList[0].name}
        capital={filteredList[0].capital}
        population={filteredList[0].population}
        languages={filteredList[0].languages}
        flag={filteredList[0].flag}
      />
    ) : (
      filteredList.map(c => (
        <ListComponent
          key={c.name}
          name={c.name}
          capital={c.capital}
          population={c.population}
          languages={c.languages}
          flag={c.flag}
        />
      ))
    );

  return (
    <div>
      <p>
        find countries <input value={filter} onChange={onFilterInputHandler} />
      </p>
      <div>{countryDisplay}</div>
    </div>
  );
};

export default App;
