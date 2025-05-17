import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useWhatsappStore } from '../../store/whatsapp';
import { Button } from '../ui/Button';
import { Smartphone, Wifi } from 'lucide-react';

export function QRCodeScanner() {
  const { isConnected, isConnecting, qrCode, error, connect, disconnect } = useWhatsappStore();
  
  useEffect(() => {
    if (!isConnected && !isConnecting && !qrCode) {
      connect();
    }
  }, []);
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8 sm:p-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Conexão WhatsApp</h2>
          <p className="mt-2 text-sm text-gray-600">
            Escaneie o QR code com WhatsApp para conectar sua conta
          </p>
        </div>
        
        <div className="mt-8">
          {isConnecting && (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
              <p className="mt-4 text-sm text-gray-600">Gerando QR code...</p>
            </div>
          )}
          
          {qrCode && !isConnected && (
            <div className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg">
              <div className="bg-white p-2 rounded-lg">
                <QRCodeSVG 
                  value={qrCode} 
                  size={220}
                  level="H"
                  includeMargin={true}
                  className="qr-code"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-gray-900">
                  1. Abra o WhatsApp no seu celular
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  2. Toque em Menu ou Configurações e selecione Dispositivos Conectados
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  3. Aponte seu celular para esta tela para capturar o código
                </p>
              </div>
            </div>
          )}
          
          {isConnected && (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-success-200 rounded-lg bg-success-50">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-success-100 text-success-700">
                <Wifi size={32} />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Conectado!</h3>
              <p className="mt-1 text-sm text-gray-600">
                WhatsApp conectado com sucesso. Você já pode receber e enviar mensagens.
              </p>
            </div>
          )}
          
          {error && (
            <div className="p-4 mt-4 bg-error-50 border border-error-200 rounded-md">
              <p className="text-sm text-error-700">{error}</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-center">
          {isConnected ? (
            <Button
              onClick={disconnect}
              variant="outline"
              className="text-error-600 border-error-200 hover:bg-error-50"
              icon={<Smartphone size={18} />}
            >
              Desconectar WhatsApp
            </Button>
          ) : (
            <Button
              onClick={connect}
              isLoading={isConnecting}
              disabled={isConnecting}
              icon={<Smartphone size={18} />}
            >
              {qrCode ? 'Atualizar QR Code' : 'Conectar WhatsApp'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}