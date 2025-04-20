type Message = {
  text: string;
  user: string;
  timestamp: string;
};

export default function MessagesList({ messages }: { messages: Message[] }) {

  if (!messages) return <p>Loading messages…</p>;

  return (
    <ul>
      {messages.map((m, i) => (
        <li key={i}>
          <strong>{m.user}:</strong> {m.text}
          <br />
          <small>{new Date(m.timestamp).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
}
