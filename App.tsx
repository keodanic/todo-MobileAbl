import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes';
import { AuthProvider } from './src/context/authcontext';
import { ThemeProvider } from './src/context/themecontext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
  );
}