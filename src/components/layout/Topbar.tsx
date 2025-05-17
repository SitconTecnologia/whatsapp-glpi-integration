import React from 'react';
import { Bell, Sun, Moon, Palette, Globe } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { useThemeStore } from '../../store/theme';
import { useLanguageStore } from '../../store/language';
import { translations } from '../../store/language';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function Topbar() {
  const { user } = useAuthStore();
  const { isDark, primaryColor, toggleTheme, setPrimaryColor } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = React.useState(false);

  const colors = [
    { name: 'blue', label: 'Azul' },
    { name: 'purple', label: 'Roxo' },
    { name: 'green', label: 'Verde' },
    { name: 'orange', label: 'Laranja' },
  ];

  const languages = [
    { code: 'pt-BR', label: 'Português' },
    { code: 'en', label: 'English' },
  ];

  const getPageTitle = () => {
    const t = translations[language];

    switch (window.location.pathname) {
      case '/':
        return t.dashboard;
      case '/tickets':
        return t.tickets;
      case '/equipe':
        return t.team;
      case '/relatorios':
        return t.reports;
      case '/configuracoes':
        return t.settings;
      case '/whatsapp':
        return t.whatsappConnection;
      default:
        return '';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 md:px-8">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {getPageTitle()}
        </h1>
        
        <div className="flex items-center space-x-4">
          {/* Language selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLanguagePicker(!showLanguagePicker)}
              className="text-gray-500 dark:text-gray-400"
            >
              <Globe size={20} />
            </Button>
            
            {showLanguagePicker && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      language === lang.code ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                    onClick={() => {
                      setLanguage(lang.code as 'pt-BR' | 'en');
                      setShowLanguagePicker(false);
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color picker */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="text-gray-500 dark:text-gray-400"
            >
              <Palette size={20} />
            </Button>
            
            {showColorPicker && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      primaryColor === color.name ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                    onClick={() => {
                      setPrimaryColor(color.name as any);
                      setShowColorPicker(false);
                    }}
                  >
                    <span className={`w-4 h-4 rounded-full bg-primary-${color.name}-500 mr-2`} />
                    {color.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-gray-500 dark:text-gray-400"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <button className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <span className="sr-only">Ver notificações</span>
              <Bell size={20} />
            </button>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-600 ring-2 ring-white dark:ring-gray-800"></span>
          </div>
          
          {/* Badge de função do usuário */}
          <Badge 
            variant={user?.role === 'admin' ? 'primary' : 'secondary'}
            className="hidden md:inline-flex"
          >
            {user?.role === 'admin' ? 'Admin' : 'Agente'}
          </Badge>
        </div>
      </div>
    </header>
  );
}