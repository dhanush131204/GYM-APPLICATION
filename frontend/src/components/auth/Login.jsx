import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0b] p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-12">
          <Link to="/" className="inline-block text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter hover:scale-105 transition-transform">
            GYM<span className="text-primary-500">VERSE</span>
          </Link>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
            Secure Terminal Access <br />
            <span className="text-xs opacity-60">ENCRYPTION ACTIVE</span>
          </p>
        </div>

        <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Identity Credentials</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <FiMail size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white transition-all font-sans text-sm font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Access Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <FiLock size={18} />
                </div>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-14 pr-12 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white transition-all font-sans text-sm font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-primary-500 transition-colors focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-xl transition-all"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <span className="flex items-center">
                  Sign In <FiArrowRight className="ml-2" />
                </span>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Don't have an access pass?{' '}
            <Link to="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Start Free Trial
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
