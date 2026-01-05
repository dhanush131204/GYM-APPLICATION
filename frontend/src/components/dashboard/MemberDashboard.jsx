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
    <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-premium hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{title}</p>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">{value}</h3>
          {subtext && <p className="text-xs font-bold text-indigo-500/80">{subtext}</p>}
        </div>
        <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${accentColor}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg mb-4">
            <FiZap className="inline" /> Performance Mode Active
          </div>
          <h1 className="font-black">Command Center.</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {stats?.attendanceStreak > 0
              ? `Operational efficiency at ${100}% | ${stats.attendanceStreak} Day Continuous Cycle`
              : "System ready for session initialization."}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">#1,204</p>
          </div>
        </div>
      </div>

      {/* Metrics Engine */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <StatCard
          title="Metric Score"
          value={stats?.fitnessScore || 84}
          subtext="OPTIMIZABLE"
          icon={FiActivity}
          accentColor="text-indigo-500"
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
          subtext="ON FIRE"
          icon={FiZap}
          accentColor="text-orange-500"
        />
        <StatCard
          title="System Level"
          value={stats?.level || 1}
          subtext="ELITE TIER"
          icon={FiTarget}
          accentColor="text-purple-500"
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
            <select className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl focus:outline-none">
              <option>WEEKLY VIEW</option>
              <option>MONTHLY VIEW</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.1} />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={10}
                  fontWeight="bold"
                  tickLine={false}
                  axisLine={false}
                  dy={15}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
                  contentStyle={{ backgroundColor: '#0a0a0b', border: 'none', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke="#6366f1"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#chartGrad)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-premium flex flex-col h-full">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8">Bio-Stats</h3>
          <div className="flex-1 space-y-10">
            <div>
              <div className="flex justify-between items-end mb-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BMI Analysis</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">{stats?.bmi || '22.4'}</p>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-slate-900 dark:bg-white transition-all duration-1000" style={{ width: `${Math.min((stats?.bmi || 22.4) * 2.5, 100)}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Weight</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">{stats?.weight || '78'}<span className="text-[10px] ml-1 opacity-40 uppercase">kg</span></p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sessions</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">{stats?.completedWorkouts || 12}</p>
              </div>
            </div>
          </div>
          <button className="w-full py-4 mt-10 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all">
            Full System Audit
          </button>
        </div>
      </div>

      {/* Navigation Engine */}
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Launch Modules</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Workout Protocols', desc: 'Execute training cycles', path: '/workouts', icon: '💪', color: 'indigo' },
          { label: 'Nutrition Engine', desc: 'Manage nutrient intake', path: '/diet', icon: '🥗', color: 'emerald' },
          { label: 'Performance Profile', desc: 'Sync bio-metrics', path: '/profile', icon: '👤', color: 'slate' },
          { label: 'Resource Library', desc: 'Master form & theory', path: '/exercises', icon: '📚', color: 'amber' },
        ].map((mod, i) => (
          <button
            key={i}
            onClick={() => window.location.href = mod.path}
            className="group p-6 bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-indigo-500/50 transition-all text-left shadow-premium hover:shadow-2xl"
          >
            <div className={`w-12 h-12 bg-${mod.color}-50 dark:bg-${mod.color}-950/20 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform`}>
              {mod.icon}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="block font-black text-slate-900 dark:text-white text-sm uppercase tracking-wider">{mod.label}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-1 block">{mod.desc}</span>
              </div>
              <FiChevronRight className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </div>
          </button>
        ))}
      </div>

      <Chatbot />
    </div>
  );
};

export default MemberDashboard;
