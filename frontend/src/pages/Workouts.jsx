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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-slate-100 dark:border-slate-800/50 pb-12">
        <div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-3">Protocol <span className="text-primary-500">Repository.</span></h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed">System-wide operative training cycles & periodization status.</p>
        </div>

        <button
          onClick={() => setShowPlanner(!showPlanner)}
          className="btn-primary px-8 py-5 rounded-2xl shadow-glow"
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
        <div className="max-w-3xl mx-auto text-center py-32 px-10 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-inner">
          <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-3xl flex items-center justify-center mx-auto mb-10 transform rotate-3 shadow-glow">
            <FiZap size={48} />
          </div>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">Initialize <span className="text-primary-500">Protocols.</span></h3>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-12 leading-relaxed uppercase tracking-[0.2em]">
            Neural training node idle. Deploy algorithms to construct personalized periodization cycles.
          </p>
          <button
            onClick={() => setShowPlanner(true)}
            className="btn-primary px-12 py-5 rounded-[1.5rem] shadow-glow"
          >
            <FiPlus size={20} /> Initialize First Protocol
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
