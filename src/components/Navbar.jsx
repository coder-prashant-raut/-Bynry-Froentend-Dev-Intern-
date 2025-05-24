import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white">
        ProfileMap
      </Link>

      <div className="hidden sm:flex gap-4 items-center">
        <Link
          to="/"
          className={`${
            location.pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200'
          } hover:underline`}
        >
          Home
        </Link>
        <Link
          to="/admin"
          className={`${
            location.pathname === '/admin' ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200'
          } hover:underline`}
        >
          Admin Panel
        </Link>
        <button onClick={toggleDarkMode} className="text-gray-700 dark:text-white hover:scale-110 transition">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Hamburger for mobile */}
      <div className="sm:hidden flex items-center gap-3">
        <button onClick={toggleDarkMode} className="text-gray-700 dark:text-white">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button onClick={toggleMenu}>
          <Menu size={24} className="text-gray-700 dark:text-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:hidden flex flex-col gap-2">
          <Link to="/" onClick={toggleMenu} className="text-gray-700 dark:text-gray-100 hover:underline">
            Home
          </Link>
          <Link to="/admin" onClick={toggleMenu} className="text-gray-700 dark:text-gray-100 hover:underline">
            Admin Panel
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
