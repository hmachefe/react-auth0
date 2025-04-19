import React, { JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
