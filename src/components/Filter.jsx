import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../redux/contactsSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

  const handleChange = (e) => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <div>
      Filter contacts by name:
      <input type="text" value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;
