import React from 'react';
import { FiCheck, FiZap, FiShield, FiStar } from 'react-icons/fi';

const MembershipSection = () => {
    const tiers = [
        {
            name: "Standard",
            price: "29",
            desc: "Essential tracking for committed individuals.",
            features: ["Personalized Workout Plans", "Basic Diet Tracking", "Standard AI Coach Support", "Community Access"],
            btnText: "Join Standard",
            highlight: false,
            icon: FiZap
        },
        {
            name: "Enterprise",
            price: "89",
            desc: "Elite protocols for professional performance.",
            features: ["Advanced Biometric Sync", "Pro Diet Micro-Tracking", "Full AI Voice Coaching", "Early Feature Access", "Priority Support"],
            btnText: "Scale to Enterprise",
            highlight: true,
            icon: FiStar
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-[#0a0a0b] relative overflow-hidden">
            {/* Subtle structural grid */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-slate-200 dark:bg-slate-800/50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 sm:mb-20 animate-fade-in">
                    <h2 className="mb-4">Tailored Performance Tiers.</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto px-4">
                        Choose the operating system that matches your ambition. No hidden fees, just pure results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative p-8 md:p-12 rounded-3xl border transition-all duration-300 ${tier.highlight
                                ? 'bg-slate-900 border-slate-800 shadow-2xl md:scale-105 z-10'
                                : 'bg-white dark:bg-[#111214] border-slate-200 dark:border-slate-800'
                                }`}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                                    Recommended
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-3 rounded-2xl ${tier.highlight ? 'bg-white/10 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'}`}>
                                    <tier.icon size={24} />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-black ${tier.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                        {tier.name}
                                    </h3>
                                    <p className={`text-xs ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Monthly Billing
                                    </p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-3xl sm:text-4xl font-black ${tier.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                        ${tier.price}
                                    </span>
                                    <span className={`text-base sm:text-lg font-bold ${tier.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                                        /mo
                                    </span>
                                </div>
                                <p className={`mt-4 text-sm leading-relaxed ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {tier.desc}
                                </p>
                            </div>

                            <div className="space-y-4 mb-10">
                                {tier.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-start gap-3">
                                        <div className={`mt-1 p-0.5 rounded-full ${tier.highlight ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'}`}>
                                            <FiCheck size={14} />
                                        </div>
                                        <span className={`text-sm font-medium ${tier.highlight ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-4 rounded-2xl font-black transition-all ${tier.highlight
                                ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-lg shadow-white/5'
                                : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700'
                                }`}>
                                {tier.btnText}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800/50 flex flex-wrap justify-center gap-12 opacity-40">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500 grayscale transition hover:grayscale-0">
                        <FiShield /> Certified Secure
                    </div>
                    {/* Add more trust icons if needed */}
                </div>
            </div>
        </section>
    );
};

export default MembershipSection;
