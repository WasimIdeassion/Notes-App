import {call, put, takeLatest} from 'redux-saga/effects';
import {
  fetchNotesRequest,
  fetchNotesSuccess,
  fetchNotesFailure,
  createNoteRequest,
  createNoteSuccess,
  createNoteFailure,
  editNoteRequest,
  editNoteSuccess,
  editNoteFailure,
  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteFailure,
} from '../slices/notesSlice';
import {getNotes, addNote, updateNote, deleteNote} from '../../api/apiService';

// Define the Note Type
interface Note {
  id: string;
  title: string;
  text: string;
  date: string;
}

// Define Generator Function Types
function* fetchNotesSaga(): Generator<any, void, Note[]> {
  try {
    const notes = (yield call(getNotes)) as Note[];
    yield put(fetchNotesSuccess(notes));
  } catch (error) {
    yield put(fetchNotesFailure((error as Error).message));
  }
}

function* createNoteSaga(action: {
  type: string;
  payload: Note;
}): Generator<any, void, Note> {
  try {
    const newNote = (yield call(addNote, action.payload)) as Note;
    yield put(createNoteSuccess(newNote));
  } catch (error) {
    yield put(createNoteFailure((error as Error).message));
  }
}

function* editNoteSaga(action: {
  type: string;
  payload: {id: string; note: Note};
}): Generator<any, void, Note> {
  try {
    const updatedNote = (yield call(
      updateNote,
      action.payload.id,
      action.payload.note,
    )) as Note;
    yield put(editNoteSuccess(updatedNote));
  } catch (error) {
    yield put(editNoteFailure((error as Error).message));
  }
}

function* deleteNoteSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, string> {
  try {
    yield call(deleteNote, action.payload);
    yield put(deleteNoteSuccess(action.payload));
  } catch (error) {
    yield put(deleteNoteFailure((error as Error).message));
  }
}

export default function* notesSaga() {
  yield takeLatest(fetchNotesRequest.type, fetchNotesSaga);
  yield takeLatest(createNoteRequest.type, createNoteSaga);
  yield takeLatest(editNoteRequest.type, editNoteSaga);
  yield takeLatest(deleteNoteRequest.type, deleteNoteSaga);
}
