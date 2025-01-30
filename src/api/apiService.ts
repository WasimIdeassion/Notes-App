import axios from 'axios';

const BASE_URL = 'http://192.168.0.110:3000';

export const getNotes = async () => {
  const response = await axios.get(`${BASE_URL}/notes`);
  return response.data;
};

export const addNote = async (note: any) => {
  const response = await axios.post(`${BASE_URL}/notes`, note);
  return response.data;
};

export const updateNote = async (noteId: string, updatedNote: any) => {
  const response = await axios.put(`${BASE_URL}/notes/${noteId}`, updatedNote);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  await axios.delete(`${BASE_URL}/notes/${noteId}`);
  return noteId;
};
