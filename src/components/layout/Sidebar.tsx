import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  Users, 
  BarChart, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { Avatar } from '../ui/Avatar';

export function Sidebar() {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { icon: <Home size={20} />, label: 'Painel', to: '/' },
    { icon: <MessageSquare size={20} />, label: 'Tickets', to: '/tickets' },
    { icon: <Users size={20} />, label: 'Equipe', to: '/equipe' },
    { icon: <BarChart size={20} />, label: 'Relatórios', to: '/relatorios' },
    { icon: <Settings size={20} />, label: 'Configurações', to: '/configuracoes' },
  ];

  return (
    <>
      {/* Botão do menu mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 rounded-md bg-primary-600 p-2 text-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        fixed inset-y-0 left-0 z-40 w-64 lg:static lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary-800">Suporte WhatsApp</h1>
        </div>

        {/* Itens de navegação */}
        <nav className="mt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Perfil do usuário e logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          <div className="flex items-center">
            <Avatar 
              src={user?.avatar} 
              name={user?.name}
              size="sm"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Administrador' : 'Agente'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-4 flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}