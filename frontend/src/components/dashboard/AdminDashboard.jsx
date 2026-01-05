import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import Loading from '../common/Loading';
import { FiUsers, FiDollarSign, FiActivity, FiTrendingUp } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

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

  if (loading) {
    return <Loading size="lg" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold gradient-text mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-primary-600">{stats?.users?.total || 0}</p>
            </div>
            <FiUsers className="text-4xl text-primary-600 opacity-50" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Memberships</p>
              <p className="text-3xl font-bold text-green-600">{stats?.memberships?.active || 0}</p>
            </div>
            <FiActivity className="text-4xl text-green-600 opacity-50" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold text-yellow-600">${stats?.revenue?.total || 0}</p>
            </div>
            <FiDollarSign className="text-4xl text-yellow-600 opacity-50" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Workouts</p>
              <p className="text-3xl font-bold text-purple-600">{stats?.content?.workouts || 0}</p>
            </div>
            <FiTrendingUp className="text-4xl text-purple-600 opacity-50" />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">User Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Members</p>
            <p className="text-2xl font-bold">{stats?.users?.members || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Trainers</p>
            <p className="text-2xl font-bold">{stats?.users?.trainers || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
            <p className="text-2xl font-bold">{stats?.users?.admins || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;






