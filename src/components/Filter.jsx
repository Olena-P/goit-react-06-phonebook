import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "./contactsSlice";

const Filter = ({ filter }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <div>
      Filter contacts by name:
      <input type="text" name="filter" value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;
