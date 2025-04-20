import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function MessageForm({ onMessageSent }: { onMessageSent: () => void }) {

  const { getAccessTokenSilently } = useAuth0();
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setStatus('sending');

    try {
      const token = await getAccessTokenSilently();
      await fetch('http://localhost:3011/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      setText('');
      setStatus('sent');
      onMessageSent(); // 🔁 refresh messages
    } catch (e) {
      console.error('Submission error:', e);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a message..."
      />
      <button type="submit">Send</button>
      {status === 'sending' && <span> Sending…</span>}
      {status === 'error' && <span style={{ color: 'red' }}> Error!</span>}
      {status === 'sent' && <span style={{ color: 'green' }}> Sent!</span>}
    </form>
  );
}
