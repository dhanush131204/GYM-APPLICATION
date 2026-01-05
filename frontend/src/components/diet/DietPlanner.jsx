import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';
import { FITNESS_GOAL_LABELS, DIET_PREFERENCE_LABELS, BUDGET_LABELS } from '../../utils/constants';
import MealCard from './MealCard';
import { FiCheck, FiPieChart, FiDollarSign, FiClock, FiArrowRight } from 'react-icons/fi';

const DietPlanner = (props) => {
  const [formData, setFormData] = useState({
    goal: 'fat_loss',
    preference: 'vegetarian',
    budget: 'medium',
    duration: 7,
  });

  const [diet, setDiet] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectOption = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/diets/generate', formData);
      setDiet(response.data.diet);
      toast.success('Diet plan generated successfully!');
      if (props.onDietGenerated) props.onDietGenerated();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.upgradeRequired) {
        showUpgradePrompt(errorData.feature, errorData.message);
      } else {
        toast.error(errorData?.message || 'Failed to generate diet');
      }
    } finally {
      setLoading(false);
    }
  };

  const showUpgradePrompt = (feature, message) => {
    const upgradeConfirmed = window.confirm(
      `${message}\n\nWould you like to upgrade your plan to access this feature?`
    );
    if (upgradeConfirmed) {
      window.location.href = '/plans';
    }
  };

  const PREFERENCES = [
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥦' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'keto', label: 'Keto', icon: '🥑' },
    { id: 'paleo', label: 'Paleo', icon: '🥩' },
    { id: 'gluten_free', label: 'Gluten Free', icon: '🌾' },
    { id: 'anything', label: 'Anything', icon: '🍱' }
  ];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">

      {!diet ? (
        <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Smart Nutrition Planner</h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Generate a science-based meal plan optimized for your metabolic needs and dietary preferences.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Diet Type */}
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-center">Dietary Preference</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {PREFERENCES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectOption('preference', p.id)}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${formData.preference === p.id
                        ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 shadow-md transform scale-105'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                      }`}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-xs font-bold">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Goal</label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="input-field py-3"
                >
                  {Object.entries(FITNESS_GOAL_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-2">Determines calorie surplus/deficit.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Budget</label>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {Object.entries(BUDGET_LABELS).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleSelectOption('budget', value)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.budget === value
                          ? 'bg-white dark:bg-slate-600 shadow text-slate-900 dark:text-white'
                          : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Duration</label>
                <div className="relative">
                  <input
                    type="number"
                    name="duration"
                    min="1"
                    max="14"
                    value={formData.duration}
                    onChange={handleChange}
                    className="input-field py-3 pl-10"
                  />
                  <FiClock className="absolute left-3.5 top-3.5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-400 mt-2">Days (Max 14)</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg shadow-xl shadow-green-900/10 hover:shadow-green-900/20 dark:shadow-none flex items-center justify-center gap-2 group"
              >
                {loading ? 'Generating Meal Plan...' : <>Generate Meal Plan <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
              {loading && <p className="text-center text-xs text-slate-400 mt-3 animate-pulse">This might take a few seconds...</p>}
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setDiet(null)}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors"
            >
              ← Create New Plan
            </button>
            <div className="flex gap-2">
              <button className="btn-secondary text-xs py-2">Download PDF</button>
            </div>
          </div>

          {/* Macros Summary */}
          <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 text-white text-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Daily Targets</h3>
            <div className="grid grid-cols-4 gap-4 divide-x divide-slate-700">
              <div>
                <p className="text-3xl font-black text-white">{diet.targetCalories}</p>
                <p className="text-xs text-slate-400 mt-1 uppercase">Calories</p>
              </div>
              <div>
                <p className="text-3xl font-black text-emerald-400">{diet.targetProtein}g</p>
                <p className="text-xs text-slate-400 mt-1 uppercase">Protein</p>
              </div>
              <div>
                <p className="text-3xl font-black text-blue-400">{diet.targetCarbs}g</p>
                <p className="text-xs text-slate-400 mt-1 uppercase">Carbs</p>
              </div>
              <div>
                <p className="text-3xl font-black text-yellow-400">{diet.targetFats}g</p>
                <p className="text-xs text-slate-400 mt-1 uppercase">Fats</p>
              </div>
            </div>
          </div>

          {/* Meals Grid */}
          <div className="space-y-6">
            {diet.dailyMeals.map((day, i) => (
              <div key={i} className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white">Day {i + 1}</h4>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Breakfast</span>
                    <MealCard meal={day.breakfast} title="Breakfast" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Lunch</span>
                    <MealCard meal={day.lunch} title="Lunch" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Dinner</span>
                    <MealCard meal={day.dinner} title="Dinner" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlanner;
