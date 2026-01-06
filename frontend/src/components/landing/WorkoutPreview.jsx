import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import VideoModal from './VideoModal';
import SafeImage from '../common/SafeImage';
import { FiClock, FiActivity, FiArrowRight, FiPlayCircle } from 'react-icons/fi';

const workouts = [
    {
        id: "hiit-intensity",
        title: "Metabolic Conditioning",
        level: "Advanced",
        time: "20 min",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
        videoId: "ml6cT4AZdqI",
        tag: "High Intensity"
    },
    {
        id: "yoga-flow",
        title: "Mobility & Recovery",
        level: "Beginner",
        time: "30 min",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
        videoId: "sTANio_2E0Q",
        tag: "Restorative"
    },
    {
        id: "strength-master",
        title: "Hypertrophy Basics",
        level: "Intermediate",
        time: "45 min",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?q=80&w=800&auto=format&fit=crop",
        videoId: "66YidY0pIn4",
        tag: "Strength"
    }
];

const WorkoutPreview = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleViewAll = () => {
        navigate(user ? '/exercises' : '/login');
    };

    return (
        <section className="py-24 bg-white dark:bg-[#0a0a0b] border-y border-slate-100 dark:border-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 gap-8 px-4 sm:px-0">
                    <div className="max-w-2xl">
                        <h2 className="mb-4 font-black">Curated Protocols.</h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            Explore a selection of our most effective training modules, engineered for specific metabolic responses and goal-oriented results.
                        </p>
                    </div>
                    <button
                        onClick={handleViewAll}
                        className="group text-[10px] sm:text-xs font-black text-slate-900 dark:text-white flex items-center gap-3 transition-all uppercase tracking-[0.2em] border-b-2 border-slate-900 dark:border-white pb-1 hover:gap-5"
                    >
                        Archive Repository <FiArrowRight />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {workouts.map((workout, index) => (
                        <div
                            key={index}
                            className="group relative bg-white dark:bg-[#111214] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-premium transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                        >
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <SafeImage
                                    src={workout.image}
                                    alt={workout.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                                        <FiPlayCircle size={24} />
                                    </div>
                                </div>
                                <div className="absolute bottom-5 left-5">
                                    <span className="badge bg-white/10 backdrop-blur-md border-white/20 text-white">
                                        <FiClock className="mr-1.5" /> {workout.time}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2">{workout.tag}</p>
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{workout.title}</h3>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/50">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{workout.level}</span>
                                    <button
                                        onClick={() => setSelectedVideo(workout)}
                                        className="text-xs font-black text-slate-900 dark:text-white hover:text-indigo-600 transition-colors flex items-center gap-2"
                                    >
                                        INITIALIZE <FiArrowRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                videoId={selectedVideo?.videoId}
                title={selectedVideo?.title}
            />
        </section>
    );
};

export default WorkoutPreview;
