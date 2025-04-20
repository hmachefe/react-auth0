import { useAuth0 } from '@auth0/auth0-react';

export default function Home() {
  const { isAuthenticated } = useAuth0();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome!</h1>
      <p>
        This is a public page. Click{' '}
        {isAuthenticated ? (
          <strong>“Log Out”</strong>
        ) : (
          <strong>“Log In”</strong>
        )}{' '}
        to {isAuthenticated ? 'sign out' : 'authenticate'}.
      </p>
    </div>
  );
}
