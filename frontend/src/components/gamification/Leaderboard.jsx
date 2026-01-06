import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import Loading from '../common/Loading';
import { FiAward, FiTrendingUp, FiChevronRight, FiCommand } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [period, setPeriod] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, [period]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/gamification/leaderboard?period=${period}`);
      setLeaderboard(response.data.leaderboard || []);
    } catch (error) {
      toast.error('Ranking synchronization failed');
    } finally {
      setLoading(false);
    }
  };

  const getRankStyle = (rank) => {
    if (rank === 1) return { icon: <FaTrophy className="text-amber-500" />, bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600' };
    if (rank === 2) return { icon: <FiAward className="text-slate-400" />, bg: 'bg-slate-50 dark:bg-slate-800', text: 'text-slate-500' };
    if (rank === 3) return { icon: <FiAward className="text-orange-400" />, bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600' };
    return { icon: <span className="text-xs font-black text-slate-400">#{rank}</span>, bg: 'bg-white dark:bg-transparent', text: '' };
  };

  if (loading) {
    return <Loading size="lg" />;
  }

  return (
    <div className="max-w-5xl mx-auto py-12 animate-fade-in font-sans">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest rounded-lg mb-4">
            <FiCommand className="inline" /> Performance Registry
          </div>
          <h1 className="font-black text-slate-900 dark:text-white">Elite Hierarchy.</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Real-time global operational ranking.</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
          {[
            { id: 'all', label: 'GLOBAL' },
            { id: 'monthly', label: 'CYCLE' },
            { id: 'weekly', label: 'SPRINT' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${period === p.id
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-premium overflow-hidden">
        {leaderboard.length === 0 ? (
          <div className="p-20 text-center">
            <FiTrendingUp className="mx-auto text-slate-200 dark:text-slate-800 mb-6" size={48} />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No Active Operational Data</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {leaderboard.map((entry, index) => {
              const rank = index + 1;
              const style = getRankStyle(rank);

              return (
                <div
                  key={entry.user?.id || index}
                  className="flex items-center justify-between p-8 hover:bg-slate-50 group transition-all"
                >
                  <div className="flex items-center gap-8">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${style.bg}`}>
                      {style.icon}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-black text-xs uppercase">
                        {(entry.user?.name || 'U').charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{entry.user?.name}</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                          Level {entry.level || 1} <span className="mx-2 opacity-20">|</span> Verified
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-2xl font-black tracking-tighter ${rank <= 3 ? style.text : 'text-slate-900 dark:text-white'}`}>
                      {entry.points.toLocaleString()}
                    </p>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">
                      Protocol Points
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest opacity-40">
          Authenticated Real-Time Ledger
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
