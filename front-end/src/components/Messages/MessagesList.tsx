import { Message } from "../../types/Message";

export default function MessagesList({ messages }: { messages: Message[] }) {

  if (!messages) return <p>Loading messages…</p>;

  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>
          <strong>{message.user}:</strong> {message.text}
          <br />
          <small>{new Date(message.timestamp).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
}
