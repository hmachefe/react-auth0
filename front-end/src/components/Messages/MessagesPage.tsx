import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';
import './MessagesPage.css'; // ➕ custom styles
import { Message } from '../../types/Message';

export default function MessagesPage() {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const token = await getAccessTokenSilently();

      const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:3011';

      const response = await fetch(
        apiBase + '/messages',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const { messages } = await response.json();
      setMessages(messages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  useEffect(() => {
    if (!isLoading) fetchMessages();
  }, [isLoading]); // react-hooks/exhaustive-deps

  return (
    <div className="container">
      <div className="message-header">
        <img
          src="/images/auth0-logo.png"
          alt="Auth0"
          className="auth0-logo"
        />
        <h1 className="message-title">
          Messages pulled from the protected Express API using your{' '}
          <strong>Auth0 JWT access token</strong>
        </h1>
      </div>

      <MessageForm onMessageSent={fetchMessages} />
      <MessagesList messages={messages} />
    </div>
  );
}
