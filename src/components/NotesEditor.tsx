import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, Text} from 'react-native';
import {useTheme} from '../context/ThemeContext';
// import {useNotes} from '../context/NotesContext';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
// import {createNote, editNote} from '../redux/slices/notesSlice';
import {createNoteRequest, editNoteRequest} from '../redux/slices/notesSlice';

const NoteEditor = ({route, navigation}: {route: any; navigation: any}) => {
  const {theme} = useTheme(); // Access the current theme
  // const {addOrUpdateNote} = useNotes();
  const styles = getStyles(theme);

  const dispatch = useDispatch<AppDispatch>();

  // Get the note from route params or initialize an empty one
  const note = route.params?.note || null;

  // Form state
  const [title, setTitle] = useState(note?.title || '');
  const [text, setText] = useState(note?.text || '');
  const formattedDate = note?.date || getFormattedDate(new Date()); // Read-only formatted date

  // Format the date as "dd Month yyyy hh:mm AM/PM"
  function getFormattedDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();
    let hour = date.getHours();
    const minute = String(date.getMinutes()).padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert to 12-hour format

    return `${day} ${month} ${year} ${hour}:${minute} ${ampm}`;
  }

  // Save or update the note
  const saveNote = async () => {
    const now = new Date();
    const updatedNote = {
      id: note?.id || Date.now().toString(), // Use a unique ID for new notes
      title,
      text,
      date: getFormattedDate(now), // Save the current timestamp
    };

    try {
      if (note) {
        dispatch(editNoteRequest({id: updatedNote.id, note: updatedNote}));
      } else {
        dispatch(createNoteRequest(updatedNote));
      }
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View collapsable={false}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor={theme === 'dark' ? '#666' : '#888888'}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View collapsable={false}>
        <Text style={styles.cardDate}>
          {`${formattedDate}   |   ${text.length} characters`}
        </Text>
      </View>
      <View collapsable={false}>
        <TextInput
          style={styles.textArea}
          placeholder="Start typing here..."
          placeholderTextColor={theme === 'dark' ? '#666' : '#888888'}
          value={text}
          onChangeText={setText}
          multiline
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Save"
          onPress={saveNote}
          color="#faa401"
          disabled={title.trim() === '' && text.trim() === ''}
        />
      </View>
    </View>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
      padding: 20,
    },
    input: {
      marginBottom: 8,
      color: theme === 'dark' ? '#ffffff' : '#000000',
      borderRadius: 8,
      fontSize: 18,
    },
    textArea: {
      color: theme === 'dark' ? '#ffffff' : '#000000',
      // height: '80%',
      textAlignVertical: 'top',
      lineHeight: 22,
      fontSize: 15,
    },
    cardDate: {
      fontSize: 13,
      color: theme === 'dark' ? '#aaaaaa' : '#888888',
      marginBottom: 10,
      marginLeft: 5,
    },
    btnContainer: {
      marginTop: 'auto',
      borderRadius: 90,
    },
  });

export default NoteEditor;
