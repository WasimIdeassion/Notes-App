import {TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import React from 'react';

const SearchBar = ({searchQuery, setSearchQuery, styles, theme}: any) => {
  return (
    <View style={styles.searchContainer}>
      <Icon
        name="search"
        size={24}
        color={theme.placeholder}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search notes"
        placeholderTextColor={theme.placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default SearchBar;
