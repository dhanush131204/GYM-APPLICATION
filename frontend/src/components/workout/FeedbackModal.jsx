import { useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackModal = ({ exerciseName, onClose }) => {
    const [pain, setPain] = useState(false);
    const [painArea, setPainArea] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [loading, setLoading] = useState(false);
    const [advice, setAdvice] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await api.post('/exercises/feedback', {
                exerciseName,
                pain: pain ? painArea : null,
                difficulty
            });
            setAdvice(res.data.advice);
            toast.success("Feedback recorded!");
        } catch (error) {
            toast.error("Failed to submit feedback");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white dark:bg-[#111214] rounded-[2.5rem] max-w-lg w-full p-10 shadow-premium border border-slate-200 dark:border-slate-800"
                >
                    {!advice ? (
                        <>
                            <h2 className="text-4xl font-black mb-4 text-center text-slate-900 dark:text-white uppercase tracking-tighter">Session <span className="text-primary-500">Success.</span></h2>
                            <p className="text-sm font-bold text-slate-500 text-center mb-10 uppercase tracking-widest">Diagnostic feedback required for {exerciseName}.</p>

                            <div className="space-y-8 mb-10">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Somatic Signal Detection: Pain?</label>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setPain(false)}
                                            className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${!pain ? 'bg-primary-50 border-primary-200 text-primary-600 dark:bg-primary-900/20 dark:border-primary-800/50 shadow-sm' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                                        >
                                            No Signal
                                        </button>
                                        <button
                                            onClick={() => setPain(true)}
                                            className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${pain ? 'bg-primary-50 border-primary-200 text-primary-600 dark:bg-primary-900/10 dark:border-primary-800/50 shadow-sm' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                                        >
                                            Signal Detected
                                        </button>
                                    </div>
                                </div>

                                {pain && (
                                    <input
                                        type="text"
                                        placeholder="LOCATION COORDINATES (E.G. LOWER LUMBAR)"
                                        value={painArea}
                                        onChange={(e) => setPainArea(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl py-4 px-6 outline-none focus:ring-1 focus:ring-primary-500 transition-all text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white"
                                    />
                                )}

                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Intensity Calibration</label>
                                    <div className="flex justify-between gap-3">
                                        {['easy', 'medium', 'hard'].map(d => (
                                            <button
                                                key={d}
                                                onClick={() => setDifficulty(d)}
                                                className={`flex-1 capitalize py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${difficulty === d ? 'bg-primary-600 text-white shadow-glow' : 'bg-slate-50 dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800'}`}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={onClose} className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Discard</button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || (pain && !painArea)}
                                    className="flex-1 btn-primary py-4 rounded-2xl shadow-glow"
                                >
                                    {loading ? 'Processing...' : 'Sync Data'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <h3 className="text-xs font-black mb-8 text-primary-500 uppercase tracking-[0.3em]">Neural Insight Analysis</h3>
                            <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-10 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 leading-relaxed uppercase tracking-wide">
                                {advice}
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full btn-primary py-4 rounded-2xl shadow-glow"
                            >
                                Protocol Understood
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default FeedbackModal;
