import React from 'react';
import { formatDate, formatTime, getStatusColor } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Ticket } from '../../types';

interface TicketItemProps {
  ticket: Ticket;
  isActive: boolean;
  onClick: () => void;
}

export function TicketItem({ ticket, isActive, onClick }: TicketItemProps) {
  const latestMessage = ticket.messages[ticket.messages.length - 1];
  const unreadMessages = ticket.messages.filter(m => !m.read && m.sender === 'customer').length;
  
  return (
    <div
      className={`border-b border-gray-200 p-4 cursor-pointer transition-colors ${
        isActive ? 'bg-primary-50' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <Avatar name={ticket.customerName} size="sm" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">{ticket.customerName}</h3>
            <p className="text-xs text-gray-500">{ticket.customerPhone}</p>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {formatDate(ticket.updatedAt)} at {formatTime(ticket.updatedAt)}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm text-gray-600 truncate max-w-xs">
          {latestMessage.content}
        </p>
        <div className="flex items-center space-x-2">
          {unreadMessages > 0 && (
            <span className="flex items-center justify-center w-5 h-5 bg-primary-600 text-white text-xs font-medium rounded-full">
              {unreadMessages}
            </span>
          )}
          <div className={`h-2 w-2 rounded-full ${getStatusColor(ticket.status)}`}></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <Badge
          variant={
            ticket.priority === 'high'
              ? 'error'
              : ticket.priority === 'medium'
                ? 'warning'
                : 'success'
          }
        >
          {ticket.priority}
        </Badge>
        
        <Badge
          variant={
            ticket.status === 'pending'
              ? 'warning'
              : ticket.status === 'in-progress'
                ? 'primary'
                : 'success'
          }
        >
          {ticket.status}
        </Badge>
      </div>
    </div>
  );
}