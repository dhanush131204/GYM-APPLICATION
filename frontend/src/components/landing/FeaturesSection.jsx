import React from 'react';
import { FiActivity, FiTarget, FiUsers, FiZap, FiCpu } from 'react-icons/fi';

const features = [
    {
        icon: FiZap,
        title: 'Neural Engine',
        desc: 'Advanced biomechanical analysis protocols that optimize every repetition in real-time.',
        accent: 'indigo'
    },
    {
        icon: FiTarget,
        title: 'Adaptive Strategy',
        desc: 'Dynamic protocol adjustments that evolve with your physiological performance markers.',
        accent: 'slate'
    },
    {
        icon: FiActivity,
        title: 'Bio-Analytics',
        desc: 'Deep-layer data synthesis of sleep patterns, HRV, and metabolic efficiency.',
        accent: 'slate'
    },
    {
        icon: FiUsers,
        title: 'Elite Network',
        desc: 'Encrypted communication channel with world-class coaches and high-performance peers.',
        accent: 'slate'
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-32 bg-white dark:bg-[#0a0a0b] font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 sm:mb-24 max-w-3xl animate-fade-in text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg mb-6 mx-auto md:mx-0">
                        System Architecture
                    </div>
                    <h2 className="mb-8">Precision-Engineered <br /> <span className="text-slate-400 dark:text-slate-500 font-black">For Human Optimization.</span></h2>
                    <p className="text-base sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        We eliminated superficial metrics to focus on quantifiable physiological progression.
                        The OS combines verified sports science with enterprise-grade neural networks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group card-premium p-10 flex flex-col items-start"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                <feature.icon size={24} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {feature.title}
                            </h4>
                            <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-tighter">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
