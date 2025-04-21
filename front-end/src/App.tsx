import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Profile from './components/Profile';
import Callback from './components/Callback';
import MessagesPage from './components/Messages/MessagesPage';
import './App.css';
import { ReactNode } from 'react';

/**
 * Wrapper for protected routes using Auth0 authentication.
 * Redirects to home if the user is not authenticated.
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>; // Optional: Replace with a proper spinner
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<Home />} />
        
        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
