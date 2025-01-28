import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TaskScreen from '../components/TaskScreen';
// import StackNavigator from './StackNavigator';
import {useTheme} from '../context/ThemeContext';
import NotesLayout from '../components/NotesLayout';

// Type for TabBarIcon props
type TabBarIconProps = {
  color: string;
  size: number;
  routeName: string;
};

// Separate TabBarIcon Component
const TabBarIcon: React.FC<TabBarIconProps> = ({color, size, routeName}) => {
  let iconName = '';
  if (routeName === 'Notes') {
    iconName = 'note-alt';
  } else if (routeName === 'Tasks') {
    iconName = 'task';
  }
  return <Icon name={iconName} color={color} size={size} />;
};

// Function to Define Screen Options
const getScreenOptions = (theme: string) => (route: {name: string}) => ({
  tabBarIcon: ({color, size}: {color: string; size: number}) => (
    <TabBarIcon color={color} size={size} routeName={route.name} />
  ),
  tabBarActiveTintColor: theme === 'dark' ? '#faa401' : '#faa401',
  tabBarInactiveTintColor: theme === 'dark' ? '#888' : '#ccc',
  tabBarStyle: {
    backgroundColor: theme === 'dark' ? '#121212' : '#f0f0f0',
  },
  headerShown: false,
});

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const {theme} = useTheme(); // Access the current theme

  return (
    <Tab.Navigator screenOptions={({route}) => getScreenOptions(theme)(route)}>
      <Tab.Screen name="Notes" component={NotesLayout} />
      <Tab.Screen name="Tasks" component={TaskScreen} />
    </Tab.Navigator>
  );
}
