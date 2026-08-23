import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">CollabBoard</div>
      <div className="user-controls">
        <div className="user-name">{user?.name}</div>
        <button className="btn btn-secondary" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
