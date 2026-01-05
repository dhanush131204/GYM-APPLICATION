import { useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import { FITNESS_GOAL_LABELS } from '../../utils/constants';
import WorkoutCard from './WorkoutCard';
import { FiActivity, FiUser, FiCalendar, FiArrowRight, FiTarget, FiZap, FiTrendingUp } from 'react-icons/fi';

const WorkoutPlanner = () => {
  const [formData, setFormData] = useState({
    goal: 'fat_loss',
    daysPerWeek: 3,
    height: '',
    weight: '',
    age: '',
    gender: 'male' // Added for better customization if backend supports it
  });
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoalSelect = (goal) => {
    setFormData({ ...formData, goal });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/workouts/generate', formData);
      setWorkout(response.data.workout);
      toast.success('Workout plan generated successfully!');
      // Scroll to result
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate workout');
    } finally {
      setLoading(false);
    }
  };

  const goals = [
    { id: 'fat_loss', label: 'Fat Loss', icon: FiTrendingUp, desc: 'Burn calories & tone' },
    { id: 'muscle_gain', label: 'Muscle Gain', icon: FiZap, desc: 'Build mass & strength' },
    { id: 'endurance', label: 'Endurance', icon: FiActivity, desc: 'Stamina & cardio' },
    { id: 'flexibility', label: 'Flexibility', icon: FiUser, desc: 'Mobility & balance' }, // Assuming these map to backend
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">

      {!workout ? (
        <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">AI Workout Generator</h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Create a personalized training program tailored to your unique physiology and goals.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Goal Selection */}
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Select Your Primary Goal</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {goals.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => handleGoalSelect(g.id)}
                    className={`cursor-pointer border rounded-xl p-4 transition-all duration-200 flex flex-col items-center text-center gap-3 ${formData.goal === g.id
                        ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 ring-2 ring-offset-2 ring-slate-900 dark:ring-white ring-offset-white dark:ring-offset-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-100 dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                      }`}
                  >
                    <g.icon className={`w-6 h-6 ${formData.goal === g.id ? 'text-blue-400 dark:text-blue-600' : ''}`} />
                    <div>
                      <h3 className="font-bold text-sm">{g.label}</h3>
                      <p className="text-xs opacity-70 mt-1">{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <label className="block text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Your Stats</label>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Height (cm)</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="height"
                        required
                        value={formData.height}
                        onChange={handleChange}
                        className="input-field pl-10"
                        placeholder="175"
                      />
                      <FiActivity className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Weight (kg)</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="weight"
                        required
                        value={formData.weight}
                        onChange={handleChange}
                        className="input-field pl-10"
                        placeholder="70"
                      />
                      <FiUser className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Age</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      required
                      value={formData.age}
                      onChange={handleChange}
                      className="input-field pl-10"
                      placeholder="25"
                    />
                    <FiCalendar className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <label className="block text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Preferences</label>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-3 block">Training Frequency: {formData.daysPerWeek} Days/Week</label>
                  <input
                    type="range"
                    name="daysPerWeek"
                    min="2"
                    max="6"
                    step="1"
                    value={formData.daysPerWeek}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-slate-900 dark:accent-white"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>2 Days</span>
                    <span>4 Days</span>
                    <span>6 Days</span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-4 items-start">
                  <FiTarget className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100">AI Plan Preview</h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">
                      Based on your goal of <span className="font-bold">{FITNESS_GOAL_LABELS[formData.goal]}</span>, we'll design a {formData.daysPerWeek}-day split focusing on progressive overload and recovery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 dark:shadow-none flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Analyzing Physiology...
                  </span>
                ) : (
                  <>Generate Personalized Plan <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
              <p className="text-center text-xs text-slate-400 mt-4">
                By generating this plan, you acknowledge that you are physically capable of performing exercise.
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in-up">
          <button
            onClick={() => setWorkout(null)}
            className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors"
          >
            ← Create New Plan
          </button>
          <WorkoutCard workout={workout} />
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;
