import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-hot-toast';
import WorkoutPlanner from '../components/workout/WorkoutPlanner';
import WorkoutCard from '../components/workout/WorkoutCard';
import Loading from '../components/common/Loading';
import { FiPlus, FiZap } from 'react-icons/fi';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPlanner, setShowPlanner] = useState(false);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const response = await api.get('/workouts');
      setWorkouts(response.data);
    } catch (error) {
      toast.error('Failed to load workouts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size="lg" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">My Workouts</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your training schedule and track progress.</p>
        </div>

        <button
          onClick={() => setShowPlanner(!showPlanner)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-slate-900/10 dark:shadow-none"
        >
          {showPlanner ? (
            <>
              Close Planner
            </>
          ) : (
            <>
              <FiPlus /> New Workout
            </>
          )}
        </button>
      </div>

      {showPlanner && (
        <div className="mb-12 animate-fade-in-up">
          <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shadow-xl">
            <WorkoutPlanner />
          </div>
        </div>
      )}

      {workouts.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-20 px-6">
          <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-3xl flex items-center justify-center mx-auto mb-8 transform rotate-3">
            <FiZap className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Initialize Your Training</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            Your workspace is empty. Let our AI construct a personalized periodization plan based on your biometrics.
          </p>
          <button
            onClick={() => setShowPlanner(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-indigo-600/20"
          >
            <FiPlus /> Generate First Protocol
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {workouts.map((workout) => (
            <div key={workout._id} className="animate-fade-in-up">
              <WorkoutCard workout={workout} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
