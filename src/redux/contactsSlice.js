import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addContactAsync = createAsyncThunk(
  'contacts/addContactAsync',
  async (newContact, { getState, rejectWithValue }) => {
    const { contacts } = getState().contacts;
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return rejectWithValue('Contact already exists');
    }
    return newContact;
  }
);

const initialState = {
  contacts: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(addContactAsync.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const { deleteContact, updateFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
