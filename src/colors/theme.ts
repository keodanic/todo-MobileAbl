export type Theme = {
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

 const lightTheme: Theme = {
    primary: "#f67968",
    secondary: "#c3cfe2",
    background: "black",
    cardBackground: "#ffffff",
    text: "#333333",
    inputBackground: "#f0f0f0",
    inputBorder: "black",
    button: "#4b6cb7",
    buttonText: "#ffffff",
    placeholder: "#a0a0a0",
};

 const darkTheme: Theme = {
    primary: "#f67968",
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