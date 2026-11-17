import { get, post } from './api';

// Todas las respuestas del backend tienen la forma { ok, data }
const list = async (path) => (await get(path)).data;

export const productosService = {
  getAll: () => list('/api/productos'),
  create: (producto) => post('/api/productos', producto),
};

export const ventasService = {
  getAll: () => list('/api/ventas'),
  create: (venta) => post('/api/ventas', venta),
};

export const usuariosService = {
  getAll: () => list('/api/usuarios'),
};
