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
                                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{exercise.name}</h1>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                            {exercise.muscleGroup}
                                        </span>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${exercise.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                            }`}>
                                            {exercise.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                    <button
                                        onClick={() => setActiveTab('guide')}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'guide' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Step Guide
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('ai')}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'ai' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        AI Coach
                                    </button>
                                </div>
                            </div>

                            {activeTab === 'guide' ? (
                                <div className="space-y-8 animate-fade-in">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-sm">1</span>
                                            Execution
                                        </h3>
                                        <ol className="space-y-3 pl-4 border-l-2 border-slate-100 dark:border-slate-800 ml-3">
                                            {exercise.steps.map((step, i) => (
                                                <li key={i} className="text-slate-600 dark:text-slate-300 pl-4 relative">
                                                    <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                                                    {step}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl p-5">
                                            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-500 mb-3 flex items-center gap-2">
                                                <FiAlertCircle /> Common Mistakes
                                            </h3>
                                            <ul className="space-y-2">
                                                {exercise.commonMistakes.map((m, i) => (
                                                    <li key={i} className="text-sm text-amber-800 dark:text-amber-400/90 flex items-start gap-2">
                                                        <span>•</span> {m}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-xl p-5">
                                            <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-500 mb-3 flex items-center gap-2">
                                                <FiActivity /> Breathing
                                            </h3>
                                            <p className="text-sm text-emerald-800 dark:text-emerald-400/90">
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
                        <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 sticky top-6">
                            <div className="text-center mb-8">
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Smart Timer</div>
                                <div className="text-6xl font-black text-slate-900 dark:text-white font-mono tracking-tighter">
                                    {formatTime(timer)}
                                </div>
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
                                    Pause Session
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
