import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes'
import PublicRoutes from './src/routes/publicroutes';
import { AuthProvider } from './src/context/authcontext';


export default function App() {
  return (
    <AuthProvider>
    <Routes/>
    </AuthProvider>
    
  );
}


