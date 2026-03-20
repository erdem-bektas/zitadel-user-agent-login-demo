import React from "react";
import { AuthProvider as OIDCAuthProvider } from "react-oidc-context";
import type { AuthProviderProps } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";

const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_ZITADEL_AUTHORITY || "",
  client_id: import.meta.env.VITE_ZITADEL_CLIENT_ID || "",
  redirect_uri: import.meta.env.VITE_ZITADEL_REDIRECT_URI || "http://localhost:5173/callback",
  post_logout_redirect_uri: import.meta.env.VITE_ZITADEL_POST_LOGOUT_REDIRECT_URI || "http://localhost:5173/",
  // Enable refresh token
  response_type: "code",
  scope: "openid profile email offline_access",
  // Automatically refresh tokens before they expire
  automaticSilentRenew: true,
  // Use localStorage to persist session between tab refreshes
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <OIDCAuthProvider {...oidcConfig}>
      {children}
    </OIDCAuthProvider>
  );
};
