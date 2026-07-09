import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AppLayout() {
  const { loading, user, logout } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  async function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div>
      <header className="site-header">
        <div className="site-header__top">
          <div>
            <p className="eyebrow">React ↔ Express ↔ MongoDB</p>
          </div>

          <div className="header-actions">
            {user ? (
              <div className="user-chip">
                Signed in as{' '}
                <strong>{user.name || user.email || 'Admin'}</strong>
              </div>
            ) : null}

            {loading ? (
              <span className="header-status">Checking session...</span>
            ) : user ? (
              <button
                type="button"
                className="secondary-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button type="button" onClick={() => navigate('/login')}>
                Login
              </button>
            )}
          </div>
        </div>

        <nav className="site-nav" aria-label="Primary">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `site-nav__link${isActive ? ' is-active' : ''}`
            }
          >
            Inventory
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `site-nav__link${isActive ? ' is-active' : ''}`
            }
          >
            {user ? 'Account' : 'Login'}
          </NavLink>
          {location.pathname.startsWith('/admin/hotels/') ? (
            <NavLink
              to={location.pathname}
              className={({ isActive }) =>
                `site-nav__link${isActive ? ' is-active' : ''}`
              }
            >
              Current hotel
            </NavLink>
          ) : null}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
}
