import {createSlice, createAction} from '@reduxjs/toolkit';

type Note = {
  id: string;
  title: string;
  text: string;
  date: string;
};

type NotesState = {
  notes: Note[];
  loading: boolean;
  error: string | null;
};

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    fetchNotesRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchNotesSuccess: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    fetchNotesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createNoteRequest: state => {
      state.loading = true;
    },
    createNoteSuccess: (state, action) => {
      state.loading = false;
      state.notes.push(action.payload);
    },
    createNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    editNoteRequest: state => {
      state.loading = true;
    },
    editNoteSuccess: (state, action) => {
      state.loading = false;
      const index = state.notes.findIndex(
        note => note.id === action.payload.id,
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    editNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteNoteRequest: state => {
      state.loading = true;
    },
    deleteNoteSuccess: (state, action) => {
      state.loading = false;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    deleteNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Define correct payload types
export const createNoteRequest = createAction<Note>('notes/createNoteRequest');
export const editNoteRequest = createAction<{id: string; note: Note}>(
  'notes/editNoteRequest',
);

export const {
  fetchNotesRequest,
  fetchNotesSuccess,
  fetchNotesFailure,
  // createNoteRequest,
  createNoteSuccess,
  createNoteFailure,
  // editNoteRequest,
  editNoteSuccess,
  editNoteFailure,
  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteFailure,
} = notesSlice.actions;

export default notesSlice.reducer;
