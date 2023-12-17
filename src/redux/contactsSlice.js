import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  contacts: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      const existingContact = state.contacts.find(
        contact => contact.name.toLowerCase() === payload.name.toLowerCase()
      );

      if (existingContact) {
        return;
      }

      state.contacts.push({ ...payload, id: nanoid() });
    },
    deleteContact: (state, action) => {
      const contactIdToDelete = action.payload;
      state.contacts = state.contacts.filter(
        contact => contact.id !== contactIdToDelete
      );
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { deleteContact, updateFilter, addContact } =
  contactsSlice.actions;

export default contactsSlice.reducer;
