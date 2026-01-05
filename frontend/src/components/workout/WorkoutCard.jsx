import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import { FiTrash2, FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi';
import ExerciseList from './ExerciseList';

const WorkoutCard = ({ workout: initialWorkout }) => {
  const [workout, setWorkout] = useState(initialWorkout);
  const [selectedDay, setSelectedDay] = useState(workout.workoutDays?.[0] || null);
  const [completedExercises, setCompletedExercises] = useState([]);

  useEffect(() => {
    if (workout.activeSession && workout.activeSession.day === selectedDay.day) {
      setCompletedExercises(workout.activeSession.exercisesCompleted || []);
    } else {
      setCompletedExercises([]);
    }
  }, [selectedDay, workout.activeSession]);

  const handleToggleComplete = async (exerciseName) => {
    try {
      const newCompleted = completedExercises.includes(exerciseName)
        ? completedExercises.filter(e => e !== exerciseName)
        : [...completedExercises, exerciseName];

      setCompletedExercises(newCompleted);

      await api.put(`/workouts/${workout._id}/session`, {
        day: selectedDay.day,
        exercisesCompleted: newCompleted
      });

      setWorkout(prev => ({
        ...prev,
        activeSession: {
          day: selectedDay.day,
          exercisesCompleted: newCompleted
        }
      }));

    } catch (error) {
      toast.error('Failed to update progress');
    }
  };

  const handleComplete = async () => {
    try {
      await api.post(`/workouts/${workout._id}/complete`, {
        day: selectedDay.day,
        exercisesCompleted: completedExercises,
      });
      toast.success('Workout completed! Points awarded.');

      setWorkout(prev => ({
        ...prev,
        activeSession: null
      }));
      setCompletedExercises([]);
    } catch (error) {
      toast.error('Failed to complete workout');
    }
  };

  if (!selectedDay) {
    return (
      <div className="card text-center p-8 bg-slate-50 dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl">
        <p className="text-slate-500">No active training days found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 md:p-8 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-lg mb-2">
              {workout.goal.replace('_', ' ')}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {selectedDay.focus || 'General Training'}
            </h3>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              <FiCalendar /> {selectedDay.day.charAt(0).toUpperCase() + selectedDay.day.slice(1)}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-xl overflow-x-auto">
            {workout.workoutDays.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedDay.day === day.day
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
              >
                {day.day.charAt(0).toUpperCase() + day.day.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <ExerciseList
            exercises={selectedDay.exercises}
            completedExercises={completedExercises}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
        <button
          onClick={handleComplete}
          disabled={completedExercises.length === 0}
          className="w-full md:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-900/10 dark:shadow-none flex items-center justify-center gap-2"
        >
          <FiCheckCircle /> Mark as Complete
        </button>

        <button
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this workout plan?')) {
              try {
                await api.delete(`/workouts/${workout._id}`);
                toast.success('Workout plan deleted');
                window.location.reload();
              } catch (error) {
                toast.error('Failed to delete workout');
              }
            }
          }}
          className="w-full md:w-auto px-4 py-3 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-bold text-sm bg-transparent hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <FiTrash2 /> Delete Plan
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
