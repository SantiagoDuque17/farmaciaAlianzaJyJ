import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { to: '/productos', icon: '💊', label: 'Productos' },
  { to: '/inventario', icon: '📦', label: 'Inventario' },
  { to: '/categorias', icon: '🏷️', label: 'Categorías' },
  { to: '/ventas', icon: '🧾', label: 'Ventas' },
  { to: '/usuarios', icon: '👥', label: 'Usuarios' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="app">
      <header className="topbar">
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menú">☰</button>
        <span className="brand-small">💚 Droguería Alianza JyJ</span>
      </header>

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <span className="brand-logo">✚</span>
          <div>
            <strong>Droguería</strong>
            <small>Alianza JyJ</small>
          </div>
        </div>

        <nav onClick={() => setOpen(false)}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              <span>{l.icon}</span> {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          {user && <p className="user-name">👤 {user.nombre || user.email}</p>}
          <button className="btn btn-outline" onClick={() => logout()}>🚪 Cerrar sesión</button>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
