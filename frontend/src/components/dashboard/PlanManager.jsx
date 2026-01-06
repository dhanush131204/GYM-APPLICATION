import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import { FiPlus, FiTrash2, FiDollarSign } from 'react-icons/fi';

const PlanManager = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        duration: 1,
        features: ''
    });

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const res = await api.get('/trainer/plans');
            setPlans(res.data);
        } catch (error) {
            toast.error('Failed to load plans');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);
            await api.post('/trainer/plans', { ...formData, features: featuresArray });
            toast.success('Plan created successfully');
            setShowForm(false);
            setFormData({ name: '', price: '', duration: 1, features: '' });
            fetchPlans();
        } catch (error) {
            toast.error('Failed to create plan');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this plan? If users are subscribed, it will be deactivated instead.')) return;
        try {
            const res = await api.delete(`/trainer/plans/${id}`);
            toast.success(res.data.message);
            fetchPlans();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete plan');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Sub-Subscription <span className="text-primary-500">Architecture.</span></h2>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2 leading-relaxed">System-wide fiscal tier configuration and lifecycle protocols.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center gap-4 px-8 py-5 rounded-2xl shadow-glow"
                >
                    <FiPlus size={20} /> Initialize New Tier
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-[#111214] border border-primary-500/20 rounded-[2.5rem] p-10 mb-16 animate-fade-in shadow-premium overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 italic">Tier Designation</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="SYNCHRONIZE DESIGNATION..."
                                    className="input-field py-4"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 italic">Fiscal Valuation (USD)</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="VALUATION..."
                                    className="input-field py-4"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 italic">Cycle Interval (Months)</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    className="input-field py-4"
                                    value={formData.duration}
                                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 italic">Operational Utility Set (CSV)</label>
                                <input
                                    type="text"
                                    placeholder="UTILITY 01, UTILITY 02..."
                                    className="input-field py-4"
                                    value={formData.features}
                                    onChange={e => setFormData({ ...formData, features: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-6 pt-6 border-t border-slate-50 dark:border-slate-800/50">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 dark:hover:text-white transition-colors"
                            >
                                Terminate Initialization
                            </button>
                            <button type="submit" className="btn-primary px-12 py-4 rounded-xl shadow-glow">
                                Commit Tier Synchronization
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map(plan => (
                    <div key={plan._id} className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 p-12 rounded-[3rem] shadow-premium hover:shadow-glow transition-all relative group overflow-hidden">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{plan.name}</h3>
                                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-[0.2em] border ${plan.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-800/50' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                        {plan.isActive ? 'ACTIVE::SYNC' : 'ARCHIVED'}
                                    </span>
                                </div>
                                <p className="text-5xl font-black flex items-end text-slate-900 dark:text-white tracking-tighter tabular-nums">
                                    <span className="text-xl font-black text-primary-500 mr-1.5">$</span>
                                    {plan.price}
                                    <span className="text-xs text-slate-400 font-black ml-3 uppercase tracking-[0.2em] mb-2 opacity-60">/ {plan.duration} CYCLES</span>
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(plan._id)}
                                className="p-4 text-slate-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-2xl transition-all opacity-0 group-hover:opacity-100 border border-transparent hover:border-primary-100"
                                title="Terminate Tier"
                            >
                                <FiTrash2 size={24} />
                            </button>
                        </div>
                        <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800/50">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 italic">Operational Utilities</p>
                            <ul className="space-y-6">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-5 text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                                        <div className="w-6 h-6 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-500 border border-primary-100 dark:border-primary-800/50 shadow-sm">
                                            <span className="text-xs font-black">✓</span>
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanManager;
