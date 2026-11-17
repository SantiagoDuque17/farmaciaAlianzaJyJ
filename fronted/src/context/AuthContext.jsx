import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { tokenStorage, setUnauthorizedHandler } from '../services/api';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

// Lee el campo "exp" del JWT (solo para saber si ya venció; la validación real la hace el backend)
function isExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function initialToken() {
  const t = tokenStorage.get();
  if (t && !isExpired(t)) return t;
  tokenStorage.clear();
  return null;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(() => (initialToken() ? tokenStorage.getUser() : null));
  const [sessionMessage, setSessionMessage] = useState('');

  const logout = useCallback((message = '') => {
    tokenStorage.clear();
    setToken(null);
    setUser(null);
    setSessionMessage(typeof message === 'string' ? message : '');
  }, []);

  // Si cualquier petición protegida recibe 401, se cierra la sesión
  useEffect(() => { setUnauthorizedHandler(logout); }, [logout]);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (!res.token) throw new Error('El servidor no devolvió un token');
    tokenStorage.save(res.token, res.user);
    setToken(res.token);
    setUser(res.user || null);
    setSessionMessage('');
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated: !!token, login, logout, sessionMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
