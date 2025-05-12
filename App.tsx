import Routes from './src/routes';
import { AuthProvider } from './src/context/authcontext';
import { ThemeProvider } from './src/context/themecontext';

export default function App() {
  return (
      <ThemeProvider>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
    
  );
}