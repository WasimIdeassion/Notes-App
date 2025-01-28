import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import React from 'react';

const TopBar = ({
  selectionMode,
  selectedNotes,
  filteredNotes,
  setSelectionMode,
  setSelectedNotes,
  handleSelectAll,
  styles,
  theme,
}: any) => {
  return selectionMode ? (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={() => {
          setSelectionMode(false);
          setSelectedNotes([]);
        }}>
        <Icon
          name="close"
          size={24}
          color={theme.text}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
      <Text style={styles.selectionCount}>
        {selectedNotes.length} items selected
      </Text>
      <TouchableOpacity onPress={handleSelectAll}>
        <Text style={styles.selectAll}>
          {selectedNotes.length === filteredNotes.length
            ? 'Unselect All'
            : 'Select All'}
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <Text style={styles.header}>Notes</Text>
  );
};

export default TopBar;
