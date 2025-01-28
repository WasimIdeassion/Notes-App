import React from 'react';
import {View} from 'react-native';
import NoteCard from './NoteCard';

const NotesColumn = ({
  notes,
  styles,
  selectedNotes,
  selectionMode,
  toggleSelection,
  handleLongPress,
  parseCustomDate,
  navigation,
}: any) => {
  return (
    <View style={styles.column}>
      {notes.map((item: any) => (
        <NoteCard
          key={item.id}
          item={item}
          styles={styles}
          selectedNotes={selectedNotes}
          selectionMode={selectionMode}
          toggleSelection={toggleSelection}
          handleLongPress={handleLongPress}
          parseCustomDate={parseCustomDate}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

export default NotesColumn;
