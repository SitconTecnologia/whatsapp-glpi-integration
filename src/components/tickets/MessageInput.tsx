import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '../ui/Button';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export function MessageInput({ onSendMessage, isLoading = false }: MessageInputProps) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-end space-x-2">
        <div className="flex-1 min-h-[56px]">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={1}
            style={{ minHeight: '56px' }}
          />
        </div>
        
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="ghost"
            className="text-gray-500"
            aria-label="Anexar arquivo"
          >
            <Paperclip size={20} />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            className="text-gray-500"
            aria-label="Adicionar emoji"
          >
            <Smile size={20} />
          </Button>
          
          <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            isLoading={isLoading}
            icon={<Send size={18} />}
          >
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}