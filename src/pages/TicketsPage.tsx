import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  UserPlus, 
  CheckCircle,
  MessageCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useTicketsStore } from '../store/tickets';
import { useAuthStore } from '../store/auth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { TicketItem } from '../components/tickets/TicketItem';
import { MessageBubble } from '../components/tickets/MessageBubble';
import { MessageInput } from '../components/tickets/MessageInput';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { formatDate } from '../lib/utils';

export function TicketsPage() {
  const { user } = useAuthStore();
  const { 
    tickets, 
    activeTicket, 
    isLoading, 
    fetchTickets, 
    setActiveTicket, 
    updateTicketStatus, 
    assignTicket, 
    addMessage 
  } = useTicketsStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sendingMessage, setSendingMessage] = useState(false);
  
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);
  
  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchTerm
      ? ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customerPhone.includes(searchTerm) ||
        ticket.messages.some(m => m.content.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
      
    const matchesStatus = statusFilter ? ticket.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSendMessage = async (message: string) => {
    if (!activeTicket) return;
    
    setSendingMessage(true);
    try {
      await addMessage(activeTicket.id, message, 'agent');
      if (activeTicket.status === 'pending') {
        await updateTicketStatus(activeTicket.id, 'in-progress');
      }
    } finally {
      setSendingMessage(false);
    }
  };
  
  const handleAssignToMe = async () => {
    if (!activeTicket || !user) return;
    await assignTicket(activeTicket.id, user.id);
  };
  
  const handleResolveTicket = async () => {
    if (!activeTicket) return;
    await updateTicketStatus(activeTicket.id, 'resolved');
  };
  
  const handleReopenTicket = async () => {
    if (!activeTicket) return;
    await updateTicketStatus(activeTicket.id, 'in-progress');
  };
  
  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-sm">
      {/* Tickets list panel */}
      <div className="md:w-80 lg:w-96 border-r border-gray-200 flex flex-col">
        {/* Search and filters */}
        <div className="p-4 border-b border-gray-200">
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} />}
            className="mb-4"
          />
          
          <div className="flex space-x-2 overflow-x-auto pb-1">
            <Button
              size="sm"
              variant={statusFilter === null ? 'primary' : 'outline'}
              onClick={() => setStatusFilter(null)}
              className="whitespace-nowrap"
              icon={<MessageCircle size={14} />}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'pending' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('pending')}
              className="whitespace-nowrap"
              icon={<Clock size={14} />}
            >
              Pending
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'in-progress' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('in-progress')}
              className="whitespace-nowrap"
              icon={<UserPlus size={14} />}
            >
              In Progress
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'resolved' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('resolved')}
              className="whitespace-nowrap"
              icon={<CheckCircle size={14} />}
            >
              Resolved
            </Button>
          </div>
        </div>
        
        {/* Tickets list */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
            </div>
          ) : filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                ticket={ticket}
                isActive={activeTicket?.id === ticket.id}
                onClick={() => setActiveTicket(ticket.id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
              <AlertTriangle size={32} className="mb-2" />
              <p>No tickets found</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Conversation panel */}
      <div className="flex-1 flex flex-col">
        {activeTicket ? (
          <>
            {/* Ticket header */}
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <div className="flex items-center">
                <Avatar name={activeTicket.customerName} />
                <div className="ml-3">
                  <h2 className="text-lg font-medium text-gray-900">
                    {activeTicket.customerName}
                  </h2>
                  <p className="text-sm text-gray-500">{activeTicket.customerPhone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    activeTicket.priority === 'high'
                      ? 'error'
                      : activeTicket.priority === 'medium'
                        ? 'warning'
                        : 'success'
                  }
                >
                  {activeTicket.priority}
                </Badge>
                
                <Badge
                  variant={
                    activeTicket.status === 'pending'
                      ? 'warning'
                      : activeTicket.status === 'in-progress'
                        ? 'primary'
                        : 'success'
                  }
                >
                  {activeTicket.status}
                </Badge>
              </div>
            </div>
            
            {/* Actions bar */}
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Created: {formatDate(activeTicket.createdAt)}
              </div>
              
              <div className="flex space-x-2">
                {!activeTicket.assignedTo && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAssignToMe}
                    icon={<UserPlus size={14} />}
                  >
                    Assign to me
                  </Button>
                )}
                
                {activeTicket.status !== 'resolved' ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleResolveTicket}
                    icon={<CheckCircle size={14} />}
                    className="text-success-600 border-success-200 hover:bg-success-50"
                  >
                    Resolve
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReopenTicket}
                    icon={<MessageCircle size={14} />}
                  >
                    Reopen
                  </Button>
                )}
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTicket.messages.map((message, index) => {
                const previousMessage = index > 0 ? activeTicket.messages[index - 1] : null;
                const showAvatar = !previousMessage || previousMessage.sender !== message.sender;
                
                return (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    showAvatar={showAvatar}
                  />
                );
              })}
            </div>
            
            {/* Message input */}
            {activeTicket.status !== 'resolved' && (
              <MessageInput
                onSendMessage={handleSendMessage}
                isLoading={sendingMessage}
              />
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <MessageCircle size={48} className="mb-4" />
            <h3 className="text-xl font-medium mb-2">No ticket selected</h3>
            <p>Select a ticket from the list to view the conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}