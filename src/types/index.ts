export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  avatar?: string;
};

export type Message = {
  id: string;
  content: string;
  timestamp: string;
  sender: 'customer' | 'agent';
  agentId?: string;
  mediaUrl?: string;
  read: boolean;
};

export type TicketStatus = 'pending' | 'in-progress' | 'resolved';

export type Ticket = {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  status: TicketStatus;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  tags?: string[];
  priority: 'low' | 'medium' | 'high';
};