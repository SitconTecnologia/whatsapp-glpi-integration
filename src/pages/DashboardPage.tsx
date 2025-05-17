import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  UserCheck, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BarChart, 
  TrendingUp 
} from 'lucide-react';
import { useTicketsStore } from '../store/tickets';
import { useWhatsappStore } from '../store/whatsapp';
import { Button } from '../components/ui/Button';

export function DashboardPage() {
  const navigate = useNavigate();
  const { tickets, fetchTickets } = useTicketsStore();
  const { isConnected } = useWhatsappStore();
  
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);
  
  // Calculate ticket statistics
  const totalTickets = tickets.length;
  const pendingTickets = tickets.filter(t => t.status === 'pending').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const highPriorityTickets = tickets.filter(t => t.priority === 'high').length;
  
  const statsCards = [
    {
      title: 'Total Tickets',
      value: totalTickets,
      icon: <MessageCircle size={20} className="text-primary-600" />,
      color: 'bg-primary-50 text-primary-600 border-primary-100',
    },
    {
      title: 'Pending',
      value: pendingTickets,
      icon: <Clock size={20} className="text-warning-600" />,
      color: 'bg-warning-50 text-warning-600 border-warning-100',
    },
    {
      title: 'In Progress',
      value: inProgressTickets,
      icon: <UserCheck size={20} className="text-primary-600" />,
      color: 'bg-primary-50 text-primary-600 border-primary-100',
    },
    {
      title: 'Resolved',
      value: resolvedTickets,
      icon: <CheckCircle size={20} className="text-success-600" />,
      color: 'bg-success-50 text-success-600 border-success-100',
    },
    {
      title: 'High Priority',
      value: highPriorityTickets,
      icon: <AlertTriangle size={20} className="text-error-600" />,
      color: 'bg-error-50 text-error-600 border-error-100',
    },
  ];
  
  return (
    <div>
      {/* WhatsApp status indicator */}
      {!isConnected && (
        <div className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle size={20} className="text-warning-600 mr-2" />
            <p className="text-warning-700">
              WhatsApp is not connected. Connect to start receiving messages.
            </p>
          </div>
          <Button
            onClick={() => navigate('/whatsapp')}
            size="sm"
          >
            Connect WhatsApp
          </Button>
        </div>
      )}
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {statsCards.map((card) => (
          <div
            key={card.title}
            className={`p-4 rounded-lg border ${card.color} flex items-center`}
          >
            <div className="mr-4">{card.icon}</div>
            <div>
              <p className="text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recently updated tickets and activity chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent tickets */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">Recent Tickets</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/tickets')}
            >
              View All
            </Button>
          </div>
          
          <div className="divide-y divide-gray-200">
            {tickets.slice(0, 5).map((ticket) => (
              <div
                key={ticket.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  navigate('/tickets');
                  // Setting active ticket would happen here in a real app
                }}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium text-gray-800">{ticket.customerName}</p>
                  <span className={`inline-block h-2 w-2 rounded-full ${
                    ticket.status === 'pending'
                      ? 'bg-warning-500'
                      : ticket.status === 'in-progress'
                        ? 'bg-primary-500'
                        : 'bg-success-500'
                  }`}></span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {ticket.messages[ticket.messages.length - 1].content}
                </p>
              </div>
            ))}
            
            {tickets.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <MessageCircle size={32} className="mx-auto mb-2 text-gray-400" />
                <p>No tickets yet</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Activity chart placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-800">Ticket Activity</h2>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600"
              >
                Week
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-600 bg-primary-50"
              >
                Month
              </Button>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart size={48} className="mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">
                Activity chart will be displayed here
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Showing ticket volume trends
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={() => navigate('/tickets')}
          className="flex items-center justify-center"
          icon={<MessageCircle size={18} />}
        >
          Manage Tickets
        </Button>
        
        <Button
          onClick={() => navigate('/whatsapp')}
          className="flex items-center justify-center"
          variant="outline"
          icon={<TrendingUp size={18} />}
        >
          WhatsApp Status
        </Button>
        
        <Button
          onClick={() => navigate('/reports')}
          className="flex items-center justify-center"
          variant="outline"
          icon={<BarChart size={18} />}
        >
          View Reports
        </Button>
      </div>
    </div>
  );
}