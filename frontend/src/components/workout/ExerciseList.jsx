import { useState } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { FiUsers, FiCpu } from 'react-icons/fi';
import AiCoachModal from './AiCoachModal';

const ExerciseList = ({ exercises, completedExercises = [], onToggleComplete }) => {
  const [activeExercise, setActiveExercise] = useState(null);

  return (
    <>
      <div className="space-y-4">
        {exercises.map((exercise, index) => {
          const isCompleted = completedExercises.includes(exercise.name);

          return (
            <div
              key={index}
              className={`p-5 rounded-2xl transition-all cursor-pointer border group ${isCompleted
                ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/20'
                : 'bg-white border-slate-200 hover:border-indigo-300 dark:bg-slate-800/50 dark:border-slate-700 dark:hover:border-indigo-500'
                }`}
              onClick={() => onToggleComplete && onToggleComplete(exercise.name)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-bold text-lg ${isCompleted ? 'text-emerald-700 dark:text-emerald-400 line-through decoration-emerald-500/30' : 'text-slate-900 dark:text-white'}`}>
                      {exercise.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-700 dark:text-slate-300">
                      {exercise.sets} sets
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">×</span>
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-700 dark:text-slate-300">
                      {exercise.reps} reps
                    </span>
                    {exercise.rest && (
                      <>
                        <span className="text-slate-300 dark:text-slate-600">|</span>
                        <span className="text-slate-500 flex items-center gap-1">
                          Rest: {exercise.rest}s
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveExercise(exercise.name);
                    }}
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 px-3 py-1.5 rounded-lg transition-colors border border-indigo-100 dark:border-indigo-900/30"
                  >
                    <FiCpu size={12} /> Ask AI Coach
                  </button>
                </div>

                <div className="pl-4 pt-1">
                  {isCompleted ? (
                    <FaCheckCircle className="text-2xl text-emerald-500 drop-shadow-sm" />
                  ) : (
                    <FaRegCircle className="text-2xl text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AiCoachModal
        isOpen={!!activeExercise}
        onClose={() => setActiveExercise(null)}
        exerciseName={activeExercise}
      />
    </>
  );
};

export default ExerciseList;
