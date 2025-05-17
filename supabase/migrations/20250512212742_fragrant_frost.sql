/*
  # Criação das tabelas de tickets e mensagens

  1. Novas Tabelas
    - `tickets`
      - `id` (uuid, chave primária)
      - `customer_id` (texto)
      - `customer_name` (texto)
      - `customer_phone` (texto)
      - `status` (enum)
      - `priority` (enum)
      - `assigned_to` (uuid, referência a auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `messages`
      - `id` (uuid, chave primária)
      - `ticket_id` (uuid, chave estrangeira)
      - `content` (texto)
      - `sender` (enum)
      - `agent_id` (uuid, referência a auth.users)
      - `read` (boolean)
      - `created_at` (timestamp)

  2. Segurança
    - RLS habilitado em ambas as tabelas
    - Políticas para leitura e escrita baseadas em autenticação
*/

-- Criar enum para status do ticket
CREATE TYPE ticket_status AS ENUM ('pending', 'in-progress', 'resolved');

-- Criar enum para prioridade do ticket
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high');

-- Criar enum para tipo de remetente
CREATE TYPE message_sender AS ENUM ('customer', 'agent');

-- Criar tabela de tickets
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  status ticket_status NOT NULL DEFAULT 'pending',
  priority ticket_priority NOT NULL DEFAULT 'medium',
  assigned_to uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de mensagens
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES tickets(id) ON DELETE CASCADE,
  content text NOT NULL,
  sender message_sender NOT NULL,
  agent_id uuid REFERENCES auth.users(id),
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Políticas para tickets
CREATE POLICY "Tickets são visíveis para usuários autenticados"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Agentes podem criar tickets"
  ON tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Agentes podem atualizar tickets"
  ON tickets
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para mensagens
CREATE POLICY "Mensagens são visíveis para usuários autenticados"
  ON messages
  FOR SELECT
  TO authenticated
  USING (ticket_id IN (SELECT id FROM tickets));

CREATE POLICY "Agentes podem criar mensagens"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (ticket_id IN (SELECT id FROM tickets));

CREATE POLICY "Agentes podem atualizar mensagens"
  ON messages
  FOR UPDATE
  TO authenticated
  USING (ticket_id IN (SELECT id FROM tickets))
  WITH CHECK (ticket_id IN (SELECT id FROM tickets));

-- Função para atualizar o updated_at do ticket
CREATE OR REPLACE FUNCTION update_ticket_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_ticket_updated_at();