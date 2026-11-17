import { useState } from 'react';
import { productosService } from '../services/dataService';
import { useFetch } from '../components/useFetch';
import { Alert, Loading, EstadoBadge, money } from '../components/ui';

export default function Productos() {
  const { data: productos, loading, error, reload } = useFetch(productosService.getAll);
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    if (!form.nombre.trim() || !form.precio) {
      return setMsg({ type: 'error', text: 'Nombre y precio son obligatorios.' });
    }
    setSaving(true);
    try {
      await productosService.create({
        nombre: form.nombre.trim(),
        precio: Number(form.precio),
        stock: form.stock === '' ? 0 : Number(form.stock),
      });
      setForm({ nombre: '', precio: '', stock: '' });
      setMsg({ type: 'success', text: 'Producto creado correctamente.' });
      reload();
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const filtered = (productos || []).filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <h2>Productos</h2>

      <section className="card">
        <h3>Nuevo producto</h3>
        <Alert type={msg.type || 'error'}>{msg.text}</Alert>
        <form className="inline-form" onSubmit={onSubmit} noValidate>
          <label>Nombre<input name="nombre" value={form.nombre} onChange={onChange} /></label>
          <label>Precio<input type="number" min="0" name="precio" value={form.precio} onChange={onChange} /></label>
          <label>Stock<input type="number" min="0" name="stock" value={form.stock} onChange={onChange} /></label>
          <button className="btn btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
        </form>
      </section>

      <section className="card">
        <div className="row-between">
          <h3>Listado</h3>
          <input className="search" placeholder="Buscar producto..." value={search}
                 onChange={(e) => setSearch(e.target.value)} />
        </div>
        {loading && <Loading />}
        <Alert>{error}</Alert>
        {productos && (filtered.length === 0 ? <p className="muted">Sin resultados.</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Producto</th><th>Precio</th><th>Stock</th><th>Estado</th></tr></thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td><td>{p.nombre}</td><td>{money(p.precio)}</td>
                    <td>{p.stock}</td><td><EstadoBadge producto={p} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </>
  );
}
