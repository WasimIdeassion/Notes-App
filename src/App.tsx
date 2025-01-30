import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './context/ThemeContext';
import StackNavigator from './navigation/StackNavigator';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './redux/store';
import {StatusBar} from 'react-native';
import {useTheme} from './context/ThemeContext';
// import {NotesProvider} from './context/NotesContext';

export default function App() {
  const {theme} = useTheme(); // Access the current theme

  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar
          barStyle={theme === 'light' ? 'light-content' : 'dark-content'}
          backgroundColor={theme === 'light' ? '#121212' : '#ffffff '}
        />
        <NavigationContainer>
          <StackNavigator />
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
