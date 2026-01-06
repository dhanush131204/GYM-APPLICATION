import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';
import { FITNESS_GOAL_LABELS, BUDGET_LABELS } from '../../utils/constants';
import MealCard from './MealCard';
import { FiClock, FiArrowRight } from 'react-icons/fi';

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
      toast.error(errorData?.message || 'Failed to generate diet');
    } finally {
      setLoading(false);
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
        <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-12 shadow-premium">
          <div className="flex flex-col items-center mb-16 text-center space-y-6">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter relative z-10">Neural Nutrition <span className="text-primary-500">Planner.</span></h2>
            <p className="text-sm font-bold text-slate-500 max-w-lg mx-auto uppercase tracking-widest leading-relaxed relative z-10">
              Generate science-based meal protocols optimized for metabolic orchestration.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Diet Type */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 text-center">Metabolic Preference</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {PREFERENCES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectOption('preference', p.id)}
                    className={`p-6 rounded-[1.5rem] border transition-all flex flex-col items-center gap-3 ${formData.preference === p.id
                      ? 'bg-primary-600 border-primary-500 text-white shadow-glow transform scale-105'
                      : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                      }`}
                  >
                    <span className="text-3xl">{p.icon}</span>
                    <span className="text-xs font-black uppercase tracking-widest">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Vertical Objective</label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="input-field py-4"
                >
                  {Object.entries(FITNESS_GOAL_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <p className="text-xs font-bold text-slate-400 mt-3 uppercase tracking-tight">Caloric matrix adjustment factor.</p>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Resource Allocation</label>
                <div className="flex bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1.5 rounded-2xl">
                  {Object.entries(BUDGET_LABELS).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleSelectOption('budget', value)}
                      className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${formData.budget === value
                        ? 'bg-white dark:bg-slate-800 shadow-sm text-primary-500'
                        : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Temporal Span</label>
                <div className="relative">
                  <input
                    type="number"
                    name="duration"
                    min="1"
                    max="14"
                    value={formData.duration}
                    onChange={handleChange}
                    className="input-field py-4 pl-12"
                  />
                  <FiClock className="absolute left-4 top-4.5 text-primary-500" size={18} />
                </div>
                <p className="text-xs font-bold text-slate-400 mt-3 uppercase tracking-tight">Cycle Length: Max 14 Cycles.</p>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-50 dark:border-slate-800/50">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-5 rounded-2xl text-lg shadow-glow flex items-center justify-center gap-3 group"
              >
                {loading ? 'CALIBRATING PROTOCOL...' : <>EXECUTE GENERATION <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
              {loading && <p className="text-center text-xs font-black text-primary-500 mt-4 animate-pulse uppercase tracking-[0.2em]">Neural processing in progress...</p>}
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-10 animate-fade-in-up">
          <div className="flex items-center justify-between px-4">
            <button
              onClick={() => setDiet(null)}
              className="text-xs font-black text-slate-400 hover:text-primary-500 uppercase tracking-[0.2em] flex items-center gap-3 transition-colors"
            >
              ← INITIALIZE NEW PROTOCOL
            </button>
            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-all">Export Matrix</button>
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-[#111214] rounded-[2.5rem] p-10 text-white border border-slate-800 shadow-premium">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary-500 mb-8 text-center italic">Calculated Daily Thresholds</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-black text-white tabular-nums">{diet.targetCalories}</p>
                <p className="text-xs font-black text-slate-500 mt-2 uppercase tracking-widest">Calories</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-primary-500 tabular-nums">{diet.targetProtein}g</p>
                <p className="text-xs font-black text-slate-500 mt-2 uppercase tracking-widest">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-secondary-500 tabular-nums">{diet.targetCarbs}g</p>
                <p className="text-xs font-black text-slate-500 mt-2 uppercase tracking-widest">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-primary-400 tabular-nums">{diet.targetFats}g</p>
                <p className="text-xs font-black text-slate-500 mt-2 uppercase tracking-widest">Fats</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {diet.dailyMeals.map((day, i) => (
              <div key={i} className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-premium">
                <div className="bg-slate-50 dark:bg-slate-900/50 px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Day Cycle {i + 1}</h4>
                </div>
                <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="space-y-6">
                    <span className="text-xs font-black uppercase text-primary-500 tracking-widest bg-primary-50 dark:bg-primary-900/20 px-4 py-1.5 rounded-full border border-primary-100 dark:border-primary-800/50">Breakfast Matrix</span>
                    <MealCard meal={day.breakfast} title="Breakfast" isReadOnly={true} />
                  </div>
                  <div className="space-y-6">
                    <span className="text-xs font-black uppercase text-secondary-500 tracking-widest bg-secondary-50 dark:bg-secondary-900/20 px-4 py-1.5 rounded-full border border-secondary-100 dark:border-secondary-800/50">Lunch Matrix</span>
                    <MealCard meal={day.lunch} title="Lunch" isReadOnly={true} />
                  </div>
                  <div className="space-y-6">
                    <span className="text-xs font-black uppercase text-primary-400 tracking-widest bg-primary-50 dark:bg-primary-900/20 px-4 py-1.5 rounded-full border border-primary-100 dark:border-primary-800/50">Dinner Matrix</span>
                    <MealCard meal={day.dinner} title="Dinner" isReadOnly={true} />
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
