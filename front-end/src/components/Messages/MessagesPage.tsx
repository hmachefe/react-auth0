import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';

export default function MessagesPage() {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch('http://localhost:3011/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { messages } = await res.json();
      setMessages(messages);
    } catch (e) {
      console.error('Failed to fetch messages:', e);
    }
  };

  useEffect(() => {
    if (!isLoading) fetchMessages();
  }, [isLoading]);

  return (
    <div className="container">
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            backgroundColor: '#fff',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: '1000px'
        }}
        >
        <img
            src="/images/auth0-logo.png"
            alt="Auth0"
            style={{
            width: '40px',
            height: '40px',
            objectFit: 'contain',
            flexShrink: 0
            }}
        />
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>
            Messages pulled from the protected Express API (back-end side) using your <strong>Auth0 JWT access token</strong>
        </h1>
        </div>

    <MessageForm onMessageSent={fetchMessages} />
    <MessagesList messages={messages} />
    </div>

  );
}
