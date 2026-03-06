import React from 'react';
import { FiActivity, FiTarget, FiUsers, FiZap, FiCpu } from 'react-icons/fi';

const features = [
    {
        icon: FiZap,
        title: 'Smart AI Trainer',
        desc: 'Intelligent analysis that helps you get the most out of every single move.',
        accent: 'indigo'
    },
    {
        icon: FiTarget,
        title: 'Personalized Plans',
        desc: 'Workouts that change and grow as you get stronger and reach new goals.',
        accent: 'slate'
    },
    {
        icon: FiActivity,
        title: 'Health Insights',
        desc: 'Detailed tracking of your progress, sleep patterns, and daily energy levels.',
        accent: 'slate'
    },
    {
        icon: FiUsers,
        title: 'Community Support',
        desc: 'Connect with professional coaches and a community that keeps you motivated.',
        accent: 'slate'
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-32 bg-white dark:bg-[#0a0a0b] font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 sm:mb-24 max-w-3xl animate-fade-in text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg mb-6 mx-auto md:mx-0">
                        How it Works
                    </div>
                    <h2 className="mb-8">Built to Help You <br /> <span className="text-slate-400 dark:text-slate-500 font-black">Reach Your Best.</span></h2>
                    <p className="text-base sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        We focus on the results that matter most to your health. Our app uses modern science and smart AI to keep you on track.
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
