// src/Callback.tsx
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Callback() {
    const { handleRedirectCallback, isLoading, error } = useAuth0();
    const { search } = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {

      // bail out if someone just browsed here manually
      if (!search.includes('code=') || !search.includes('state=')) {
        return;
      }
      (async () => {
        const result = await handleRedirectCallback();
        navigate(result?.appState?.returnTo || '/');
      })();
    }, [search, handleRedirectCallback, navigate]);

  if (isLoading) return <p>Processing login…</p>;
  if (error) return <p>Oops: {error.message}</p>;
  return <>'Callback temporary content</>;
}
