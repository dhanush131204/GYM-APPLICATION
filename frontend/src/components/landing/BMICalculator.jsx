import React, { useState } from 'react';
import { FiActivity, FiTrendingUp, FiCheckCircle, FiInfo } from 'react-icons/fi';

const BMICalculator = () => {
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);

    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

    const getBMIStatus = (bmi) => {
        if (bmi < 18.5) return { label: 'UNDERWEIGHT', color: 'text-blue-500', bg: 'bg-blue-500', width: '25%' };
        if (bmi < 25) return { label: 'HEALTHY', color: 'text-emerald-500', bg: 'bg-emerald-500', width: '50%' };
        if (bmi < 30) return { label: 'OVERWEIGHT', color: 'text-amber-500', bg: 'bg-amber-500', width: '75%' };
        return { label: 'OBESE', color: 'text-orange-600', bg: 'bg-orange-600', width: '100%' };
    };

    const status = getBMIStatus(bmi);

    return (
        <section className="py-24 bg-white dark:bg-[#0a0a0b] font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    <div className="animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-500 text-xs font-black uppercase tracking-widest rounded-lg mb-6">
                            Biometric Analysis
                        </div>
                        <h2 className="mb-8">Body Composition Registry.</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                            While BMI is a foundational metric, it provides the initial dataset for physiological indexing.
                            Our full platform implements muscle-mass tracking and metabolic rate synthesis.
                        </p>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { icon: FiActivity, title: 'Instant Analysis', desc: 'Real-time calculation based on your biometric metrics.' },
                                { icon: FiTrendingUp, title: 'Trend Tracking', desc: 'Log your stats over time to visualize system progress.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5 p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-indigo-500">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-xs font-bold text-slate-400 uppercase mt-1 tracking-tighter">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-premium p-10 lg:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10">
                            <FiInfo size={120} />
                        </div>

                        <div className="grid gap-12 mb-12">
                            <div>
                                <label className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                                    <span>Weight Protocol</span>
                                    <span className="text-slate-900 dark:text-white">{weight} KG</span>
                                </label>
                                <input
                                    type="range"
                                    min="30"
                                    max="150"
                                    value={weight}
                                    onChange={(e) => setWeight(Number(e.target.value))}
                                    className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-slate-900 dark:accent-white"
                                />
                            </div>

                            <div>
                                <label className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                                    <span>Height Protocol</span>
                                    <span className="text-slate-900 dark:text-white">{height} CM</span>
                                </label>
                                <input
                                    type="range"
                                    min="120"
                                    max="220"
                                    value={height}
                                    onChange={(e) => setHeight(Number(e.target.value))}
                                    className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-slate-900 dark:accent-white"
                                />
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-[#0a0a0b] rounded-[2rem] p-10 text-center border border-slate-100 dark:border-slate-800/60 shadow-inner">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Calculated BMI</p>
                            <p className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">{bmi}</p>

                            <div className={`badge ${status.bg.replace('bg-', 'bg-').replace('500', '100').replace('600', '100')} ${status.color}`}>
                                {status.label}
                            </div>
                        </div>

                        <div className="mt-10 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1 overflow-hidden">
                            <div
                                style={{ width: status.width }}
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${status.bg}`}
                            ></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BMICalculator;
