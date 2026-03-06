import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import Loading from '../common/Loading';
import { FiUsers, FiDollarSign, FiActivity, FiTrendingUp, FiSearch, FiTrash2, FiEye, FiCheckCircle, FiXCircle, FiBarChart2, FiLayers } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [plans, setPlans] = useState([]);
  const [showNewPlan, setShowNewPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: '', price: '', duration: 1, features: '' });

  useEffect(() => {
    loadStats();
    loadUsers();
    loadPlans();
  }, [userPage]);

  const loadStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await api.get(`/admin/users?page=${userPage}&limit=10`);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      toast.success('User deleted successfully');
      loadUsers();
      loadStats();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const loadPlans = async () => {
    try {
      const response = await api.get('/admin/plans');
      setPlans(response.data);
    } catch (error) {
      toast.error('Failed to load plans');
    }
  };

  const handleDeletePlan = async (planId) => {
    if (!window.confirm('Delete this membership plan?')) return;
    try {
      await api.delete(`/admin/plans/${planId}`);
      toast.success('Plan deleted');
      loadPlans();
    } catch (error) {
      toast.error('Failed to delete plan');
    }
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      const featuresArr = newPlan.features.split('\n').map(f => f.trim()).filter(Boolean);
      await api.post('/admin/plans', { ...newPlan, price: Number(newPlan.price), duration: Number(newPlan.duration), features: featuresArr });
      toast.success('Plan created!');
      setShowNewPlan(false);
      setNewPlan({ name: '', price: '', duration: 1, features: '' });
      loadPlans();
    } catch (error) {
      toast.error('Failed to create plan');
    }
  };

  if (loading) {
    return <Loading size="lg" />;
  }

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
              Admin <span className="text-primary-500">Center.</span>
            </h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">Manage your fitness community</p>
          </div>

          <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-primary-500 text-white shadow-glow' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <FiBarChart2 /> Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-primary-500 text-white shadow-glow' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <FiUsers /> Members
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'plans' ? 'bg-primary-500 text-white shadow-glow' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <FiLayers /> Plans
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard title="Total Users" value={stats?.users?.total || 0} icon={FiUsers} color="primary" />
              <StatCard title="Active Members" value={stats?.memberships?.active || 0} icon={FiCheckCircle} color="green" />
              <StatCard title="Total Revenue" value={`$${stats?.revenue?.total || 0}`} icon={FiDollarSign} color="yellow" />
              <StatCard title="Total Content" value={stats?.content?.workouts || 0} icon={FiTrendingUp} color="purple" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card-premium">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black">Recent Activity</h3>
                  <button onClick={() => setActiveTab('users')} className="text-xs font-black text-primary-500 uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {stats?.recentUsers?.map(user => (
                    <div key={user._id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl flex items-center justify-center font-black">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-tight">{user.name}</p>
                          <p className="text-xs text-slate-500 font-bold">{user.email}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : user.role === 'trainer' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                        {user.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-premium">
                <h3 className="text-xl font-black mb-8 text-center lg:text-left">Community Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <BreakdownCard label="Members" value={stats?.users?.members || 0} total={stats?.users?.total} color="green" />
                  <BreakdownCard label="Trainers" value={stats?.users?.trainers || 0} total={stats?.users?.total} color="amber" />
                  <BreakdownCard label="Admins" value={stats?.users?.admins || 0} total={stats?.users?.total} color="purple" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="animate-fade-in-up">
            <div className="card-premium mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative flex-grow max-w-md">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="w-full pl-12 pr-6 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sort by:</span>
                  <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest">
                    <option>Latest First</option>
                    <option>Name (A-Z)</option>
                    <option>Role</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card-premium overflow-hidden !p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-800">User</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-800">Role</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-800">Joined</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-800">Status</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {filteredUsers.map(user => (
                      <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 font-black">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-black uppercase tracking-tight">{user.name}</p>
                              <p className="text-xs text-slate-500 font-bold">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : user.role === 'trainer' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                            {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-glow-sm"></div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-slate-400 hover:text-primary-500 transition-colors" title="View Profile">
                              <FiEye size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="p-2 text-slate-400 hover:text-amber-600 transition-colors"
                              title="Delete User"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest font-bold">
                Showing Page {userPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={userPage === 1}
                  onClick={() => setUserPage(userPage - 1)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  disabled={userPage === totalPages}
                  onClick={() => setUserPage(userPage + 1)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Membership <span className="text-primary-500">Plans.</span></h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Create and manage subscription plans</p>
              </div>
              <button
                onClick={() => setShowNewPlan(!showNewPlan)}
                className="btn-primary rounded-2xl"
              >
                {showNewPlan ? 'Cancel' : '+ New Plan'}
              </button>
            </div>

            {showNewPlan && (
              <form onSubmit={handleCreatePlan} className="card-premium mb-8 space-y-6">
                <h3 className="text-lg font-black uppercase tracking-tighter">Create New Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Plan Name</label>
                    <input
                      required
                      placeholder="e.g. Premium"
                      value={newPlan.name}
                      onChange={e => setNewPlan({ ...newPlan, name: e.target.value })}
                      className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Price ($/month)</label>
                    <input
                      required
                      type="number"
                      placeholder="e.g. 29.99"
                      value={newPlan.price}
                      onChange={e => setNewPlan({ ...newPlan, price: e.target.value })}
                      className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Duration (months)</label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={newPlan.duration}
                      onChange={e => setNewPlan({ ...newPlan, duration: e.target.value })}
                      className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Features (one per line)</label>
                  <textarea
                    rows={4}
                    placeholder="AI Workout Plans\nCustom Diet Tracking\nPriority Support"
                    value={newPlan.features}
                    onChange={e => setNewPlan({ ...newPlan, features: e.target.value })}
                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary rounded-2xl">Create Plan</button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.length === 0 && (
                <div className="col-span-3 text-center py-24 card-premium">
                  <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No plans yet. Create your first plan above.</p>
                </div>
              )}
              {plans.map(plan => (
                <div key={plan._id} className="card-premium flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${plan.isActive ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                        {plan.isActive ? 'Active' : 'Inactive'}
                      </div>
                      <button onClick={() => handleDeletePlan(plan._id)} className="p-2 text-slate-300 hover:text-amber-500 transition-colors">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-1">{plan.name}</h3>
                    <div className="flex items-end gap-1 mb-6">
                      <span className="text-4xl font-black text-primary-500">${plan.price}</span>
                      <span className="text-xs font-bold text-slate-400 mb-1">/ {plan.duration} mo</span>
                    </div>
                    <ul className="space-y-3">
                      {(plan.features || []).map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                          <FiCheckCircle className="text-primary-500 flex-shrink-0" size={14} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => {
  const colors = {
    primary: 'text-primary-500 bg-primary-50 dark:bg-primary-900/20',
    green: 'text-green-500 bg-green-50 dark:bg-green-900/20',
    yellow: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
    purple: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
  };

  return (
    <div className="card-premium !p-8 group">
      <div className="flex items-center justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-glow-sm ${colors[color]}`}>
          <Icon size={24} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</p>
        </div>
      </div>
      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color === 'primary' ? 'bg-primary-500' : color === 'green' ? 'bg-green-500' : color === 'yellow' ? 'bg-yellow-500' : 'bg-purple-500'}`} style={{ width: '70%' }}></div>
      </div>
    </div>
  );
};

const BreakdownCard = ({ label, value, total, color }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const colors = {
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="p-4 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</span>
        <span className="text-xs font-black text-slate-900 dark:text-white">{Math.round(percentage)}%</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-black text-slate-900 dark:text-white leading-none">{value}</span>
        <span className="text-[10px] font-bold text-slate-400 mb-1">TOTAL</span>
      </div>
      <div className="mt-4 h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colors[color]}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default AdminDashboard;






