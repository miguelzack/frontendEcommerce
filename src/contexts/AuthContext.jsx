/* oxlint-disable react/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { login as loginRequest, register as registerRequest } from "../services/authService";
import { getCurrentUser } from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("nexo_user") || "null"));
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("nexo_token")));

  const logout = () => {
    localStorage.removeItem("nexo_token");
    localStorage.removeItem("nexo_user");
    setUser(null);
  };

  const refreshUser = async () => {
    const current = await getCurrentUser();
    setUser(current);
    localStorage.setItem("nexo_user", JSON.stringify(current));
    return current;
  };

  useEffect(() => {
    if (localStorage.getItem("nexo_token")) refreshUser().catch(logout).finally(() => setLoading(false));
    else setLoading(false);
    window.addEventListener("session-expired", logout);
    return () => window.removeEventListener("session-expired", logout);
  }, []);

  const signIn = async (credentials) => {
    const token = await loginRequest(credentials);
    if (!token) throw new Error("Não foi possível iniciar sua sessão.");
    localStorage.setItem("nexo_token", token.replace(/^Bearer\s+/i, ""));
    return refreshUser();
  };

  const signUp = (data) => registerRequest(data);

  return <AuthContext.Provider value={{ user, loading, isAuthenticated: Boolean(user), signIn, signUp, logout, refreshUser }}>
    {children}
  </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
