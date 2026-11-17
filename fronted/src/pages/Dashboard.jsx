import { productosService, ventasService } from '../services/dataService';
import { useFetch } from '../components/useFetch';
import { Alert, Loading, StatCard, EstadoBadge, money } from '../components/ui';

// Carga productos y ventas por separado: si una falla, la otra sigue mostrándose
const loadAll = async () => {
  const [p, v] = await Promise.allSettled([productosService.getAll(), ventasService.getAll()]);
  return { productos: p, ventas: v };
};

export default function Dashboard() {
  const { data, loading, error } = useFetch(loadAll);

  if (loading) return <Loading />;
  if (error) return <Alert>{error}</Alert>;

  const productos = data.productos.status === 'fulfilled' ? data.productos.value : null;
  const ventas = data.ventas.status === 'fulfilled' ? data.ventas.value : null;

  return (
    <>
      <h2>Dashboard</h2>
      {data.productos.status === 'rejected' && <Alert>Productos: {data.productos.reason.message}</Alert>}
      {data.ventas.status === 'rejected' && <Alert>Ventas: {data.ventas.reason.message}</Alert>}

      <div className="grid-cards">
        <StatCard icon="💊" label="Total de productos" value={productos ? productos.length : '—'} />
        <StatCard icon="✅" label="Productos disponibles"
                  value={productos ? productos.filter((p) => Number(p.stock) > 0).length : '—'} />
        <StatCard icon="🏷️" label="Categorías registradas" value="N/D"
                  note="El backend aún no tiene endpoint de categorías" />
        <StatCard icon="🧾" label="Ventas realizadas" value={ventas ? ventas.length : '—'} />
      </div>

      {productos && (
        <section className="card">
          <h3>Productos</h3>
          {productos.length === 0 ? <p className="muted">No hay productos registrados.</p> : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th></tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nombre}</td>
                      <td>{p.categoria ?? '—'}</td>
                      <td>{money(p.precio)}</td>
                      <td>{p.stock}</td>
                      <td><EstadoBadge producto={p} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </>
  );
}
