import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { Alert } from '../components/ui';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.nombre.trim() || !form.email.trim() || !form.password || !form.confirm)
      return 'Todos los campos son obligatorios.';
    if (!EMAIL_RE.test(form.email.trim())) return 'El correo electrónico no tiene un formato válido.';
    if (form.password !== form.confirm) return 'Las contraseñas no coinciden.';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const problem = validate();
    if (problem) return setError(problem);

    setLoading(true);
    try {
      const res = await register(form.nombre.trim(), form.email.trim(), form.password);
      setSuccess(`${res.msg || 'Usuario registrado'}. Redirigiendo al inicio de sesión...`);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={onSubmit} noValidate>
        <div className="auth-brand">
          <span className="brand-logo big">✚</span>
          <h1>Crear cuenta</h1>
          <p>Droguería Alianza JyJ</p>
        </div>

        <Alert type="error">{error}</Alert>
        <Alert type="success">{success}</Alert>

        <label>Nombre completo
          <input name="nombre" value={form.nombre} onChange={onChange} autoComplete="name" />
        </label>
        <label>Correo electrónico
          <input type="email" name="email" value={form.email} onChange={onChange} autoComplete="email" />
        </label>
        <label>Contraseña
          <input type="password" name="password" value={form.password} onChange={onChange} autoComplete="new-password" />
        </label>
        <label>Confirmar contraseña
          <input type="password" name="confirm" value={form.confirm} onChange={onChange} autoComplete="new-password" />
        </label>

        <button className="btn btn-primary" disabled={loading || !!success}>
          {loading ? <><span className="spinner light" /> Registrando...</> : 'Registrarse'}
        </button>

        <p className="auth-link">¿Ya tienes cuenta? <Link to="/login">Volver al inicio de sesión</Link></p>
      </form>
    </div>
  );
}
