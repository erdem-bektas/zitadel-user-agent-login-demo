import { useAuth } from "react-oidc-context";
import { useState } from "react";

export default function Protected() {
  const auth = useAuth();
  const [showTokens, setShowTokens] = useState(false);

  // Use auth.user to get user info 
  const user = auth.user?.profile;
  const username = user?.preferred_username || user?.name || user?.email || "User";

  if (!auth.isAuthenticated) {
    return null; // The redirect is handled in App.tsx
  }

  return (
    <div className="page-container dashboard-page">
      <div className="dashboard-header animate-slide-down">
        <h1>Welcome back, <span className="text-gradient">{username}</span></h1>
        <p>This is a protected route. Only authenticated users can see this.</p>
      </div>

      <div className="dashboard-grid">
        <div className="glass-card profile-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="card-header">
            <h3>Profile Information</h3>
            <span className="badge">Active Session</span>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <span className="label">Name</span>
              <span className="value">{user?.name || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email</span>
              <span className="value">{user?.email || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="label">Subject (ID)</span>
              <span className="value">{user?.sub || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="glass-card token-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="card-header">
            <h3>Security Tokens</h3>
            <button 
              className="btn-text" 
              onClick={() => setShowTokens(!showTokens)}
            >
              {showTokens ? "Hide" : "Show"} Debug Info
            </button>
          </div>
          
          <div className="token-details">
            <div className="detail-item">
              <span className="label">Access Token</span>
              <span className="value compact-token">
                {auth.user?.access_token ? "••••••••••••••••" : "Missing"}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Refresh Token</span>
              <span className="value compact-token">
                 {auth.user?.refresh_token ? "•••••••••••••••• (Active)" : "None active"}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Expires At</span>
              <span className="value">
                {auth.user?.expires_at ? new Date(auth.user.expires_at * 1000).toLocaleString() : "Unknown"}
              </span>
            </div>
          </div>

          {showTokens && (
            <div className="debug-box animate-fade-in">
              <pre>
                {JSON.stringify(auth.user?.profile, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
