import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

export default function TaskScreen() {
  const {theme} = useTheme(); // Access the current theme
  const styles = getStyles(theme); // Dynamically generate styles based on theme

  const [task, setTask] = useState(''); // State for the current task input
  const [tasks, setTasks] = useState<string[]>([]); // State for the list of tasks

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]); // Add the new task to the list
      setTask(''); // Clear the input field
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a task..."
        placeholderTextColor={theme === 'dark' ? '#aaaaaa' : '#888888'}
        value={task}
        onChangeText={setTask}
      />
      <Button
        title="Add Task"
        onPress={addTask}
        color={theme === 'dark' ? '#faa401' : '#faa401'} // Button color based on theme
      />
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()} // Unique key for each task
        renderItem={({item}) => <Text style={styles.taskItem}>{item}</Text>}
      />
    </View>
  );
}

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme === 'dark' ? '#121212' : '#ffffff', // Dynamic background color
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme === 'dark' ? '#ffffff' : '#000000', // Dynamic header text color
    },
    input: {
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#ffffff' : '#000000', // Dynamic border color
      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#f9f9f9', // Dynamic input background
      padding: 10,
      borderRadius: 8,
      marginBottom: 15,
      color: theme === 'dark' ? '#ffffff' : '#000000', // Dynamic input text color
    },
    taskItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#aaaaaa' : '#888888', // Dynamic border color for tasks
      color: theme === 'dark' ? '#ffffff' : '#000000', // Dynamic task text color
    },
  });
