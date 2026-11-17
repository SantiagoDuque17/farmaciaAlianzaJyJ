# Despliegue: Aiven (MySQL) → Render (backend) → Vercel (frontend)

Orden obligatorio: 1) Aiven, 2) Render, 3) Vercel, 4) volver a Render a poner la URL de Vercel.

## 1. Aiven – MySQL
1. Crear servicio MySQL (plan Free). Copiar Host, Port, User, Password, Database (`defaultdb`).
2. Exportar tu base local e importarla:
   ```bash
   mysqldump -u root -p alianzajyj_drogueria > backup.sql
   mysql -h HOST -P PORT -u avnadmin -p --ssl --init-command="SET SESSION sql_require_primary_key=0" defaultdb < backup.sql
   ```
   - Con el cliente de XAMPP (MariaDB) se usa `--ssl`, no `--ssl-mode`.
   - En Aiven, el usuario debe usar autenticación `mysql_native_password`.
   - Si el dump trae `CREATE DATABASE`/`USE`, bórralas del .sql.
   - El backend usa las tablas: `usuario`, `producto`, `venta`, `detalle_venta`, `movimiento_inventario`, `cliente`.

## 2. Render – Backend (Web Service)
- Repo con la carpeta `backend` → **Root Directory:** `backend`
- Build: `npm install` · Start: `npm start`
- Variables de entorno:
  ```
  DB_HOST=...aivencloud.com
  DB_PORT=<puerto de Aiven>
  DB_USER=avnadmin
  DB_PASSWORD=...
  DB_NAME=defaultdb
  DB_SSL=true
  JWT_SECRET=<cadena larga aleatoria>
  CORS_ORIGIN=https://TU-APP.vercel.app   (se pone en el paso 4)
  ```
  (No definas `PORT`; Render lo asigna solo.)
- Prueba: abrir `https://TU-BACKEND.onrender.com/` → debe responder `{ok:true,...}`.

## 3. Vercel – Frontend
- **Root Directory:** `fronted` · Framework: Vite (build `npm run build`, output `dist`)
- Variable de entorno: `VITE_API_URL=https://TU-BACKEND.onrender.com` (sin `/` final)
- `vercel.json` ya incluido (evita 404 al recargar rutas de React Router).

## 4. Cerrar el círculo
En Render, poner `CORS_ORIGIN` = URL exacta de Vercel (sin `/` final) y redeploy.
Si usas varias (preview), sepáralas con coma.

## Notas
- Render Free se duerme: la primera petición tarda ~1 min.
- Cambiar `VITE_API_URL` en Vercel requiere un nuevo deploy (se embebe al compilar).
