import { Alert } from '../components/ui';

// El backend NO tiene modelo, controlador ni rutas de categorías: no se simulan datos.
export default function Categorias() {
  return (
    <>
      <h2>Categorías</h2>
      <Alert type="info">
        Esta funcionalidad aún no está disponible: el backend no tiene un endpoint de categorías
        (ni la tabla de productos tiene un campo de categoría). Cuando se implemente
        (por ejemplo <code>GET /api/categorias</code>), se conecta aquí.
      </Alert>
    </>
  );
}
