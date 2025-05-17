import React from 'react';
import { formatTime } from '../../lib/utils';
import { Message } from '../../types';
import { Avatar } from '../ui/Avatar';
import { useAuthStore } from '../../store/auth';

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

export function MessageBubble({ message, showAvatar = true }: MessageBubbleProps) {
  const { user } = useAuthStore();
  const isAgent = message.sender === 'agent';
  
  return (
    <div className={`flex ${isAgent ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isAgent && showAvatar && (
        <div className="mr-2 flex-shrink-0">
          <Avatar size="sm" name="Customer" />
        </div>
      )}
      
      <div className={`max-w-md ${!showAvatar && !isAgent ? 'ml-8' : ''}`}>
        <div
          className={`px-4 py-2 rounded-lg ${
            isAgent
              ? 'bg-primary-600 text-white rounded-tr-none'
              : 'bg-gray-200 text-gray-800 rounded-tl-none'
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <span className={`text-xs text-gray-500 ${isAgent ? 'text-right' : 'text-left'} block mt-1`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
      
      {isAgent && showAvatar && (
        <div className="ml-2 flex-shrink-0">
          <Avatar size="sm" src={user?.avatar} name={user?.name} />
        </div>
      )}
    </div>
  );
}