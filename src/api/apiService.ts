import axios from 'axios';

const BASE_URL = 'http://192.168.0.110:3000';

export const getNotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/notes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const getNoteById = async (noteId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching note by ID:', error);
    throw error;
  }
};

export const addNote = async (note: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/notes`, {
      ...note, // Include all note properties
    });
    return response.data;
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};

export const updateNote = async (noteId: string, updatedNote: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/notes/${noteId}`, {
      ...updatedNote, // Include all updated properties
    });
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};
