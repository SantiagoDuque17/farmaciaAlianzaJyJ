// Componentes pequeños reutilizables

export const Alert = ({ type = 'error', children }) =>
  children ? <div className={`alert alert-${type}`} role="alert">{children}</div> : null;

export const StatCard = ({ icon, label, value, note }) => (
  <div className="card stat">
    <div className="stat-icon">{icon}</div>
    <div>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {note && <p className="stat-note">{note}</p>}
    </div>
  </div>
);

export const Loading = ({ text = 'Cargando...' }) => (
  <p className="loading"><span className="spinner" /> {text}</p>
);

export const money = (n) =>
  Number(n).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

// El backend solo guarda stock; el estado se deduce de él
export const estadoProducto = (p) => (Number(p.stock) > 0 ? 'Disponible' : 'Agotado');

export const EstadoBadge = ({ producto }) => {
  const e = estadoProducto(producto);
  return <span className={`badge ${e === 'Disponible' ? 'badge-ok' : 'badge-off'}`}>{e}</span>;
};
