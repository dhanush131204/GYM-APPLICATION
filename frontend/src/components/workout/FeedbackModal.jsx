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
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-700"
                >
                    {!advice ? (
                        <>
                            <h2 className="text-2xl font-bold mb-4 text-center">Great Work! 💪</h2>
                            <p className="text-gray-400 text-center mb-6">How was that set of {exerciseName}?</p>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Did you feel any pain?</label>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setPain(false)}
                                            className={`flex-1 py-2 rounded-lg border ${!pain ? 'bg-green-600 border-green-600' : 'border-gray-600 hover:bg-gray-700'}`}
                                        >
                                            No, I'm good
                                        </button>
                                        <button
                                            onClick={() => setPain(true)}
                                            className={`flex-1 py-2 rounded-lg border ${pain ? 'bg-amber-500 border-amber-500' : 'border-gray-600 hover:bg-gray-700'}`}
                                        >
                                            Yes, a little
                                        </button>
                                    </div>
                                </div>

                                {pain && (
                                    <input
                                        type="text"
                                        placeholder="Where does it hurt? (e.g., Lower Back)"
                                        value={painArea}
                                        onChange={(e) => setPainArea(e.target.value)}
                                        className="w-full bg-gray-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-2">Difficulty</label>
                                    <div className="flex justify-between gap-2">
                                        {['easy', 'medium', 'hard'].map(d => (
                                            <button
                                                key={d}
                                                onClick={() => setDifficulty(d)}
                                                className={`flex-1 capitalize py-2 rounded-lg text-sm ${difficulty === d ? 'bg-blue-600' : 'bg-gray-700'}`}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={onClose} className="flex-1 py-3 text-gray-400 hover:text-white">Skip</button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50"
                                >
                                    {loading ? 'Analyzing...' : 'Submit'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-4 text-blue-400">AI Coach Advice</h3>
                            <p className="text-gray-300 mb-6 bg-gray-700/50 p-4 rounded-lg">{advice}</p>
                            <button
                                onClick={onClose}
                                className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700"
                            >
                                Got it, thanks!
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default FeedbackModal;
