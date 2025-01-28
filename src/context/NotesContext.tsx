// import React, {createContext, useState, useContext, useEffect} from 'react';
// import {getNotes, addNote, updateNote, deleteNote} from '../api/apiService';
// import Toast from 'react-native-toast-message';

// type Note = {
//   id: string;
//   title: string;
//   text: string;
//   date: string;
// };

// type NotesContextType = {
//   notes: Note[];
//   addOrUpdateNote: (note: Note) => Promise<void>;
//   deleteNotes: (noteIds: string[]) => Promise<void>;
// };

// const NotesContext = createContext<NotesContextType>({
//   notes: [],
//   addOrUpdateNote: async () => {},
//   deleteNotes: async () => {},
// });

// export const NotesProvider: React.FC<{children: React.ReactNode}> = ({
//   children,
// }) => {
//   const [notes, setNotes] = useState<Note[]>([
//     // {
//     //   id: '1',
//     //   title: 'React Native',
//     //   text: 'React Native is an open source framework for building Android and iOS applications using React.',
//     //   date: '01 December 2023 10:30 AM',
//     // },
//     // {
//     //   id: '2',
//     //   title: 'Tasks',
//     //   text: 'To-do items',
//     //   date: '02 December 2023 12:30 PM',
//     // },
//   ]);

//   const fetchNotes = async () => {
//     try {
//       const data = await getNotes();
//       setNotes(data);
//     } catch (error) {
//       console.error('Failed to fetch notes:', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Failed to fetch notes',
//       });
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const addOrUpdateNote = async (note: Note) => {
//     try {
//       if (note.id) {
//         // Update existing note
//         const updatedNote = await updateNote(note.id, note);
//         setNotes(prevNotes =>
//           prevNotes.map(existingNote =>
//             existingNote.id === note.id ? updatedNote : existingNote,
//           ),
//         );
//         Toast.show({
//           type: 'success',
//           text1: 'Success',
//           text2: 'Note updated successfully',
//         });
//       } else {
//         // Add new note

//         const newNote = await addNote({...note, id: Date.now().toString()});
//         setNotes(prevNotes => [newNote, ...prevNotes]);
//         Toast.show({
//           type: 'success',
//           text1: 'Success',
//           text2: 'Note created successfully',
//         });
//       }
//       await fetchNotes();
//     } catch (error) {
//       console.error('Failed to add or update note:', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Failed to save the note',
//       });
//     }
//   };

//   const deleteNotes = async (noteIds: string[]) => {
//     try {
//       await Promise.all(noteIds.map(noteId => deleteNote(noteId)));
//       setNotes(prevNotes =>
//         prevNotes.filter(note => !noteIds.includes(note.id)),
//       );
//       await fetchNotes();
//       Toast.show({
//         type: 'success',
//         text1: 'Deleted',
//         text2: `${noteIds.length} note(s) deleted successfully`,
//       });
//     } catch (error) {
//       console.error('Failed to delete notes:', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Failed to delete notes',
//       });
//     }
//   };

//   return (
//     <NotesContext.Provider value={{notes, addOrUpdateNote, deleteNotes}}>
//       {children}
//     </NotesContext.Provider>
//   );
// };

// export const useNotes = () => useContext(NotesContext);
