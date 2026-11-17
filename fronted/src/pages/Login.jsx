import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/ui';

export default function Login() {
  const { login, sessionMessage } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email.trim() || !form.password) {
      return setError('Ingresa tu correo y tu contraseña.');
    }
    setLoading(true);
    try {
      await login(form.email.trim(), form.password);
      navigate('/dashboard', { replace: true });
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
          <h1>Droguería Alianza JyJ</h1>
          <p>Sistema de gestión de farmacia</p>
        </div>

        <Alert type="error">{sessionMessage}</Alert>
        <Alert type="error">{error}</Alert>

        <label>Correo electrónico
          <input type="email" name="email" value={form.email} onChange={onChange}
                 placeholder="correo@ejemplo.com" autoComplete="email" />
        </label>
        <label>Contraseña
          <input type="password" name="password" value={form.password} onChange={onChange}
                 placeholder="••••••••" autoComplete="current-password" />
        </label>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? <><span className="spinner light" /> Ingresando...</> : 'Iniciar sesión'}
        </button>

        <p className="auth-link">¿No tienes cuenta? <Link to="/register">Crear una cuenta</Link></p>
      </form>
    </div>
  );
}
