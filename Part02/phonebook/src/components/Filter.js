import React from "react";

const Filter = ({ newFilter, onInputChange }) => (
  <p>
    filter shown with <input value={newFilter} onChange={onInputChange} />
  </p>
);

export default Filter;
