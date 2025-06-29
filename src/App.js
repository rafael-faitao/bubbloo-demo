import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './features/auth/useAuth';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
