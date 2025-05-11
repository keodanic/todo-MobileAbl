export type Theme = {
    isDark: any;
    primary: string;
    secondary: string;
    background: string;
    cardBackground: string;
    text: string;
    inputBackground: string;
    inputBorder: string;
    button: string;
    buttonText: string;
    placeholder: string;
};

export const lightTheme: Theme = {
    isDark:false ,
    primary: "#4b6cb7",
    secondary: "#c3cfe2",
    background: "black",
    cardBackground: "#ffffff",
    text: "#333333",
    inputBackground: "#f0f0f0",
    inputBorder: "#e0e0e0",
    button: "#4b6cb7",
    buttonText: "#ffffff",
    placeholder: "#a0a0a0",
};

export const darkTheme: Theme = {
    isDark:true,
    primary: "#ff7e5f",
    secondary: "#2c5364",
    background: "#0f2027",
    cardBackground: "#1e1e1e",
    text: "#e0e0e0",
    inputBackground: "#2d2d2d",
    inputBorder: "#444444",
    button: "#ff7e5f",
    buttonText: "#ffffff",
    placeholder: "#777777",
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};