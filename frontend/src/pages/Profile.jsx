import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-hot-toast';
import { FITNESS_GOAL_LABELS } from '../utils/constants';
import Leaderboard from '../components/gamification/Leaderboard';
import Badges from '../components/gamification/Badges';
import { FiUser, FiActivity, FiAward, FiBarChart2 } from 'react-icons/fi';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    height: user?.profile?.height || '',
    weight: user?.profile?.weight || '',
    age: user?.profile?.age || '',
    fitnessGoal: user?.profile?.fitnessGoal || 'general',
    bio: user?.profile?.bio || '',
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put('/users/profile', formData);
      updateUser(response.data.user);
      toast.success('Profile updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'My Details', icon: FiUser },
    { id: 'badges', label: 'Achievements', icon: FiAward },
    { id: 'leaderboard', label: 'Leaderboard', icon: FiBarChart2 }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16 border-b border-slate-100 dark:border-slate-800/50 pb-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tighter">Athlete <span className="text-primary-500">Identity.</span></h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Neural biometric management & achievement synchronized status.</p>
        </div>

        {/* Stats Row */}
        <div className="flex gap-6">
          <div className="px-8 py-5 bg-white dark:bg-[#111214] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-premium text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Rank Level</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{user?.gamification?.level || 1}</p>
          </div>
          <div className="px-8 py-5 bg-white dark:bg-[#111214] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-premium text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Vitality Streak</p>
            <p className="text-3xl font-black text-primary-500 tabular-nums">🔥 {user?.gamification?.attendanceStreak || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">

        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 text-xs font-black uppercase tracking-widest rounded-2xl transition-all border ${activeTab === tab.id
                ? 'bg-primary-600 border-primary-500 text-white shadow-glow'
                : 'text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-900/50'
                }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-premium">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Athlete Identifier</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Operation Objective</label>
                    <select
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleChange}
                      className="input-field"
                    >
                      {Object.entries(FITNESS_GOAL_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Verticality (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Mass Index (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Biological Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Athlete Narrative</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="input-field min-h-[160px] resize-none"
                    placeholder="ENTER BIOMETRIC NARRATIVE..."
                  />
                </div>

                <div className="flex justify-end pt-10 border-t border-slate-50 dark:border-slate-800/50">
                  <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto px-12 py-5 rounded-[1.5rem] shadow-glow">
                    {loading ? 'Synchronizing...' : 'Commit Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'badges' && <Badges />}
          {activeTab === 'leaderboard' && <Leaderboard />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
