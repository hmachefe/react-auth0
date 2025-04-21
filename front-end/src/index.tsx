import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

// Auth0 environment variables
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = 'https://my‑api.example.com';
const redirectUri = window.location.origin + '/callback';

if (!domain || !clientId) {
  throw new Error(
    'Missing Auth0 configuration: Make sure REACT_APP_AUTH0_DOMAIN and REACT_APP_AUTH0_CLIENT_ID are defined.'
  );
}

// Optional: Debug in development only
if (process.env.NODE_ENV === 'development') {
  console.log('Auth0 Domain:', domain);
  console.log('Auth0 ClientId:', clientId);
  console.log('Redirect URI:', redirectUri);
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ audience, redirect_uri: redirectUri }}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
