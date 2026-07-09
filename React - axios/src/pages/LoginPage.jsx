import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getApiError } from '../utils/getApiError';

// JSON
const initialForm = {
  name: '',
  email: '',
  password: '',
};

export default function LoginPage() {
  const navigate = useNavigate();

  const { user, login, register } = useAuth();

  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  if (user?.role === 'admin') {
    navigate('/admin', { replace: true });
  }

  //   login or signup
  function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError('');

    try {
      if (mode === 'login') {
        login({
          email: form.email,
          password: form.password,
        });

        // route
        navigate('/admin', { replace: true });
      } else {
        register({
          name: form.name,
          email: form.email,
          password: form.password,
        });
      }
    } catch (err) {
      setError(getApiError(err.message));
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-stack page-stack--center">
      <section className="auth-card">
        <h1>{mode === 'login' ? 'Admin sign in' : 'Create account'}</h1>
        {error ? <p className="form-error">{error}</p> : null}

        <form onSubmit={handleSubmit}>
          {mode === 'register' ? (
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
          ) : null}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <div className="form-actions auth-actions">
            <button type="submit" disabled={saving}>
              {saving
                ? mode === 'login'
                  ? 'Signing in...'
                  : 'Creating account...'
                : mode === 'login'
                  ? 'Sign in'
                  : 'Register'}
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setMode((current) =>
                  current === 'login' ? 'register' : 'login',
                );
                setError('');
              }}
            >
              {mode === 'login' ? 'Need an account?' : 'Have an account?'}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
