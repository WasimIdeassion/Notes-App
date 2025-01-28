import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getNotes, addNote, updateNote, deleteNote} from '../../api/apiService';

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

// Async thunks for API calls
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const data = await getNotes();
  return data;
});

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (note: Note) => {
    const data = await addNote(note);
    return data;
  },
);

export const editNote = createAsyncThunk(
  'notes/editNote',
  async ({id, note}: {id: string; note: Note}) => {
    const data = await updateNote(id, note);
    return data;
  },
);

export const removeNote = createAsyncThunk(
  'notes/removeNote',
  async (id: string) => {
    await deleteNote(id);
    return id;
  },
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notes';
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          note => note.id === action.payload.id,
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
