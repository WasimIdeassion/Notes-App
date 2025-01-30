import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../context/ThemeContext';
// import {useNotes} from '../context/NotesContext';
import TopBar from './TopBar';
import SearchBar from './SearchBar';
import NotesColumn from './NotesColumn';
import BottomBar from './BottomBar';
// import DeleteConfirmationModal from './DeleteConfirmationModal';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';
// import {fetchNotes, removeNote} from '../redux/slices/notesSlice';
import {fetchNotesRequest, deleteNoteRequest} from '../redux/slices/notesSlice';
import {RootState} from '../redux/store';

const NotesLayout = ({navigation}: {navigation: any}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const dispatch = useDispatch<AppDispatch>();
  const {notes, loading, error} = useSelector(
    (state: RootState) => state.notes,
  );

  useEffect(() => {
    // dispatch(fetchNotes());
    dispatch(fetchNotesRequest());
  }, [dispatch]);

  // const handleDelete = (noteIds: string[]) => {
  //   noteIds.forEach(id => dispatch(removeNote(id)));
  // };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  // const {notes, deleteNotes} = useNotes();
  // const [isModalVisible, setModalVisible] = useState(false);

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const column1 = filteredNotes.filter((_, index) => index % 2 === 0);
  const column2 = filteredNotes.filter((_, index) => index % 2 !== 0);

  const toggleSelection = (noteId: string) => {
    setSelectedNotes(prev =>
      prev.includes(noteId)
        ? prev.filter(id => id !== noteId)
        : [...prev, noteId],
    );
  };

  const handleLongPress = (noteId: string) => {
    if (!selectionMode) {
      setSelectionMode(true);
    }
    toggleSelection(noteId);
  };

  const parseCustomDate = (dateString: string): Date => {
    try {
      const dateRegex = /^(\d{2}) (\w+) (\d{4}) (\d{1,2}):(\d{2}) (AM|PM)$/i;
      const match = dateString.match(dateRegex);

      if (!match) throw new Error('Invalid date format');

      const [, day, month, year, hour, minute, period] = match;
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const monthNumber = months.indexOf(month);
      const formattedHour =
        period.toUpperCase() === 'PM' && +hour < 12
          ? +hour + 12
          : period.toUpperCase() === 'AM' && +hour === 12
          ? 0
          : +hour;

      return new Date(+year, monthNumber, +day, formattedHour, +minute);
    } catch {
      return new Date();
    }
  };

  const handleSelectAll = () => {
    if (selectedNotes.length === filteredNotes.length) {
      setSelectedNotes([]);
    } else {
      setSelectedNotes(filteredNotes.map(note => note.id));
    }
  };

  const handleDelete = () => {
    if (selectedNotes.length === 0) return;

    Alert.alert(
      'Delete Notes',
      'Are you sure you want to delete the selected notes?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Deleting notes:', selectedNotes); // Debug log
            // deleteNotes(selectedNotes);
            // selectedNotes.forEach(id => dispatch(removeNote(id)));
            selectedNotes.forEach(id => {
              dispatch(deleteNoteRequest(id as unknown as void));
            });

            setSelectedNotes([]);
            setSelectionMode(false);
          },
        },
      ],
    );
  };

  // const handleDelete = () => {
  //   if (selectedNotes.length === 0) return;
  //   setModalVisible(true);
  // };

  // const confirmDelete = () => {
  //   console.log('Deleting notes:', selectedNotes); // Debug log
  //   deleteNotes(selectedNotes);
  //   setSelectedNotes([]);
  //   setSelectionMode(false);
  //   setModalVisible(false);
  // };

  return (
    <View style={styles.container}>
      <TopBar
        selectionMode={selectionMode}
        selectedNotes={selectedNotes}
        filteredNotes={filteredNotes}
        setSelectionMode={setSelectionMode}
        setSelectedNotes={setSelectedNotes}
        handleSelectAll={handleSelectAll}
        styles={styles}
        theme={theme}
      />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        styles={styles}
        theme={theme}
      />
      {filteredNotes.length === 0 ? (
        <View style={styles.nodataContainer}>
          {loading && <Text>Loading notes...</Text>}
          {error && <Text>Error: {error}</Text>}
          {!loading && !error && filteredNotes.length === 0 && (
            <Text style={styles.cardText}>No notes found. Add a new one.</Text>
          )}
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.masonryContainer}>
          <NotesColumn
            notes={column1}
            styles={styles}
            selectedNotes={selectedNotes}
            selectionMode={selectionMode}
            toggleSelection={toggleSelection}
            handleLongPress={handleLongPress}
            parseCustomDate={parseCustomDate}
            navigation={navigation}
          />
          <NotesColumn
            notes={column2}
            styles={styles}
            selectedNotes={selectedNotes}
            selectionMode={selectionMode}
            toggleSelection={toggleSelection}
            handleLongPress={handleLongPress}
            parseCustomDate={parseCustomDate}
            navigation={navigation}
          />
        </ScrollView>
      )}
      <BottomBar
        selectionMode={selectionMode}
        handleDelete={handleDelete}
        styles={styles}
      />
      {/* <DeleteConfirmationModal
        visible={isModalVisible}
        onConfirm={confirmDelete}
        onCancel={() => setModalVisible(false)}
      /> */}
      {!selectionMode && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('NoteEditor')}>
          <Icon name="add" size={36} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#eee',
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme === 'dark' ? '#ffffff' : '#000000', // Dynamic header text color
    },
    nodataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    selectionCount: {
      fontSize: 16,
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    selectAll: {
      fontSize: 16,
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#f9f9f9',
      borderRadius: 30,
      padding: 5,
      marginBottom: 15,
    },
    searchIcon: {
      marginLeft: 10,
      marginRight: 5,
      color: theme === 'dark' ? '#f9f9f9' : '#000000',
    },
    searchBar: {
      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#f9f9f9',
      borderRadius: 30,
      padding: 12,
      color: theme === 'dark' ? '#ffffff' : '#000000',
      fontSize: 16,
    },
    masonryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    column: {
      flex: 1,
      gap: 10,
    },
    card: {
      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#f9f9f9',
      borderRadius: 14,
      padding: 15,
      borderWidth: 2,
      borderColor: theme === 'dark' ? '#1f1f1f' : '#f9f9f9',
    },
    selectedCard: {
      borderWidth: 2,
      borderColor: '#faa401',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    cardText: {
      fontSize: 16,
      color: theme === 'dark' ? '#aaaaaa' : '#888888',
      marginTop: 5,
    },
    cardDate: {
      fontSize: 12,
      color: theme === 'dark' ? '#888' : '#888888',
      marginTop: 18,
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      backgroundColor: theme === 'dark' ? '#faa401' : '#faa401',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
    checkboxContainer: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    bottomBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: theme.primary,
    },
    bottomBarButton: {
      alignItems: 'center',
      gap: 3,
    },
    bottomBarText: {
      color: '#ffffff',
      fontSize: 10,
    },

    pinText: {
      color: '#333',
      fontSize: 10,
    },
  });

export default NotesLayout;
