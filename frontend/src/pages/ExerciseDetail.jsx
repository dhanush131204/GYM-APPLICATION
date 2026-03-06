import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { BASE_URL } from '../utils/api';
import Loading from '../components/common/Loading';
import AiCoach from '../components/workout/AiCoach';
import FeedbackModal from '../components/workout/FeedbackModal';
import { toast } from 'react-hot-toast';
import { FiClock, FiActivity, FiAlertCircle, FiInfo } from 'react-icons/fi';

const ExerciseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [activeTab, setActiveTab] = useState('guide'); // guide, ai

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const res = await api.get(`/exercises/${id}`);
                setExercise(res.data);
            } catch (err) {
                toast.error("Failed to load exercise");
                navigate('/exercises');
            } finally {
                setLoading(false);
            }
        };
        fetchExercise();
    }, [id, navigate]);

    useEffect(() => {
        let interval;
        if (isTimerRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0 && isTimerRunning) {
            setIsTimerRunning(false);
            setShowFeedback(true);
            toast.success("Workout Complete!");
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timer]);

    const startTimer = (duration) => {
        setTimer(duration);
        setIsTimerRunning(true);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (loading) return <Loading />;
    if (!exercise) return null;

    const isLocalVideo = exercise.videoUrl?.startsWith('/uploads/');
    const videoSrc = isLocalVideo ? `${BASE_URL}${exercise.videoUrl}` : exercise.videoUrl;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Visuals & Guide */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 aspect-video relative group">
                            {isLocalVideo ? (
                                <video
                                    src={videoSrc}
                                    controls
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <iframe
                                    className="w-full h-full"
                                    src={videoSrc.replace("watch?v=", "embed/")}
                                    title={exercise.name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>

                        <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                <div>
                                    <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tighter">{exercise.name}</h1>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest bg-primary-50 text-primary-600 dark:bg-primary-900/20">
                                            {exercise.muscleGroup}
                                        </span>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${exercise.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-primary-50 text-primary-600 dark:bg-primary-900/20'
                                            }`}>
                                            {exercise.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex p-1.5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <button
                                        onClick={() => setActiveTab('guide')}
                                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'guide' ? 'bg-white dark:bg-slate-800 shadow-sm text-primary-600 dark:text-primary-400' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Step Guide
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('ai')}
                                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'ai' ? 'bg-white dark:bg-slate-800 shadow-sm text-primary-600 dark:text-primary-400' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        AI Coach
                                    </button>
                                </div>
                            </div>

                            {activeTab === 'guide' ? (
                                <div className="space-y-10 animate-fade-in font-sans">
                                    <div>
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center text-xs border border-primary-100 dark:border-primary-800/50">01</div>
                                            Instructions
                                        </h3>
                                        <ol className="space-y-6 pl-6 border-l-2 border-slate-100 dark:border-slate-800 ml-5">
                                            {exercise.steps.map((step, i) => (
                                                <li key={i} className="text-sm font-bold text-slate-600 dark:text-slate-300 pl-6 relative leading-relaxed uppercase tracking-wide">
                                                    <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-primary-500 border-4 border-white dark:border-[#111214]"></span>
                                                    {step}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/20 rounded-[1.5rem] p-6 shadow-sm">
                                            <h3 className="text-xs font-black text-primary-600 dark:text-primary-400 mb-4 flex items-center gap-3 uppercase tracking-widest">
                                                <FiAlertCircle size={14} /> Watch Out For
                                            </h3>
                                            <ul className="space-y-3">
                                                {exercise.commonMistakes.map((m, i) => (
                                                    <li key={i} className="text-xs font-bold text-primary-800 dark:text-primary-300/80 flex items-start gap-3 leading-relaxed">
                                                        <span className="w-1 h-1 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" /> {m}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-secondary-50 dark:bg-secondary-900/10 border border-secondary-100 dark:border-secondary-900/20 rounded-[1.5rem] p-6 shadow-sm">
                                            <h3 className="text-xs font-black text-secondary-600 dark:text-secondary-400 mb-4 flex items-center gap-3 uppercase tracking-widest">
                                                <FiActivity size={14} /> Breathing Technique
                                            </h3>
                                            <p className="text-xs font-bold text-secondary-800 dark:text-secondary-300/80 uppercase tracking-wide leading-relaxed">
                                                {exercise.breathing}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <AiCoach exerciseName={exercise.name} defaultTips={exercise.aiTips} />
                            )}
                        </div>
                    </div>

                    {/* Right Column: Timer & Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 sm:p-10 sticky top-12 shadow-premium">
                            <div className="text-center mb-10">
                                <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Workout Timer</div>
                                <div className="text-7xl font-black text-slate-900 dark:text-white font-mono tracking-tighter tabular-nums mb-2">
                                    {formatTime(timer)}
                                </div>
                                <div className="h-1 w-20 bg-primary-500 mx-auto rounded-full opacity-30" />
                            </div>

                            {!isTimerRunning ? (
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <button
                                        onClick={() => startTimer(300)}
                                        className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                                    >
                                        5 Min
                                    </button>
                                    <button
                                        onClick={() => startTimer(600)}
                                        className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                                    >
                                        10 Min
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsTimerRunning(false)}
                                    className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold mb-4 shadow-lg shadow-amber-500/30 transition-all"
                                >
                                    Pause Workout
                                </button>
                            )}

                            {!isTimerRunning && (
                                <button className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 font-bold transition-all">
                                    Custom Timer
                                </button>
                            )}

                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <FiInfo className="text-blue-500" /> Pro Tip
                                </h4>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                                    <p className="text-sm text-blue-800 dark:text-blue-200 italic leading-relaxed">
                                        "{exercise.aiTips || "Focus on controlling the eccentric (lowering) phase of the movement for maximum muscle growth."}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showFeedback && (
                <FeedbackModal
                    exerciseName={exercise.name}
                    onClose={() => setShowFeedback(false)}
                />
            )}
        </div>
    );
};

export default ExerciseDetail;
