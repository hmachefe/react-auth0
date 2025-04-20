import { useAuth0 } from '@auth0/auth0-react';

export default function Profile() {
  const { user, isLoading } = useAuth0();
  if (isLoading) return <div>Loading profile…</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profile</h1>
      <img src={user?.picture} alt="avatar" width={100} />
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
}
