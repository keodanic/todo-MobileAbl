import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, PropsWithChildren, useEffect} from 'react';
import { Theme, themes } from '../colors/theme';

type ThemeContextProps = {
  theme: Theme;
  toggleTheme: () => Promise<void>;
};

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.light);

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@ThemeStorage');
        if (savedTheme) {
          const parsedTheme = JSON.parse(savedTheme) as Theme;
          setCurrentTheme(parsedTheme === themes.dark ? themes.dark : themes.light);
        }
      } catch (error) {
        console.error('erro no tema', error);
      }
    };

    loadSavedTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = currentTheme === themes.dark ? themes.light : themes.dark;
    try {
      setCurrentTheme(newTheme);
      await AsyncStorage.setItem('@ThemeStorage', JSON.stringify(newTheme));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};