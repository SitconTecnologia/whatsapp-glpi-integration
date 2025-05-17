import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MessageSquare, Home } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <MessageSquare className="h-16 w-16 text-primary-600 mx-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Página Não Encontrada
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            A página que você está procurando não existe ou você não tem acesso a ela.
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
          >
            Voltar
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            icon={<Home size={18} />}
          >
            Ir para o Painel
          </Button>
        </div>
      </div>
    </div>
  );
}