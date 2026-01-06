const MealCard = ({ meal, title, onToggleItem, isReadOnly = false }) => {
  if (!meal) return null;

  const items = Array.isArray(meal.items) ? meal.items : [];

  return (
    <div className={`p-8 rounded-[2rem] transition-all border ${meal.completed
      ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/30 shadow-inner'
      : 'bg-slate-50 border-slate-100 dark:bg-slate-900/40 dark:border-slate-800'
      }`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 font-mono">{title}</p>
          <h5 className="text-lg font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tighter">
            {meal.name || 'Custom Meal'}
          </h5>
        </div>
        {!isReadOnly && onToggleItem && items.length > 0 && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${meal.completed
            ? 'bg-emerald-500 text-white shadow-glow'
            : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
            }`}>
            {meal.completed ? <span className="font-black text-sm">✓</span> : <span className="text-xs font-black">{Math.round((items.filter(i => i.completed).length / items.length) * 100)}%</span>}
          </div>
        )}
      </div>

      <ul className="text-xs mb-8 space-y-3">
        {items.length > 0 ? (
          items.map((item, index) => {
            const itemText = typeof item === 'string' ? item : item.text;
            const isCompleted = typeof item === 'object' && item.completed;

            return (
              <li
                key={index}
                className={`flex items-start gap-4 cursor-pointer p-3 rounded-xl transition-all duration-300 group border ${isCompleted
                  ? 'bg-white/30 dark:bg-black/10 border-transparent text-slate-400'
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-primary-500/50 hover:shadow-sm text-slate-700 dark:text-slate-200'
                  }`}
                onClick={() => !isReadOnly && onToggleItem && onToggleItem(index)}
              >
                <div className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isCompleted
                  ? 'bg-emerald-500 border-emerald-500 text-white scale-100 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 bg-transparent group-hover:border-primary-500/50'
                  }`}>
                  {isCompleted && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`flex-1 font-black uppercase tracking-widest leading-relaxed ${isCompleted ? 'line-through decoration-slate-300 dark:decoration-slate-600' : ''}`}>{itemText}</span>
              </li>
            );
          })
        ) : (
          <li className="italic text-xs text-slate-400">No ingredients listed.</li>
        )}
      </ul>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 text-xs font-black text-slate-500 uppercase tracking-[0.2em] font-mono">
        <span className="flex items-center gap-1.5"><span className="text-slate-400">CAL.</span> <span className="text-slate-900 dark:text-white font-black">{meal.calories ?? 0}</span></span>
        <span className="flex items-center gap-1.5"><span className="text-primary-500">PRO.</span> <span className="text-slate-900 dark:text-white font-black">{meal.protein ?? 0}g</span></span>
        <span className="flex items-center gap-1.5"><span className="text-secondary-500">CRB.</span> <span className="text-slate-900 dark:text-white font-black">{meal.carbs ?? 0}g</span></span>
        <span className="flex items-center gap-1.5"><span className="text-primary-400">FAT.</span> <span className="text-slate-900 dark:text-white font-black">{meal.fats ?? 0}g</span></span>
      </div>
    </div>
  );
};

export default MealCard;
