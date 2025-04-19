import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function NavBar() {
  const { isAuthenticated } = useAuth0();
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link> |{' '}
      {isAuthenticated && <Link to="/profile">Profile</Link>} |{' '}
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </nav>
  );
}

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
}

function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
}
