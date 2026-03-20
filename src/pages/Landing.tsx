import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page-container landing">
      <div className="hero-section">
        <h1 className="hero-title">
          Secure. Fast. 
          <span className="text-gradient"> Empowered.</span>
        </h1>
        <p className="hero-subtitle">
          Experience seamless authentication powered by Zitadel. Next-generation identity management, integrated simply.
        </p>

        <div className="action-buttons">
          {auth.isAuthenticated ? (
            <button 
              className="btn-primary" 
              onClick={() => navigate('/protected')}
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button 
                className="btn-primary" 
                onClick={() => void auth.signinRedirect()}
              >
                Get Started
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => void auth.signinRedirect({ prompt: 'create' })}
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Secure by Design</h3>
          <p>Built-in OIDC & PKCE auth flows to protect your users effortlessly.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Blazing Fast</h3>
          <p>Zero-overhead integration with lightning-fast token refreshes.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Premium UI</h3>
          <p>Carefully crafted modern components and glassmorphism styling.</p>
        </div>
      </div>
    </div>
  );
}
