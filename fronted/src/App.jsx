import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Inventario from './pages/Inventario';
import Categorias from './pages/Categorias';
import Ventas from './pages/Ventas';
import Usuarios from './pages/Usuarios';

export default function App() {
  return (
    <Routes>
      {/* Públicas: si ya hay sesión, redirigen al dashboard */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Privadas: requieren sesión */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
