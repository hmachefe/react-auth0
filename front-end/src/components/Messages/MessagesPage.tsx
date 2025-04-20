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
    <div style={{ padding: '2rem' }}>
      <h1>Messages pulled from the protected Express API (back-end side) using your Auth0 JWT access token</h1>
      <MessageForm onMessageSent={fetchMessages} />
      <MessagesList messages={messages} />
    </div>
  );
}
