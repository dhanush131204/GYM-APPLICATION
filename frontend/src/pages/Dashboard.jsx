import { useAuth } from '../context/AuthContext';
import MemberDashboard from '../components/dashboard/MemberDashboard';
import TrainerDashboard from '../components/dashboard/TrainerDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import { ROLES } from '../utils/constants';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.role === ROLES.ADMIN) {
    return <AdminDashboard />;
  }

  if (user.role === ROLES.TRAINER) {
    return <TrainerDashboard />;
  }

  return <MemberDashboard />;
};

export default Dashboard;






