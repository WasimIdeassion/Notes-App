import React, {createContext, useContext, useState, useEffect} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';

const ThemeContext = createContext({
  theme: 'light', // Default theme
  toggleTheme: () => {}, // For manual toggle (optional)
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>(
    Appearance.getColorScheme() || 'light',
  );

  useEffect(() => {
    const handleThemeChange = (preferences: {colorScheme: ColorSchemeName}) => {
      setTheme(preferences.colorScheme || 'light'); // Ensure theme is always a string
    };

    // Listen to system theme changes
    const subscription = Appearance.addChangeListener(handleThemeChange);

    return () => subscription.remove(); // Cleanup listener on unmount
  }, []);

  const toggleTheme = () => {
    // Manual toggle (light <-> dark)
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
