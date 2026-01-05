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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Nutrition & Macros</h1>
          <p className="text-slate-600 dark:text-slate-400">Track your caloric intake and meal plans.</p>
        </div>
        <button
          onClick={() => setShowPlanner(!showPlanner)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-slate-900/10 dark:shadow-none"
        >
          {showPlanner ? 'Close Planner' : <><FiPlus /> New Meal Plan</>}
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
        <div className="max-w-2xl mx-auto text-center py-20 px-6">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center mx-auto mb-8 transform -rotate-3">
            <span className="text-4xl">🍎</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Precision Nutrition</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            Fuel your performance. Let our algorithms calculate your exact macro targets and generate a meal plan.
          </p>
          <button
            onClick={() => setShowPlanner(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-emerald-600/20"
          >
            <FiPlus /> Create Nutrition Plan
          </button>
        </div>
      )}

      {!showPlanner && diets.length > 0 && (
        <div className="space-y-8 animate-fade-in-up">
          {diets.map((diet) => (
            <div key={diet._id} className="space-y-6">

              {/* Plan Header Card */}
              <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        {diet.goal.replace('_', ' ')}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${diet.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600'
                        }`}>
                        {diet.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" /> Generated on {new Date(diet.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteDiet(diet._id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-400 hover:text-rose-600 transition-colors bg-slate-50 hover:bg-rose-50 dark:bg-slate-900 dark:hover:bg-rose-900/10 rounded-lg"
                  >
                    <FiTrash2 /> Delete Plan
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Calories</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{diet.targetCalories}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Protein</p>
                    <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{diet.targetProtein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Carbs</p>
                    <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{diet.targetCarbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Fats</p>
                    <p className="text-2xl font-black text-amber-500">{diet.targetFats}g</p>
                  </div>
                </div>
              </div>

              {/* Meals Grid */}
              <div className="grid grid-cols-1 gap-6">
                {diet.dailyMeals.map((day, i) => (
                  <div key={day._id || i} className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm">
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
