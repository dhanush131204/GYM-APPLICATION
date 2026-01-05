import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a0b]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-slate-900 font-bold text-xl group-hover:scale-105 transition-transform">
              G
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">GYMVERSE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {user ? (
              <>
                <div className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <Link to="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">Dashboard</Link>
                  <Link to="/workouts" className="hover:text-slate-900 dark:hover:text-white transition-colors">Workouts</Link>
                  <Link to="/diet" className="hover:text-slate-900 dark:hover:text-white transition-colors">Diet</Link>
                  <Link to="/exercises" className="hover:text-slate-900 dark:hover:text-white transition-colors">Library</Link>
                  <Link to="/plans" className="hover:text-slate-900 dark:hover:text-white transition-colors">Plans</Link>
                </div>

                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all bg-white dark:bg-slate-900"
                    >
                      <div className="w-7 h-7 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-xs font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                        {user.name}
                      </span>
                    </button>

                    {profileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1 z-50">
                        <Link to="/profile" onClick={handleLinkClick} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <FiUser size={16} /> Profile
                        </Link>
                        <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 text-left">
                          <FiLogOut size={16} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                </button>
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                    Log In
                  </Link>
                  <Link to="/register" className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-slate-900/10 dark:shadow-none">
                    Start Free Trial
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-900 dark:text-white"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0a0a0b] border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-4 shadow-xl">
          {user ? (
            <div className="space-y-2">
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-4">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <Link to="/dashboard" onClick={handleLinkClick} className="block px-4 py-3 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Dashboard</Link>
              <Link to="/workouts" onClick={handleLinkClick} className="block px-4 py-3 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Workouts</Link>
              <Link to="/diet" onClick={handleLinkClick} className="block px-4 py-3 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Diet</Link>
              <Link to="/exercises" onClick={handleLinkClick} className="block px-4 py-3 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Library</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-3 rounded-xl font-medium text-rose-600 bg-rose-50 dark:bg-rose-900/10">Logout</button>
            </div>
          ) : (
            <div className="space-y-4">
              <Link to="/login" onClick={handleLinkClick} className="block w-full text-center px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white">Log In</Link>
              <Link to="/register" onClick={handleLinkClick} className="block w-full text-center px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
