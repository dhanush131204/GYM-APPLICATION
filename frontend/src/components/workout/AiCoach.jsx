import { useState, useEffect, useRef } from 'react';
import api from '../../utils/api';
import { FiCpu, FiAlertTriangle, FiCheckCircle, FiSend, FiUser, FiActivity } from 'react-icons/fi';

const AiCoach = ({ exerciseName }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchInitialGuide = async () => {
            setLoading(true);
            try {
                const res = await api.post('/exercises/ask-ai', { exerciseName });
                setMessages([{ role: 'ai', content: res.data }]);
            } catch (err) {
                setError("EXPERIENCING CONNECTION ISSUES: UNABLE TO REACH AI COACH");
            } finally {
                setLoading(false);
            }
        };
        fetchInitialGuide();
    }, [exerciseName]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        try {
            const res = await api.post('/exercises/ask-ai', {
                exerciseName,
                query: userMsg
            });
            setMessages(prev => [...prev, { role: 'ai', content: res.data }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: { message: "MESSAGE INTERRUPTED: PLEASE RETRY" }
            }]);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] text-amber-500 font-black uppercase text-xs tracking-widest gap-4">
                <FiAlertTriangle size={32} />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#0a0a0b] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-premium font-sans">
            {/* Neural Header */}
            <div className="px-8 py-5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute -top-0.5 -right-0.5 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <FiCpu className="text-primary-500" size={24} />
                    </div>
                    <div>
                        <span className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Smart AI Coach</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active and ready to help</span>
                    </div>
                </div>
            </div>

            {/* Diagnostic Logs (Messages) */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide bg-white dark:bg-[#0a0a0b]"
            >
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] ${msg.role === 'user'
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl rounded-tr-none shadow-xl'
                            : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl rounded-tl-none'} p-6`}>

                            {msg.role === 'ai' ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <FiActivity className="text-primary-500" size={14} />
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                            {msg.content.isAi ? 'Coach Suggestion' : 'App Message'}
                                        </span>
                                    </div>

                                    {msg.content.message && (
                                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-bold uppercase tracking-wide">{msg.content.message}</p>
                                    )}

                                    {msg.content.videoUrl && (
                                        <div className="bg-white dark:bg-slate-950 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                                            <h4 className="text-xs font-black text-primary-500 mb-6 flex items-center gap-3 uppercase tracking-[0.3em]">
                                                <FiActivity size={16} /> Training Video
                                            </h4>
                                            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center shadow-inner">
                                                <iframe
                                                    src={msg.content.videoUrl}
                                                    title={`${exerciseName} Protocol`}
                                                    className="w-full h-full"
                                                    allowFullScreen
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                ></iframe>
                                            </div>
                                        </div>
                                    )}

                                    {(msg.content.steps || msg.content.mistakes) && (
                                        <div className="grid grid-cols-1 gap-6 mt-8">
                                            {msg.content.steps && msg.content.steps.length > 0 && (
                                                <div className="bg-white dark:bg-slate-950 rounded-[1.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                                                    <h4 className="text-xs font-black text-emerald-500 mb-4 flex items-center gap-3 uppercase tracking-[0.3em]">
                                                        <FiCheckCircle size={14} /> Correct Form
                                                    </h4>
                                                    <ul className="space-y-4">
                                                        {msg.content.steps.map((s, i) => (
                                                            <li key={i} className="text-xs text-slate-500 dark:text-slate-400 flex gap-4 font-black uppercase tracking-widest leading-relaxed">
                                                                <span className="text-emerald-500">/</span> {s}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {msg.content.mistakes && msg.content.mistakes.length > 0 && (
                                                <div className="bg-white dark:bg-slate-950 rounded-[1.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                                                    <h4 className="text-xs font-black text-primary-500 mb-4 flex items-center gap-3 uppercase tracking-[0.3em]">
                                                        <FiAlertTriangle size={14} /> Avoid These Mistakes
                                                    </h4>
                                                    <ul className="space-y-4">
                                                        {msg.content.mistakes.map((m, i) => (
                                                            <li key={i} className="text-xs text-slate-500 dark:text-slate-400 flex gap-4 font-black uppercase tracking-widest leading-relaxed">
                                                                <span className="text-primary-500">!</span> {m}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-black uppercase tracking-[0.2em]">{msg.text}</span>
                                    <FiUser className="opacity-40" size={16} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl rounded-tl-none p-6 flex gap-1.5 items-center">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                )}
            </div>

            {/* Neural Entry (Input) */}
            <form onSubmit={handleSendMessage} className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`ASK ABOUT ${exerciseName.toUpperCase()}...`}
                        className="w-full bg-white dark:bg-[#0a0a0b] border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 pr-20 outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700"
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="absolute right-4 p-4 bg-primary-600 dark:bg-primary-500 text-white rounded-xl hover:shadow-glow disabled:opacity-30 transition-all outline-none"
                    >
                        <FiSend size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AiCoach;
