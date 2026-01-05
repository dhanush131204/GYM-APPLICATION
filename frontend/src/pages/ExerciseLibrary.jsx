import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api, { BASE_URL } from '../utils/api';
import Loading from '../components/common/Loading';
import { Link } from 'react-router-dom';
import { FiPlay, FiGrid, FiActivity } from 'react-icons/fi';

const ExerciseLibrary = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const res = await api.get('/exercises');
                setExercises(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchExercises();
    }, []);

    const filteredExercises = filter === 'All'
        ? exercises
        : exercises.filter(ex => ex.muscleGroup === filter || ex.difficulty === filter);

    const getMediaUrl = (url) => {
        if (!url) return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80';
        if (url.startsWith('/uploads/')) return `${BASE_URL}${url}`;
        return url;
    };

    if (loading) return <Loading size="lg" />;

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Exercise Library</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400">Master your form with professional video guides and AI coaching.</p>
                </div>

                {/* Filters */}
                <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                    {['All', 'Chest', 'Legs', 'Back', 'Beginner', 'Advanced'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === f
                                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg'
                                    : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredExercises.map(exercise => (
                        <motion.div
                            key={exercise._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group bg-white dark:bg-[#111214] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden">
                                <img
                                    src={getMediaUrl(exercise.imageUrl || exercise.videoUrl)}
                                    alt={exercise.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                                        <FiPlay className="w-6 h-6 text-white ml-1" />
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md backdrop-blur-md ${exercise.difficulty === 'Beginner'
                                            ? 'bg-emerald-500/90 text-white'
                                            : 'bg-amber-500/90 text-white'
                                        }`}>
                                        {exercise.difficulty}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{exercise.name}</h2>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{exercise.muscleGroup}</p>
                                </div>

                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 leading-relaxed">
                                    {exercise.description}
                                </p>

                                <Link
                                    to={`/exercises/${exercise._id}`}
                                    className="block w-full py-3 text-center rounded-xl text-sm font-bold transition-all bg-slate-50 text-slate-900 hover:bg-slate-100 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                                >
                                    Start Coaching
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExerciseLibrary;
