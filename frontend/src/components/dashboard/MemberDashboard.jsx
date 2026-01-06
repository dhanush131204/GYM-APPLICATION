import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiTrendingUp, FiActivity, FiAward, FiTarget, FiZap, FiCheckCircle, FiChevronRight } from 'react-icons/fi';
import Chatbot from '../chatbot/Chatbot';
import { toast } from 'react-hot-toast';
import Loading from '../common/Loading';

const MemberDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get('/users/stats');
      setStats(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to initialize session');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size="lg" />;
  }

  const chartData = [
    { name: 'MON', val: stats?.totalCaloriesBurned ? Math.round(stats.totalCaloriesBurned * 0.8) : 0 },
    { name: 'TUE', val: stats?.totalCaloriesBurned ? Math.round(stats.totalCaloriesBurned * 0.9) : 0 },
    { name: 'WED', val: stats?.totalCaloriesBurned || 0 },
    { name: 'THU', val: 0 },
    { name: 'FRI', val: 0 },
    { name: 'SAT', val: 0 },
    { name: 'SUN', val: 0 },
  ];

  const StatCard = ({ title, value, subtext, icon: Icon, accentColor }) => (
    <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2rem] p-10 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{title}</p>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-3">{value}</h3>
          {subtext && <p className="text-xs font-bold text-primary-500/80 uppercase tracking-widest">{subtext}</p>}
        </div>
        <div className={`p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all group-hover:scale-110 shadow-sm ${accentColor}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10 border-b border-slate-100 dark:border-slate-800/50 pb-16">
        <div>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-black uppercase tracking-[0.2em] rounded-full mb-8 shadow-glow border border-primary-100 dark:border-primary-800/50">
            <FiZap className="animate-pulse" /> Performance Matrix Synchronized
          </div>
          <h1 className="text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Command <span className="text-primary-500">Center.</span></h1>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400 mt-6 max-w-2xl leading-relaxed uppercase tracking-widest">
            {stats?.attendanceStreak > 0
              ? `Operational efficiency optimized | ${stats.attendanceStreak}-Cycle continuous synchronization.`
              : "Neural link established. Awaiting protocol activation from dispatch."}
          </p>
        </div>
        <div className="flex gap-12">
          <div className="text-right">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Global Ranking</p>
            <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums text-primary-500">#1,204</p>
          </div>
        </div>
      </div>

      {/* Metrics Engine */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <StatCard
          title="Metric Score"
          value={stats?.fitnessScore || 84}
          subtext="OPTIMIZED"
          icon={FiActivity}
          accentColor="text-primary-500"
        />
        <StatCard
          title="Reward Points"
          value={stats?.totalPoints || 0}
          subtext="LEVEL 04"
          icon={FiAward}
          accentColor="text-amber-500"
        />
        <StatCard
          title="Current Streak"
          value={`${stats?.attendanceStreak || 0}d`}
          subtext="STABLE"
          icon={FiZap}
          accentColor="text-secondary-500"
        />
        <StatCard
          title="System Level"
          value={stats?.level || 1}
          subtext="ELITE TIER"
          icon={FiTarget}
          accentColor="text-primary-400"
        />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        <div className="lg:col-span-2 bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-premium">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Metabolic Activity</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Caloric Burn History</p>
            </div>
            <select className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl focus:outline-none">
              <option>WEEKLY VIEW</option>
              <option>MONTHLY VIEW</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.05} />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={10}
                  fontWeight="900"
                  tickLine={false}
                  axisLine={false}
                  dy={15}
                  tick={{ fill: '#94a3b8', letterSpacing: '0.1em' }}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '5 5' }}
                  contentStyle={{ backgroundColor: '#0a0a0b', border: '1px solid #1e293b', borderRadius: '24px', padding: '16px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke="#8b5cf6"
                  strokeWidth={6}
                  fillOpacity={1}
                  fill="url(#chartGrad)"
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-premium flex flex-col h-full">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-10 uppercase tracking-tighter italic">Bio-Biometrics</h3>
          <div className="flex-1 space-y-12">
            <div>
              <div className="flex justify-between items-end mb-4">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">BMI Architecture</p>
                <p className="text-3xl font-black text-primary-500 tabular-nums">{stats?.bmi || '22.4'}</p>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="h-full bg-primary-600 transition-all duration-1500 shadow-glow" style={{ width: `${Math.min((stats?.bmi || 22.4) * 2.5, 100)}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 italic">Mass</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">{stats?.weight || '78'}<span className="text-xs ml-1 opacity-40 uppercase font-bold">kg</span></p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
                <p className="text-xs font-black text-secondary-500 uppercase tracking-widest mb-3 italic">Cycles</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">{stats?.completedWorkouts || 12}</p>
              </div>
            </div>
          </div>
          <button className="btn-primary w-full py-5 mt-12 rounded-[1.5rem] shadow-glow uppercase tracking-[0.3em] font-black text-xs">
            Comprehensive System Audit
          </button>
        </div>
      </div>

      {/* Navigation Engine */}
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Launch Modules</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Workout Protocols', desc: 'Execute training cycles', path: '/workouts', icon: '🧬', color: 'primary' },
          { label: 'Nutrition Engine', desc: 'Manage nutrient intake', path: '/diet', icon: '⚡', color: 'secondary' },
          { label: 'Athlete Identity', desc: 'Sync bio-metrics', path: '/profile', icon: '🧠', color: 'primary' },
          { label: 'Theory Repository', desc: 'Master form & science', path: '/exercises', icon: '📡', color: 'secondary' },
        ].map((mod, i) => (
          <button
            key={i}
            onClick={() => window.location.href = mod.path}
            className="group p-8 bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] hover:border-primary-500/50 transition-all text-left shadow-premium hover:shadow-glow"
          >
            <div className={`w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform shadow-sm border border-slate-100 dark:border-slate-800 text-primary-500`}>
              {mod.icon}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="block font-black text-slate-900 dark:text-white text-base uppercase tracking-widest">{mod.label}</span>
                <span className="text-xs font-black text-slate-400 uppercase mt-2 block tracking-widest opacity-80">{mod.desc}</span>
              </div>
              <FiChevronRight className="text-slate-300 group-hover:text-primary-500 transition-colors" size={20} />
            </div>
          </button>
        ))}
      </div>

      <Chatbot />
    </div>
  );
};

export default MemberDashboard;
