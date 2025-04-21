import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type MessageStatus = 'idle' | 'sending' | 'error' | 'sent';

interface MessageFormProps {
  onMessageSent: () => void;
}

export default function MessageForm({ onMessageSent }: MessageFormProps) {
  const { getAccessTokenSilently } = useAuth0();
  const [text, setText] = useState('');
  const [status, setStatus] = useState<MessageStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) return;

    setStatus('sending');

    try {
      const token = await getAccessTokenSilently();

      const response = await fetch('http://localhost:3011/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setText('');
      setStatus('sent');
      onMessageSent();
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a message..."
      />
      <button type="submit" disabled={status === 'sending'}>
        Send
      </button>

      {status === 'sending' && <span className="status sending">Sending…</span>}
      {status === 'error' && <span className="status error">Error!</span>}
      {status === 'sent' && <span className="status sent">Sent!</span>}
    </form>
  );
}
