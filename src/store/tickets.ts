import { create } from 'zustand';
import { Ticket, TicketStatus } from '../types';

interface TicketsState {
  tickets: Ticket[];
  activeTicket: Ticket | null;
  isLoading: boolean;
  error: string | null;
  fetchTickets: () => Promise<void>;
  setActiveTicket: (ticketId: string) => void;
  updateTicketStatus: (ticketId: string, status: TicketStatus) => Promise<void>;
  assignTicket: (ticketId: string, agentId: string) => Promise<void>;
  addMessage: (ticketId: string, message: string, sender: 'agent' | 'customer') => Promise<void>;
}

// Mock data for demonstration
const mockTickets: Ticket[] = [
  {
    id: '1',
    customerId: 'cust1',
    customerName: 'John Doe',
    customerPhone: '+1234567890',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    messages: [
      {
        id: 'm1',
        content: 'Hello, I need help with my order #12345',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        sender: 'customer',
        read: true,
      },
    ],
    priority: 'medium',
  },
  {
    id: '2',
    customerId: 'cust2',
    customerName: 'Jane Smith',
    customerPhone: '+9876543210',
    status: 'in-progress',
    assignedTo: '2',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    messages: [
      {
        id: 'm2',
        content: 'I have a question about your services',
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        sender: 'customer',
        read: true,
      },
      {
        id: 'm3',
        content: 'Hi Jane, I\'d be happy to help. What would you like to know?',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        sender: 'agent',
        agentId: '2',
        read: true,
      },
    ],
    priority: 'high',
  },
  {
    id: '3',
    customerId: 'cust3',
    customerName: 'Bob Johnson',
    customerPhone: '+1122334455',
    status: 'pending',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    messages: [
      {
        id: 'm4',
        content: 'When will my order be delivered?',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        sender: 'customer',
        read: false,
      },
    ],
    priority: 'low',
  },
];

export const useTicketsStore = create<TicketsState>((set, get) => ({
  tickets: [],
  activeTicket: null,
  isLoading: false,
  error: null,
  
  fetchTickets: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ tickets: mockTickets, isLoading: false });
    } catch (error) {
      set({
        error: 'Failed to fetch tickets',
        isLoading: false,
      });
    }
  },
  
  setActiveTicket: (ticketId: string) => {
    const ticket = get().tickets.find(t => t.id === ticketId) || null;
    set({ activeTicket: ticket });
  },
  
  updateTicketStatus: async (ticketId: string, status: TicketStatus) => {
    set({ isLoading: true, error: null });
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === ticketId
            ? { ...ticket, status, updatedAt: new Date().toISOString() }
            : ticket
        ),
        activeTicket: state.activeTicket?.id === ticketId
          ? { ...state.activeTicket, status, updatedAt: new Date().toISOString() }
          : state.activeTicket,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: 'Failed to update ticket status',
        isLoading: false,
      });
    }
  },
  
  assignTicket: async (ticketId: string, agentId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === ticketId
            ? { ...ticket, assignedTo: agentId, updatedAt: new Date().toISOString() }
            : ticket
        ),
        activeTicket: state.activeTicket?.id === ticketId
          ? { ...state.activeTicket, assignedTo: agentId, updatedAt: new Date().toISOString() }
          : state.activeTicket,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: 'Failed to assign ticket',
        isLoading: false,
      });
    }
  },
  
  addMessage: async (ticketId: string, content: string, sender: 'agent' | 'customer') => {
    set({ isLoading: true, error: null });
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newMessage = {
        id: `m${Date.now()}`,
        content,
        timestamp: new Date().toISOString(),
        sender,
        agentId: sender === 'agent' ? get().activeTicket?.assignedTo : undefined,
        read: true,
      };
      
      set(state => {
        const updatedTickets = state.tickets.map(ticket =>
          ticket.id === ticketId
            ? {
                ...ticket,
                messages: [...ticket.messages, newMessage],
                updatedAt: new Date().toISOString(),
                status: ticket.status === 'pending' && sender === 'agent' ? 'in-progress' : ticket.status,
              }
            : ticket
        );
        
        const updatedActiveTicket = state.activeTicket?.id === ticketId
          ? {
              ...state.activeTicket,
              messages: [...state.activeTicket.messages, newMessage],
              updatedAt: new Date().toISOString(),
              status: state.activeTicket.status === 'pending' && sender === 'agent' ? 'in-progress' : state.activeTicket.status,
            }
          : state.activeTicket;
        
        return {
          tickets: updatedTickets,
          activeTicket: updatedActiveTicket,
          isLoading: false,
        };
      });
    } catch (error) {
      set({
        error: 'Failed to send message',
        isLoading: false,
      });
    }
  },
}));