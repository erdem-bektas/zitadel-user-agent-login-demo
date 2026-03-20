import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If successfully authenticated, or an error occurred, redirect.
    if (auth.isAuthenticated) {
      navigate("/protected", { replace: true });
    } else if (auth.error) {
      console.error("Auth error", auth.error);
      navigate("/", { replace: true });
    } else if (!auth.activeNavigator) {
        // If not authenticated and no active navigator (like signinRedirectCallback is already done)
        navigate("/", { replace: true });
    }
  }, [auth.isAuthenticated, auth.error, auth.activeNavigator, navigate]);

  return (
    <div className="page-container callback-page">
      <div className="glass-card loading-card">
        <div className="spinner"></div>
        <h2>Authenticating</h2>
        <p>Please wait while we securely log you in...</p>
      </div>
    </div>
  );
}
