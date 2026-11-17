# Droguería Alianza JyJ – Backend + Frontend

```
proyecto/
├── backend/   API Node.js + Express + MySQL + JWT   (puerto 3000)
└── fronted/   Interfaz React + Vite                 (puerto 5173)
```

## Levantar el proyecto
1. **Base de datos**: MySQL/XAMPP encendido con la base `farmaciaalianzajyj` y las tablas `usuarios`, `productos`, `ventas`.
2. **Backend**
   ```bash
   cd backend
   npm install
   npm run dev        # o: npm start
   ```
3. **Frontend** (otra terminal)
   ```bash
   cd fronted
   npm install
   npm run dev        # abre http://localhost:5173
   ```

## Variables de entorno
`backend/.env` (ver `.env.example`): `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`,
`DB_POOL_LIMIT`, **`JWT_SECRET`** (secreto para firmar tokens), **`CORS_ORIGIN`** (orígenes permitidos del frontend).

`fronted/.env` (ver `.env.example`): **`VITE_API_URL`** = URL del backend (por defecto `http://localhost:3000`).

## Flujo de autenticación
1. `Login` → `POST /api/auth/login` `{email, password}`. El backend busca el usuario, compara con `bcrypt` y devuelve `{ok, token, user}` (JWT, 24 h).
2. El frontend guarda el token (`localStorage`) en `AuthContext`.
3. `services/api.js` agrega `Authorization: Bearer <token>` a cada petición protegida.
4. El backend valida el token en `auth.middleware.js`. Si responde 401, el frontend cierra la sesión y vuelve al Login.
5. `ProtectedRoute` bloquea las rutas privadas; `PublicRoute` evita mostrar Login/Register con sesión activa.
6. Cerrar sesión borra el token y el usuario guardados.
