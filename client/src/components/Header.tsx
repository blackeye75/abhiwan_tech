import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(); // clears user from context + localStorage
    navigate("/login", { replace: true });
  };

  return (
    <header className="p-4 bg-blue-600 text-white flex items-center justify-between">
      {/* Title */}
      <h1 className="text-xl font-bold">{title}</h1>

      {/* Hamburger for small screens */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav
        className={`flex-col md:flex-row md:flex space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center absolute md:static bg-blue-600 w-full left-0 md:w-auto top-16 md:top-auto p-4 md:p-0 z-50 transition-all duration-300 ease-in-out ${
          menuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
            <span className="opacity-80 text-sm">{user.username || user.email}</span>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
