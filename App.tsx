import Routes from './src/routes';
import { AuthProvider } from './src/context/authcontext';
import { ThemeProvider } from './src/context/themecontext';
import { TaskContext, TaskProvider } from './src/context/taskcontext';

export default function App() {
  return (
    <AuthProvider>
    <TaskProvider>
    <ThemeProvider>
        <Routes/>
    </ThemeProvider>
    </TaskProvider>
    </AuthProvider>
     
      
      
    
  );
}