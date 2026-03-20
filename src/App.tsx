import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import Landing from './pages/Landing';
import Protected from './pages/Protected';
import Callback from './pages/Callback';

function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">ZitadelDemo</div>
          <div className="nav-links">
            {auth.isAuthenticated ? (
              <button 
                className="btn-outline" 
                onClick={() => void auth.signoutRedirect()}
              >
                Log Out
              </button>
            ) : (
              <button 
                className="btn-primary" 
                onClick={() => void auth.signinRedirect()}
              >
                Login
              </button>
            )}
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/callback" element={<Callback />} />
            <Route 
              path="/protected" 
              element={
                auth.isAuthenticated ? <Protected /> : <Navigate to="/" replace />
              } 
            />
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
