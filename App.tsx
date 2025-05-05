import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/screens/Home';
import Login from './src/screens/Login';

export default function App() {
  return (
    <HomePage/>
  );
}


// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Routes from './src/routes'
// import PublicRoutes from './src/routes/publicRoutes';
// import { AuthProvider } from './src/context/authcontext';


// export default function App() {
//   return (
//     <AuthProvider>
//     <Routes/>
//     </AuthProvider>
    
//   );
// }


