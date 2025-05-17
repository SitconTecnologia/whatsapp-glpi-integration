import { create } from 'zustand';

interface WhatsappState {
  isConnected: boolean;
  isConnecting: boolean;
  qrCode: string | null;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWhatsappStore = create<WhatsappState>((set) => ({
  isConnected: false,
  isConnecting: false,
  qrCode: null,
  error: null,
  
  connect: async () => {
    set({ isConnecting: true, error: null });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockQRCode = 'whatsapp://link?code=123456789';
      
      set({
        qrCode: mockQRCode,
        isConnecting: false,
      });

      // Simulação de conexão após 5 segundos
      setTimeout(() => {
        set({
          isConnected: true,
          qrCode: null,
        });
      }, 5000);
      
    } catch (error) {
      set({
        error: 'Falha ao gerar QR code',
        isConnecting: false,
      });
    }
  },
  
  disconnect: () => {
    set({
      isConnected: false,
      qrCode: null,
    });
  },
}));