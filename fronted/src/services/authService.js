import { request } from './api';

// POST /api/auth/login -> { ok, token, user }
export const login = (email, password) =>
  request('/api/auth/login', { method: 'POST', body: { email, password }, auth: false });

// POST /api/auth/register -> { ok, msg, data }
export const register = (nombre, email, password) =>
  request('/api/auth/register', { method: 'POST', body: { nombre, email, password }, auth: false });
