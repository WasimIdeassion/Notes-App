import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomBar = ({selectionMode, handleDelete, styles}: any) => {
  if (!selectionMode) {
    return null;
  }

  console.log('BottomBar rendered. selectionMode:', selectionMode);

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.bottomBarButton} onPress={handleDelete}>
        <Icon name="delete" size={24} color="#ffffff" />
        <Text style={styles.bottomBarText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBarButton} disabled>
        <Icon name="push-pin" size={24} color="#333" />
        <Text style={styles.pinText}>Pin</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
