import React from "react";

const PersonForm = (props) => (
  <form onSubmit={props.onSubmitChange}>
    <div>
      name: <input value={props.nameValue} onChange={props.onNameChange} />{" "}
      <br />
      number:{" "}
      <input value={props.numberValue} onChange={props.onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
