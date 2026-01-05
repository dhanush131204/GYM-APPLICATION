import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import Loading from '../common/Loading';
import { FiAward, FiShield, FiLock } from 'react-icons/fi';

const Badges = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      const response = await api.get('/gamification/badges');
      setBadges(response.data.badges || []);
    } catch (error) {
      toast.error('Protocol synchronization failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size="lg" />;
  }

  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <div className="max-w-5xl mx-auto py-12 animate-fade-in font-sans">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 font-black text-[10px] uppercase tracking-widest rounded-lg mb-4">
            Achievement Protocols
          </div>
          <h1 className="font-black text-slate-900 dark:text-white">Merit Registry.</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Validated expertise through technical proficiency.</p>
        </div>
        <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-3 shadow-premium">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
          <p className="text-xl font-black text-slate-900 dark:text-white">{earnedCount} / {badges.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`relative group p-8 rounded-3xl border transition-all duration-500 ${badge.earned
                ? 'bg-white dark:bg-[#111214] border-indigo-200 dark:border-indigo-900/40 shadow-premium hover:shadow-2xl'
                : 'bg-slate-50/50 dark:bg-slate-900/20 border-slate-100 dark:border-slate-800 opacity-60 grayscale'
              }`}
          >
            <div className="flex items-start justify-between mb-8">
              <div className={`p-4 rounded-2xl ${badge.earned ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                {badge.earned ? <FiAward size={24} /> : <FiLock size={24} />}
              </div>
              {badge.earned && (
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Validated</span>
              )}
            </div>

            <h3 className={`text-lg font-black uppercase tracking-tight mb-2 ${badge.earned ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              {badge.name}
            </h3>
            <p className="text-xs font-bold text-slate-400 leading-relaxed">
              {badge.description}
            </p>

            {badge.earned && (
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <FiShield className="text-indigo-500/20" size={64} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
