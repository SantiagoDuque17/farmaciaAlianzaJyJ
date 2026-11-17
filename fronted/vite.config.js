import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Puerto 5173: es el origen permitido por CORS en el backend (CORS_ORIGIN)
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
});
