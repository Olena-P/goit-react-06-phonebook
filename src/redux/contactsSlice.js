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
      // Просто додаємо контакт, без перевірки
      state.contacts.push({ ...payload, id: nanoid() });
    },
    deleteContact: (state, action) => {
      // Видалення контакту
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    updateFilter: (state, action) => {
      // Оновлення фільтру
      state.filter = action.payload;
    },
  },
});

export const { deleteContact, updateFilter, addContact } =
  contactsSlice.actions;

export default contactsSlice.reducer;
