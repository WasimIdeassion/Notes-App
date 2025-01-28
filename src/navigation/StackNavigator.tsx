import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import NotesLayout from '../components/NotesLayout';
import NoteEditor from '../components/NotesEditor'; // Ensure the correct import
import {useTheme} from '../context/ThemeContext';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const {theme} = useTheme(); // Access the current theme

  const screenOptions = {
    headerStyle: {
      backgroundColor: theme === 'dark' ? '#121212' : '#f0f0f0', // Header background
    },
    headerTitleStyle: {
      color: theme === 'dark' ? '#ffffff' : '#000000', // Header text color
    },
    headerTintColor: theme === 'dark' ? '#ffffff' : '#000000', // Back button color
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="NotesLayout"
        component={NotesLayout}
        options={{title: 'Notes'}}
      /> */}
      <Stack.Screen
        name="NoteEditor"
        component={NoteEditor}
        options={{title: 'Edit Note'}}
      />
    </Stack.Navigator>
  );
}
