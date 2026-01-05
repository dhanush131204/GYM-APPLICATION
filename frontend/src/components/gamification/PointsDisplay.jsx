import { useAuth } from '../../context/AuthContext';
import { FiAward } from 'react-icons/fi';

const PointsDisplay = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center space-x-2 text-sm">
      <FiAward className="text-yellow-500" size={18} />
      <span className="font-semibold">{user?.gamification?.points || 0}</span>
      <span className="text-gray-600 dark:text-gray-400">points</span>
    </div>
  );
};

export default PointsDisplay;






