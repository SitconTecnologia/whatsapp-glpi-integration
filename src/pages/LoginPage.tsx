import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquareText, Lock, User } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Error is handled by the store
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
            <MessageSquareText className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sistema de Suporte WhatsApp
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Entre na sua conta para gerenciar seus tickets de suporte
          </p>
        </div>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              icon={<User size={18} />}
            />
            
            <Input
              id="password"
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              icon={<Lock size={18} />}
            />
            
            {error && (
              <div className="bg-error-50 border border-error-200 rounded p-3">
                <p className="text-sm text-error-600">
                  {error === 'Invalid email or password' 
                    ? 'E-mail ou senha inválidos'
                    : error === 'An error occurred during login'
                    ? 'Ocorreu um erro durante o login'
                    : error === 'Account temporarily locked. Please try again later.'
                    ? 'Conta temporariamente bloqueada. Tente novamente mais tarde.'
                    : error}
                </p>
              </div>
            )}
            
            <div>
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Entrar
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Credenciais de demonstração</span>
              </div>
            </div>
            
            <div className="mt-4 text-center text-xs text-gray-600">
              <p>Admin: admin@example.com / password</p>
              <p className="mt-1">Agente: agent@example.com / password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}