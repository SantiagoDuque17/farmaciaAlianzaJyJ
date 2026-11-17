import { useState } from 'react';
import { productosService, ventasService } from '../services/dataService';
import { useFetch } from '../components/useFetch';
import { Alert, Loading, money } from '../components/ui';

const loadAll = async () => {
  const [productos, ventas] = await Promise.all([productosService.getAll(), ventasService.getAll()]);
  return { productos, ventas };
};

export default function Ventas() {
  const { data, loading, error, reload } = useFetch(loadAll);
  const [form, setForm] = useState({ producto_id: '', cantidad: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    if (!form.producto_id || !form.cantidad || Number(form.cantidad) < 1) {
      return setMsg({ type: 'error', text: 'Selecciona un producto e indica una cantidad válida.' });
    }
    setSaving(true);
    try {
      await ventasService.create({ producto_id: Number(form.producto_id), cantidad: Number(form.cantidad) });
      setForm({ producto_id: '', cantidad: '' });
      setMsg({ type: 'success', text: 'Venta registrada correctamente.' });
      reload();
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Alert>{error}</Alert>;

  const nombreDe = (id) => data.productos.find((p) => p.id === id)?.nombre ?? `Producto #${id}`;

  return (
    <>
      <h2>Ventas</h2>

      <section className="card">
        <h3>Registrar venta</h3>
        <Alert type={msg.type || 'error'}>{msg.text}</Alert>
        <form className="inline-form" onSubmit={onSubmit} noValidate>
          <label>Producto
            <select name="producto_id" value={form.producto_id} onChange={onChange}>
              <option value="">Selecciona...</option>
              {data.productos.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
          </label>
          <label>Cantidad
            <input type="number" min="1" name="cantidad" value={form.cantidad} onChange={onChange} />
          </label>
          <button className="btn btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Registrar'}</button>
        </form>
      </section>

      <section className="card">
        <h3>Ventas realizadas ({data.ventas.length})</h3>
        {data.ventas.length === 0 ? <p className="muted">No hay ventas registradas.</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Producto</th><th>Cantidad</th><th>Total</th>{data.ventas[0].fecha !== undefined && <th>Fecha</th>}</tr></thead>
              <tbody>
                {data.ventas.map((v) => (
                  <tr key={`${v.id}-${v.producto_id}`}>
                    <td>{v.id}</td><td>{nombreDe(v.producto_id)}</td><td>{v.cantidad}</td><td>{money(v.total)}</td>
                    {v.fecha !== undefined && <td>{v.fecha ? new Date(v.fecha).toLocaleString('es-CO') : '—'}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
