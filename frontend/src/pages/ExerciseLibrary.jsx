import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api, { BASE_URL } from '../utils/api';
import Loading from '../components/common/Loading';
import { Link } from 'react-router-dom';
import { FiPlay, FiGrid, FiActivity } from 'react-icons/fi';
import SafeImage from '../components/common/SafeImage';

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-12">
                <div className="text-center mb-16 sm:mb-20 animate-fade-in">
                    <h1 className="text-slate-900 dark:text-white mb-6 tracking-tighter uppercase">Exercise <span className="text-primary-500">Library.</span></h1>
                    <p className="text-base font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed px-4">
                        Master your fitness through <span className="text-primary-600 dark:text-primary-400">easy-to-follow video guides</span> and AI-powered coaching.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-start sm:justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                    {['All', 'Chest', 'Legs', 'Back', 'Beginner', 'Advanced'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2.5 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border shadow-sm ${filter === f
                                ? 'bg-primary-600 border-primary-500 text-white shadow-glow'
                                : 'bg-white text-slate-400 hover:text-slate-900 dark:bg-[#111214] dark:text-slate-500 dark:hover:text-white border-slate-200 dark:border-slate-800'
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
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group bg-white dark:bg-[#111214] rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 transition-all hover:shadow-premium-hover hover:-translate-y-2"
                        >
                            <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden">
                                <SafeImage
                                    src={getMediaUrl(exercise.imageUrl || exercise.videoUrl)}
                                    alt={exercise.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-primary-950/20 group-hover:bg-primary-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                        <FiPlay className="w-8 h-8 text-white ml-1.5" />
                                    </div>
                                </div>
                                <div className="absolute top-5 right-5">
                                    <span className={`text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-xl backdrop-blur-lg border border-white/20 ${exercise.difficulty === 'Beginner'
                                        ? 'bg-emerald-500/80 text-white'
                                        : 'bg-primary-500/80 text-white'
                                        }`}>
                                        {exercise.difficulty}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="mb-6">
                                    <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight group-hover:text-primary-500 transition-colors">{exercise.name}</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{exercise.muscleGroup}</p>
                                </div>

                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 line-clamp-2 mb-8 uppercase tracking-wide opacity-80 leading-relaxed">
                                    {exercise.description}
                                </p>

                                <Link
                                    to={`/exercises/${exercise._id}`}
                                    className="block w-full py-4 text-center rounded-2xl text-xs font-black uppercase tracking-widest transition-all bg-slate-50 text-slate-900 hover:bg-primary-600 hover:text-white dark:bg-slate-900 dark:text-white dark:hover:bg-primary-600 shadow-sm hover:shadow-glow"
                                >
                                    Start Exercise
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
