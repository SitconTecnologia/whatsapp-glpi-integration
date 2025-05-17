import React from 'react';
import { QRCodeScanner } from '../components/whatsapp/QRCodeScanner';

export function WhatsAppPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-medium text-gray-800">WhatsApp Connection</h2>
          <p className="text-sm text-gray-600 mt-1">
            Connect WhatsApp to start receiving and responding to customer messages
          </p>
        </div>
        
        <div className="p-6">
          <QRCodeScanner />
        </div>
        
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <h3 className="text-sm font-medium text-gray-800 mb-2">Connection Instructions</h3>
          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
            <li>Open WhatsApp on your phone</li>
            <li>Tap Menu or Settings and select Linked Devices</li>
            <li>Tap on Link a Device</li>
            <li>Point your phone at this screen to capture the QR code</li>
            <li>Keep your phone connected to the internet during usage</li>
          </ol>
        </div>
      </div>
    </div>
  );
}