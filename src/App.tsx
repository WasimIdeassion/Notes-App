import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './context/ThemeContext';
import StackNavigator from './navigation/StackNavigator';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './redux/store';
// import {NotesProvider} from './context/NotesContext';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <StackNavigator />
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
