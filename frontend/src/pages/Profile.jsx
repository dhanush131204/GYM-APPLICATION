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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Athlete Profile</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your bio-data and track your gamification status.</p>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4">
          <div className="px-5 py-3 bg-white dark:bg-[#111214] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Level</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{user?.gamification?.level || 1}</p>
          </div>
          <div className="px-5 py-3 bg-white dark:bg-[#111214] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Streak</p>
            <p className="text-xl font-bold text-amber-500">🔥 {user?.gamification?.attendanceStreak || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">

        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === tab.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
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
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Fitness Goal</label>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Age</label>
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
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="input-field min-h-[120px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto px-8">
                    {loading ? 'Updating...' : 'Save Changes'}
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
