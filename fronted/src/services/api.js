// Configuración centralizada de las peticiones HTTP al backend.
// La URL viene de la variable de entorno VITE_API_URL (ver .env).
import axios from 'axios';

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

// Instancia única de axios: baseURL viene de VITE_API_URL (en Vercel = URL de Render)
const http = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000, // Render free puede tardar en despertar
});

const TOKEN_KEY = 'farmacia_token';
const USER_KEY = 'farmacia_user';

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  getUser: () => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
  },
  save: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

// El AuthContext registra aquí qué hacer cuando el backend responde 401 (token inválido/expirado)
let onUnauthorized = null;
export const setUnauthorizedHandler = (fn) => { onUnauthorized = fn; };

export async function request(path, { method = 'GET', body, auth = true } = {}) {
  const token = tokenStorage.get();
  try {
    const res = await http.request({
      url: path,
      method,
      data: body,
      headers: auth && token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    // Sin respuesta: backend apagado, dormido (Render free) o bloqueado por CORS
    if (!err.response) {
      throw new Error('No se pudo conectar con el servidor. Si es el primer acceso, espera ~1 minuto (Render despierta el servicio) y reintenta.');
    }
    const { status, data } = err.response;
    // Token inválido o expirado en una ruta protegida -> cerrar sesión
    if (auth && token && (status === 401 || status === 403) && onUnauthorized) {
      onUnauthorized('Tu sesión expiró o no es válida. Inicia sesión nuevamente.');
    }
    throw new Error(data?.msg || data?.message || `Error ${status}`);
  }
}

export const get = (path) => request(path);
export const post = (path, body) => request(path, { method: 'POST', body });
