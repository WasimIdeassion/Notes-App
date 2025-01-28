import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NoteCard = ({
  item,
  styles,
  selectedNotes,
  selectionMode,
  toggleSelection,
  handleLongPress,
  parseCustomDate,
  navigation,
}: any) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.card,
        selectedNotes.includes(item.id) && styles.selectedCard,
      ]}
      onPress={() => {
        if (selectionMode) {
          toggleSelection(item.id);
        } else {
          navigation.navigate('NoteEditor', {note: item});
        }
      }}
      onLongPress={() => handleLongPress(item.id)}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardText}>
        {item.text.length > 160
          ? `${item.text.substring(0, 160)}...`
          : item.text}
      </Text>
      <Text style={styles.cardDate}>
        {parseCustomDate(item.date).toLocaleDateString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        })}
      </Text>
      {selectionMode && (
        <View style={styles.checkboxContainer}>
          <Icon
            name={selectedNotes.includes(item.id) ? 'check-circle' : 'circle'}
            size={24}
            color={selectedNotes.includes(item.id) ? '#faa401' : '#333'}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default NoteCard;
