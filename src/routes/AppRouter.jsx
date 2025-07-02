// App Default Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../features/auth/AuthPage';
import HomePage from '../features/home/HomePage';
import ColouringGame from '../features/colouring-game/ColouringGame';
import MemoryGame from '../features/memory-game/MemoryGame';
import BubbleDashGame from '../features/bubble-dash-game/BubbleDashGame';



export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/colouring" element={<ColouringGame />} />
        <Route path="/bubble-dash" element={<BubbleDashGame />} />
        <Route path="/memory" element={<MemoryGame />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}