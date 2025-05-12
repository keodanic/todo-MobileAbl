import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/themecontext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};