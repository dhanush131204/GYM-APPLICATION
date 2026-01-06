import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoModal from './VideoModal';
import { FiPlay, FiArrowRight, FiActivity, FiZap, FiTarget, FiTrendingUp } from 'react-icons/fi';

const HeroSection = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section className="relative min-h-[95vh] flex items-center bg-white dark:bg-[#0a0a0b] overflow-hidden">
            {/* Premium Background Elements - More Dynamic */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-slate-200/50 dark:via-primary-500/10 to-transparent hidden lg:block" />
                <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-slate-200/50 dark:via-primary-500/10 to-transparent hidden lg:block" />

                {/* Orbital Glows */}
                <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-secondary-500/10 dark:bg-secondary-500/5 rounded-full blur-[120px]" />

                {/* Floating Particles Placeholder (using CSS) */}
                <div className="absolute inset-0 opacity-20 dark:opacity-40" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px', color: '#8b5cf6' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full z-10 py-24">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left Content - High Impact Typography */}
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex flex-wrap justify-center items-center gap-2 px-5 py-2 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/50 mb-8 shadow-sm max-w-full mx-auto md:mx-0"
                        >
                            <span className="flex h-3 w-3 relative flex-shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                            </span>
                            <span className="text-primary-700 dark:text-primary-300 font-black text-xs tracking-widest uppercase text-center whitespace-normal leading-tight">Enterprise Ecosystem</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mb-8 text-slate-900 dark:text-white leading-[0.95] text-center md:text-left break-words w-full text-xl sm:text-4xl md:text-6xl lg:text-7xl"
                        >
                            Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500 dark:from-primary-400 dark:to-secondary-400">Human Performance.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-xl font-medium"
                        >
                            Empowering elite athletes and enterprise gym networks with real-time bio-analytics and AI-driven protocols.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-6 mb-20 pb-24"
                        >
                            <Link to="/register" className="btn-primary px-12 py-5 text-base rounded-2xl shadow-glow">
                                Start Transformation <FiArrowRight className="ml-3 text-lg" />
                            </Link>
                            <button onClick={() => setIsVideoOpen(true)} className="btn-secondary px-12 py-5 text-base rounded-2xl border-2">
                                <FiPlay className="mr-3 text-primary-500" /> Watch Demo
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-12 border-t border-slate-100 dark:border-slate-800/50"
                        >
                            <div className="text-center sm:text-left">
                                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">50K+</p>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Active Users</p>
                            </div>
                            <div className="text-center sm:text-left">
                                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">1.2M</p>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Data Points</p>
                            </div>
                            <div className="text-center sm:text-left">
                                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">99.9%</p>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Precision</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Visual - 3D Multi-Layer Dashboard Mockup */}
                    <div className="relative hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative z-10"
                        >
                            {/* Main Interactive Card */}
                            <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-2xl p-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8">
                                    <FiZap className="text-4xl text-primary-500 animate-pulse" />
                                </div>

                                <div className="flex items-center gap-5 mb-10">
                                    <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-glow">
                                        <FiActivity className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black dark:text-white mb-1">REAL-TIME SYNC</h3>
                                        <p className="text-sm font-black text-primary-500 uppercase tracking-widest">Neural Link Active</p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <div className="flex justify-between items-end mb-3">
                                            <span className="text-sm font-black uppercase tracking-widest text-slate-500">VO2 Max Efficiency</span>
                                            <span className="text-base font-black text-primary-600">84%</span>
                                        </div>
                                        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "84%" }}
                                                transition={{ duration: 1.5, delay: 0.8 }}
                                                className="h-full bg-gradient-to-r from-primary-500 to-secondary-400"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-transparent hover:border-primary-500/30 transition-all">
                                            <FiTarget className="text-primary-500 mb-3 text-xl" />
                                            <p className="text-sm font-black uppercase text-slate-500 mb-1">Target</p>
                                            <p className="text-xl font-black dark:text-white">185 BPM</p>
                                        </div>
                                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-transparent hover:border-secondary-500/30 transition-all">
                                            <FiTrendingUp className="text-secondary-500 mb-3 text-xl" />
                                            <p className="text-sm font-black uppercase text-slate-500 mb-1">Progress</p>
                                            <p className="text-xl font-black dark:text-white">+12.4%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Secondary Elements */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -left-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-6 rounded-2xl shadow-2xl z-20 flex items-center gap-4"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                                    <FiZap size={20} />
                                </div>
                                <p className="text-sm font-black uppercase tracking-widest">Protocol Adaptive</p>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-8 -right-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xl z-20"
                            >
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800" />
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-primary-600 flex items-center justify-center text-xs font-black text-white">+12</div>
                                </div>
                                <p className="text-xs font-black uppercase text-slate-500 mt-3 tracking-widest">Live in Training</p>
                            </motion.div>
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
        </section >
    );
};

export default HeroSection;
