import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-hot-toast';
import DietPlanner from '../components/diet/DietPlanner';
import MealCard from '../components/diet/MealCard';
import Loading from '../components/common/Loading';
import { FiPlus, FiZap, FiTrash2, FiCalendar } from 'react-icons/fi';

const Diet = () => {
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPlanner, setShowPlanner] = useState(false);

  useEffect(() => {
    loadDiets();
  }, []);

  const loadDiets = async () => {
    try {
      const response = await api.get('/diets');
      setDiets(response.data);
    } catch (error) {
      toast.error('Failed to load diets');
    } finally {
      setLoading(false);
    }
  };

  const handleDietGenerated = () => {
    loadDiets();
    setShowPlanner(false);
  };

  const handleDeleteDiet = async (dietId) => {
    if (window.confirm('Are you sure you want to delete this diet plan?')) {
      try {
        await api.delete(`/diets/${dietId}`);
        toast.success('Diet plan deleted');
        loadDiets();
      } catch (error) {
        toast.error('Failed to delete diet plan');
      }
    }
  };

  const handleToggleItem = async (dietId, dayId, mealType, itemIndex) => {
    try {
      setDiets(prevDiets => prevDiets.map(diet => {
        if (diet._id === dietId) {
          return {
            ...diet,
            dailyMeals: diet.dailyMeals.map(day => {
              if (day._id === dayId) {
                const newMeals = { ...day };
                const items = [...newMeals[mealType].items];
                if (typeof items[itemIndex] === 'object') {
                  items[itemIndex] = { ...items[itemIndex], completed: !items[itemIndex].completed };
                }
                newMeals[mealType] = { ...newMeals[mealType], items };
                newMeals[mealType].completed = items.every(i => i.completed);
                return newMeals;
              }
              return day;
            })
          };
        }
        return diet;
      }));
      await api.patch(`/diets/${dietId}/meal/${dayId}/${mealType}/item/${itemIndex}/toggle`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update item');
      loadDiets();
    }
  };

  if (loading) {
    return <Loading size="lg" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-slate-100 dark:border-slate-800/50 pb-12">
        <div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-3">Diet <span className="text-primary-500">Plan.</span></h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Track your macros and reach your fitness goals.</p>
        </div>
        <button
          onClick={() => setShowPlanner(!showPlanner)}
          className="btn-primary px-8 py-5 rounded-2xl shadow-glow"
        >
          {showPlanner ? 'Close Planner' : <><FiPlus size={18} /> New Diet Plan</>}
        </button>
      </div>

      {showPlanner && (
        <div className="mb-12 animate-fade-in-up">
          <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shadow-xl">
            <DietPlanner onDietGenerated={handleDietGenerated} />
          </div>
        </div>
      )}

      {!showPlanner && diets.length === 0 && (
        <div className="max-w-3xl mx-auto text-center py-32 px-10 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-inner">
          <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-3xl flex items-center justify-center mx-auto mb-10 transform -rotate-6 shadow-glow">
            <FiZap size={48} />
          </div>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">Your <span className="text-primary-500">Nutrition.</span></h3>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-12 leading-relaxed uppercase tracking-[0.2em]">
            Get a personalized diet plan to fuel your workouts and stay healthy.
          </p>
          <button
            onClick={() => setShowPlanner(true)}
            className="btn-primary px-12 py-5 rounded-[1.5rem] shadow-glow"
          >
            <FiPlus size={20} /> Create Plan
          </button>
        </div>
      )}

      {!showPlanner && diets.length > 0 && (
        <div className="space-y-8 animate-fade-in-up">
          {diets.map((diet) => (
            <div key={diet._id} className="space-y-6">

              {/* Plan Header Card */}
              <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-premium">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        {diet.goal.replace('_', ' ')}
                      </h3>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] ${diet.status === 'active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 shadow-sm' : 'bg-slate-50 text-slate-500 border border-slate-100'
                        }`}>
                        {diet.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-3 uppercase tracking-widest">
                      <FiCalendar size={14} className="text-primary-500" /> Created On: {new Date(diet.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteDiet(diet._id)}
                    className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all border border-slate-50 dark:border-slate-900/30 rounded-xl"
                  >
                    <FiTrash2 /> Delete Plan
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-inner">
                  <div className="text-center">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Daily Calories</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{diet.targetCalories}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Protein</p>
                    <p className="text-3xl font-black text-primary-500 tabular-nums">{diet.targetProtein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Carbs</p>
                    <p className="text-3xl font-black text-secondary-500 tabular-nums">{diet.targetCarbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Fats</p>
                    <p className="text-3xl font-black text-primary-400 tabular-nums">{diet.targetFats}g</p>
                  </div>
                </div>
              </div>

              {/* Meals Grid */}
              <div className="grid grid-cols-1 gap-6">
                {diet.dailyMeals.map((day, i) => (
                  <div key={day._id || i} className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-premium">
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-6 uppercase tracking-tighter">
                      <span className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-sm font-black text-primary-600 shadow-sm">
                        {i + 1}
                      </span>
                      {new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <MealCard
                        meal={day.breakfast}
                        title="Breakfast"
                        onToggleItem={(index) => handleToggleItem(diet._id, day._id, 'breakfast', index)}
                      />
                      <MealCard
                        meal={day.lunch}
                        title="Lunch"
                        onToggleItem={(index) => handleToggleItem(diet._id, day._id, 'lunch', index)}
                      />
                      <MealCard
                        meal={day.dinner}
                        title="Dinner"
                        onToggleItem={(index) => handleToggleItem(diet._id, day._id, 'dinner', index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Diet;
