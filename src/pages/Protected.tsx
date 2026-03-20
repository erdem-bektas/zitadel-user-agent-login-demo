import { useAuth } from "react-oidc-context";
import { useState, useEffect } from "react";

export default function Protected() {
  const auth = useAuth();
  const [showTokens, setShowTokens] = useState(false);
  const [backendData, setBackendData] = useState<any>(null);
  const [loadingBackend, setLoadingBackend] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBackendData() {
      if (auth.isAuthenticated && auth.user?.access_token) {
        setLoadingBackend(true);
        setBackendError(null);
        try {
          const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
          const res = await fetch(`${backendUrl}/api/protected`, {
            headers: {
              Authorization: `Bearer ${auth.user.access_token}`
            }
          });

          if (!res.ok) {
            throw new Error(`Backend returned status ${res.status}`);
          }

          const data = await res.json();
          setBackendData(data);
        } catch (err: any) {
          setBackendError(err.message || 'Failed to fetch backend data');
        } finally {
          setLoadingBackend(false);
        }
      }
    }

    fetchBackendData();
  }, [auth.isAuthenticated, auth.user?.access_token]);

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

        <div className="glass-card backend-data-card animate-slide-up" style={{ animationDelay: "0.3s", gridColumn: "1 / -1" }}>
          <div className="card-header">
            <h3>Backend Data (Özel Bilgi)</h3>
            <span className="badge">API Response</span>
          </div>
          <div className="backend-details" style={{ padding: "16px" }}>
            {loadingBackend ? (
              <p style={{ color: "var(--text-secondary)" }}>Fetching data from backend...</p>
            ) : backendError ? (
              <p style={{ color: "#ef4444" }}>Error: {backendError}</p>
            ) : backendData ? (
              <div className="detail-item-column" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p><strong>Message:</strong> <span style={{ color: "var(--primary-color)" }}>{backendData.message}</span></p>
                <div className="debug-box animate-fade-in" style={{ marginTop: "10px" }}>
                  <pre>{JSON.stringify(backendData, null, 2)}</pre>
                </div>
              </div>
            ) : (
              <p style={{ color: "var(--text-secondary)" }}>No data fetched yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
