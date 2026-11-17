import { productosService } from '../services/dataService';
import { useFetch } from '../components/useFetch';
import { Alert, Loading, StatCard, EstadoBadge, money } from '../components/ui';

// El backend no tiene un módulo "inventario" separado: el stock vive en la tabla productos.
export default function Inventario() {
  const { data: productos, loading, error } = useFetch(productosService.getAll);

  if (loading) return <Loading />;
  if (error) return <Alert>{error}</Alert>;

  const unidades = productos.reduce((t, p) => t + Number(p.stock || 0), 0);
  const valor = productos.reduce((t, p) => t + Number(p.stock || 0) * Number(p.precio || 0), 0);
  const agotados = productos.filter((p) => Number(p.stock) <= 0).length;

  return (
    <>
      <h2>Inventario</h2>
      <Alert type="info">El inventario se calcula a partir del stock de cada producto (no existe un endpoint de inventario separado).</Alert>

      <div className="grid-cards">
        <StatCard icon="📦" label="Unidades en stock" value={unidades} />
        <StatCard icon="💰" label="Valor del inventario" value={money(valor)} />
        <StatCard icon="⚠️" label="Productos agotados" value={agotados} />
      </div>

      <section className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Producto</th><th>Stock</th><th>Precio unitario</th><th>Valor en stock</th><th>Estado</th></tr></thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td><td>{p.stock}</td><td>{money(p.precio)}</td>
                  <td>{money(Number(p.stock) * Number(p.precio))}</td>
                  <td><EstadoBadge producto={p} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
