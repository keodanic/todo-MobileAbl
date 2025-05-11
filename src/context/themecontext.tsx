import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useContext,
} from 'react';
import { Theme, themes } from '../colors/theme';

type ThemeContextProps = {
  theme: Theme;
  toggleTheme: () => Promise<void>;
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: themes.light,
  toggleTheme: async () => {},
  isDark: false,
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.light);

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@ThemeStorage');
        if (savedTheme) {
          const parsedTheme = JSON.parse(savedTheme) as Theme;
          setCurrentTheme(parsedTheme.isDark ? themes.dark : themes.light);
        }
      } catch (error) {
        console.error('Failed to load theme', error);
      }
    };

    loadSavedTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = currentTheme.isDark ? themes.light : themes.dark;
    
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
      isDark: currentTheme.isDark,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
