/* oxlint-disable react/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { login as loginRequest, register as registerRequest } from "../services/authService";
import { getCurrentUser } from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("nexo_token")));
  const sessionVersion = useRef(0);

  const clearSession = () => {
    sessionVersion.current += 1;
    localStorage.removeItem("nexo_token");
    localStorage.removeItem("nexo_user");
    setUser(null);
  };

  const logout = () => {
    clearSession();
    setLoading(false);
  };

  const refreshUser = async (token = localStorage.getItem("nexo_token"), version = sessionVersion.current) => {
    if (!token) throw new Error("Não há uma sessão ativa.");
    const current = await getCurrentUser(token);
    if (version !== sessionVersion.current || token !== localStorage.getItem("nexo_token")) return null;
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
    clearSession();
    const version = sessionVersion.current;
    const token = await loginRequest(credentials);
    if (!token) throw new Error("Não foi possível iniciar sua sessão.");
    if (version !== sessionVersion.current) throw new Error("Esta tentativa de login foi substituída por uma sessão mais recente.");
    const normalizedToken = token.replace(/^Bearer\s+/i, "");
    localStorage.setItem("nexo_token", normalizedToken);
    try {
      return await refreshUser(normalizedToken, version);
    } catch (error) {
      if (version === sessionVersion.current) clearSession();
      throw error;
    }
  };

  const signUp = (data) => registerRequest(data);

  return <AuthContext.Provider value={{ user, loading, isAuthenticated: Boolean(user), signIn, signUp, logout, refreshUser }}>
    {children}
  </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
