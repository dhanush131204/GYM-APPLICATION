const MealCard = ({ meal, title, onToggleItem, isReadOnly = false }) => {
  if (!meal) return null;

  const items = Array.isArray(meal.items) ? meal.items : [];

  return (
    <div className={`p-5 rounded-2xl transition-all border ${meal.completed
        ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/30'
        : 'bg-slate-50 border-slate-100 dark:bg-slate-900/40 dark:border-slate-800'
      }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</p>
          <h5 className="font-bold text-slate-900 dark:text-white leading-tight">
            {meal.name || 'Custom Meal'}
          </h5>
        </div>
        {!isReadOnly && onToggleItem && items.length > 0 && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${meal.completed
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
            }`}>
            {meal.completed ? <span className="font-bold">✓</span> : <span className="text-xs font-bold">{Math.round((items.filter(i => i.completed).length / items.length) * 100)}%</span>}
          </div>
        )}
      </div>

      <ul className="text-sm mb-4 space-y-2">
        {items.length > 0 ? (
          items.map((item, index) => {
            const itemText = typeof item === 'string' ? item : item.text;
            const isCompleted = typeof item === 'object' && item.completed;

            return (
              <li
                key={index}
                className={`flex items-start gap-3 cursor-pointer p-2.5 rounded-xl transition-all duration-200 group ${isCompleted
                    ? 'bg-white/50 dark:bg-black/20 text-slate-400'
                    : 'bg-white dark:bg-slate-800 hover:bg-white hover:shadow-sm dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                onClick={() => !isReadOnly && onToggleItem && onToggleItem(index)}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isCompleted
                    ? 'bg-emerald-500 border-emerald-500 text-white scale-100'
                    : 'border-slate-300 dark:border-slate-600 bg-transparent group-hover:border-emerald-400'
                  }`}>
                  {isCompleted && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`flex-1 font-medium ${isCompleted ? 'line-through decoration-slate-300 dark:decoration-slate-600' : ''}`}>{itemText}</span>
              </li>
            );
          })
        ) : (
          <li className="italic text-xs text-slate-400">No ingredients listed.</li>
        )}
      </ul>

      <div className="flex items-center gap-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
        <span>🔥 {meal.calories ?? 0}</span>
        <span>🥩 {meal.protein ?? 0}g</span>
        <span>🍞 {meal.carbs ?? 0}g</span>
        <span>🥑 {meal.fats ?? 0}g</span>
      </div>
    </div>
  );
};

export default MealCard;
