import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TicketsPage } from './pages/TicketsPage';
import { WhatsAppPage } from './pages/WhatsAppPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useAuthStore } from './store/auth';
import { useThemeStore } from './store/theme';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { isDark, primaryColor } = useThemeStore();

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    
    document.documentElement.className = document.documentElement.className
      .replace(/primary-(blue|purple|green|orange)/, '')
      .trim();
    document.documentElement.classList.add(`primary-${primaryColor}`);
  }, [isDark, primaryColor]);

  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        } />
        
        {/* Rotas protegidas */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/whatsapp" element={<WhatsAppPage />} />
          <Route path="/equipe" element={<DashboardPage />} />
          <Route path="/relatorios" element={<DashboardPage />} />
          <Route path="/configuracoes" element={<DashboardPage />} />
        </Route>
        
        {/* Rota de fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;