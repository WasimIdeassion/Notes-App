import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const DeleteConfirmationModal = ({visible, onConfirm, onCancel}: any) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel} // Handle back button press on Android
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Notes</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to delete the selected notes?
          </Text>
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ccc',
    marginRight: 10,
    borderRadius: 4,
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f00',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DeleteConfirmationModal;
