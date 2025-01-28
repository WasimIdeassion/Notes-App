import {configureStore} from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer, // Register the notes slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
