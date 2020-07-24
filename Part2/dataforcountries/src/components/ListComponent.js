import React, { useState } from "react";
import CountryComponent from "./CountryComponent";
import Button from "./Button";

const ListComponent = ({ name, capital, population, languages, flag }) => {
  const [infoDisplay, setInfoDisplay] = useState(false);

  const toggleDisplay = event => {
    setInfoDisplay(!infoDisplay);
  };

  return infoDisplay ? (
    <div>
      <Button onClick={toggleDisplay} label={infoDisplay ? "hide" : "show"} />
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
        <Button onClick={toggleDisplay} label={infoDisplay ? "hide" : "show"} />
      </p>
    </div>
  );
};

export default ListComponent;
