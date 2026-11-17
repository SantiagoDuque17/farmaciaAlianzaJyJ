import { usuariosService } from '../services/dataService';
import { useFetch } from '../components/useFetch';
import { Alert, Loading } from '../components/ui';

export default function Usuarios() {
  const { data: usuarios, loading, error } = useFetch(usuariosService.getAll);

  if (loading) return <Loading />;
  if (error) return <Alert>{error}</Alert>;

  return (
    <>
      <h2>Usuarios</h2>
      <section className="card">
        {usuarios.length === 0 ? <p className="muted">No hay usuarios.</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th></tr></thead>
              <tbody>
                {usuarios.map((u) => <tr key={u.id}><td>{u.id}</td><td>{u.nombre}</td><td>{u.email}</td><td>{u.rol}</td></tr>)}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
