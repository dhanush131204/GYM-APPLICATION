import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('All fields are required');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result?.success) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0b] p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            Initialize <span className="text-primary-500">Access.</span>
          </h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
            Join the elite community of <br />
            data-driven athletes globally.
          </p>
        </div>

        <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Name */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Official Designation</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <FiUser size={18} />
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Legal Name"
                  required
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white transition-all font-sans text-sm font-bold"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Communication Node</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <FiMail size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="verified@example.com"
                  required
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white transition-all font-sans text-sm font-bold"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Access Keyphrase</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <FiLock size={18} />
                </div>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className="w-full pl-14 pr-12 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white transition-all font-sans text-sm font-bold"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Role */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Operational Role</label>
              <div className="relative group">
                <select
                  name="role"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white transition-all appearance-none font-sans text-sm font-bold uppercase tracking-widest cursor-pointer group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="member">Athlete Protocol</option>
                  <option value="trainer">Architecture Lead</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
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
                  Create Account <FiArrowRight className="ml-2" />
                </span>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
