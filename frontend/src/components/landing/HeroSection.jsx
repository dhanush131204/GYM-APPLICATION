import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoModal from './VideoModal';
import { FiPlay, FiCheck, FiArrowRight, FiActivity, FiZap, FiBarChart2 } from 'react-icons/fi';

const HeroSection = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section className="relative min-h-screen flex items-center bg-white dark:bg-[#0a0a0b] overflow-hidden">
            {/* 2030 Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-px h-full bg-slate-200/50 dark:bg-slate-800/30 hidden lg:block" />
                <div className="absolute top-0 left-3/4 w-px h-full bg-slate-200/50 dark:bg-slate-800/30 hidden lg:block" />
                <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200/50 dark:bg-slate-800/30 hidden lg:block" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50/50 dark:bg-indigo-950/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Content */}
                    <div className="max-w-2xl animate-fade-in">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-10">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-slate-600 dark:text-slate-400 font-bold text-[10px] tracking-[0.2em] uppercase">Enterprise Fitness OS</span>
                        </div>

                        <h1 className="mb-8">
                            High-Performance <br className="hidden lg:block" />
                            <span className="text-slate-400 dark:text-slate-500">Training Ecosystem.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
                            The industry-standard platform for elite athletes and enterprise gym management.
                            Built for precision, powered by data.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 mb-16">
                            <Link to="/register" className="btn-primary px-10 py-4 text-base">
                                Create Account <FiArrowRight className="ml-2" />
                            </Link>
                            <button onClick={() => setIsVideoOpen(true)} className="btn-secondary px-10 py-4 text-base">
                                <FiPlay className="mr-2" /> System Overview
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-10 pt-10 border-t border-slate-100 dark:border-slate-900/50">
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">20k+</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Users</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">500+</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Protocols</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">12+</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Locales</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual - Structured Performance Modules */}
                    <div className="relative hidden lg:block perspective-1000">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            {/* Card 1: Performance Matrix */}
                            <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-premium p-6 ml-12 hover:-translate-y-1 transition-transform">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
                                            <FiActivity />
                                        </div>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white italic">Live Bio-Metrics</span>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-500">SYNCED</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-[70%]" />
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-900 dark:bg-white w-[45%]" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Strategic Insights (The Centering visual) */}
                            <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none rounded-2xl shadow-2xl p-8 relative z-10 scale-105">
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.2em] mb-2">Protocol Status</p>
                                        <h3 className="text-2xl font-black text-white dark:text-slate-900">Hypertrophy A2</h3>
                                    </div>
                                    <FiZap className="text-2xl text-amber-400" />
                                </div>
                                <div className="flex items-end gap-3 h-20">
                                    {[40, 70, 50, 90, 60, 80, 55].map((h, i) => (
                                        <div key={i} className="flex-1 bg-white/20 dark:bg-slate-900/10 rounded-t-sm" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>

                            {/* Card 3: System Users */}
                            <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-premium p-6 mr-12 hover:-translate-y-1 transition-transform">
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111214] bg-slate-200 dark:bg-slate-800" />
                                        ))}
                                    </div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Team Sync Active</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoId="gcNh17Ckjgg"
                title="System Overview"
            />
        </section>
    );
};

export default HeroSection;
