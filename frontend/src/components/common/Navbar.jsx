import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiLogOut, FiUser, FiMenu, FiX, FiZap } from 'react-icons/fi';
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
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-[#0a0a0b]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-3 md:gap-4 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-glow group-hover:rotate-[10deg] transition-all duration-500">
              <FiZap className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">GYMVERSE</span>
              <span className="text-[10px] md:text-xs font-black text-primary-500 uppercase tracking-[0.3em] leading-none mt-1">PRO SYSTEM</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {user ? (
              <>
                <div className="flex items-center gap-6 text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                  <Link to="/dashboard" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Dashboard</Link>
                  <Link to="/workouts" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Workouts</Link>
                  <Link to="/diet" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Diet</Link>
                  <Link to="/exercises" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Exercises</Link>
                  <Link to="/plans" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Plans</Link>
                </div>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 transition-all bg-white dark:bg-slate-900 shadow-sm"
                    >
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-black shadow-glow">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest truncate max-w-[120px]">
                        {user.name}
                      </span>
                    </button>

                    {profileMenuOpen && (
                      <div className="absolute right-0 mt-5 w-64 bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-premium py-4 z-50 animate-fade-in-up">
                        <div className="px-6 py-4 mb-2 border-b border-slate-50 dark:border-slate-800/50">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Authenticated User</p>
                          <p className="text-sm font-black text-slate-900 dark:text-white uppercase truncate mt-1">{user.name}</p>
                        </div>
                        <Link to="/profile" onClick={handleLinkClick} className="flex items-center gap-4 px-6 py-3.5 text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all">
                          <FiUser size={18} /> My Profile
                        </Link>
                        <div className="h-px bg-slate-100 dark:bg-slate-800/50 my-2 mx-6"></div>
                        <button onClick={handleLogout} className="flex w-full items-center gap-4 px-6 py-3.5 text-sm font-black uppercase tracking-widest text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all">
                          <FiLogOut size={18} /> Logout
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
                  className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
                <div className="flex items-center gap-6">
                  <Link to="/login" className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary px-7 py-3 text-sm rounded-xl shadow-glow">
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0a0a0b] border-t border-slate-200 dark:border-slate-800 px-8 py-12 space-y-8 shadow-premium animate-fade-in-up">
          {user ? (
            <div className="space-y-4">
              <div className="px-8 py-6 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] mb-10 border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-2">User Credentials</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{user.name}</p>
                <p className="text-sm text-slate-500 font-bold truncate mt-1">{user.email}</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Link to="/dashboard" onClick={handleLinkClick} className="flex items-center gap-4 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50">Dashboard</Link>
                <Link to="/workouts" onClick={handleLinkClick} className="flex items-center gap-4 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50">Workouts</Link>
                <Link to="/diet" onClick={handleLinkClick} className="flex items-center gap-4 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50">Diet</Link>
                <Link to="/exercises" onClick={handleLinkClick} className="flex items-center gap-4 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50">Exercises</Link>
                <button onClick={handleLogout} className="flex items-center gap-4 w-full text-left px-8 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-amber-600 bg-amber-50 dark:bg-amber-900/10 mt-6 shadow-sm">Logout</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              <Link to="/login" onClick={handleLinkClick} className="w-full text-center px-8 py-5 rounded-2xl border border-slate-200 dark:border-slate-800 font-black text-sm uppercase tracking-[0.2em] text-slate-900 dark:text-white">Login</Link>
              <Link to="/register" onClick={handleLinkClick} className="w-full text-center px-8 py-6 rounded-2xl bg-primary-600 text-white font-black text-sm uppercase tracking-[0.2em] shadow-glow">Create Account</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
