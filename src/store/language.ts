import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'pt-BR' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'pt-BR',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);

export const translations = {
  'pt-BR': {
    // Auth
    login: 'Entrar',
    email: 'E-mail',
    password: 'Senha',
    invalidCredentials: 'E-mail ou senha inválidos',
    loginError: 'Ocorreu um erro durante o login',
    accountLocked: 'Conta temporariamente bloqueada. Tente novamente mais tarde.',
    demoCredentials: 'Credenciais de demonstração',

    // Navigation
    dashboard: 'Painel',
    tickets: 'Tickets',
    team: 'Equipe',
    reports: 'Relatórios',
    settings: 'Configurações',
    logout: 'Sair',

    // Ticket Status
    pending: 'Pendente',
    inProgress: 'Em Andamento',
    resolved: 'Resolvido',
    all: 'Todos',

    // Priority
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',

    // Actions
    assign: 'Atribuir a mim',
    resolve: 'Resolver',
    reopen: 'Reabrir',
    send: 'Enviar',
    search: 'Buscar tickets...',

    // WhatsApp
    whatsappConnection: 'Conexão WhatsApp',
    scanQRCode: 'Escaneie o QR code com WhatsApp',
    connecting: 'Conectando...',
    connected: 'Conectado!',
    disconnect: 'Desconectar',
    connectionInstructions: 'Instruções de Conexão',

    // Dashboard
    totalTickets: 'Total de Tickets',
    recentTickets: 'Tickets Recentes',
    ticketActivity: 'Atividade de Tickets',
    noTickets: 'Nenhum ticket encontrado',
    viewAll: 'Ver Todos',

    // Messages
    typeMessage: 'Digite sua mensagem...',
    noTicketSelected: 'Nenhum ticket selecionado',
    selectTicket: 'Selecione um ticket para ver a conversa',
  },
  'en': {
    // Auth
    login: 'Login',
    email: 'Email',
    password: 'Password',
    invalidCredentials: 'Invalid email or password',
    loginError: 'An error occurred during login',
    accountLocked: 'Account temporarily locked. Please try again later.',
    demoCredentials: 'Demo Credentials',

    // Navigation
    dashboard: 'Dashboard',
    tickets: 'Tickets',
    team: 'Team',
    reports: 'Reports',
    settings: 'Settings',
    logout: 'Logout',

    // Ticket Status
    pending: 'Pending',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    all: 'All',

    // Priority
    low: 'Low',
    medium: 'Medium',
    high: 'High',

    // Actions
    assign: 'Assign to me',
    resolve: 'Resolve',
    reopen: 'Reopen',
    send: 'Send',
    search: 'Search tickets...',

    // WhatsApp
    whatsappConnection: 'WhatsApp Connection',
    scanQRCode: 'Scan QR code with WhatsApp',
    connecting: 'Connecting...',
    connected: 'Connected!',
    disconnect: 'Disconnect',
    connectionInstructions: 'Connection Instructions',

    // Dashboard
    totalTickets: 'Total Tickets',
    recentTickets: 'Recent Tickets',
    ticketActivity: 'Ticket Activity',
    noTickets: 'No tickets found',
    viewAll: 'View All',

    // Messages
    typeMessage: 'Type your message...',
    noTicketSelected: 'No ticket selected',
    selectTicket: 'Select a ticket to view the conversation',
  }
} as const;