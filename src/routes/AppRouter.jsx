// App Default Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../features/auth/AuthPage';



export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}