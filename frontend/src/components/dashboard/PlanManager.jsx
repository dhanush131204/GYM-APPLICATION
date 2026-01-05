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
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Membership Plans</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center gap-2"
                >
                    <FiPlus /> Create Plan
                </button>
            </div>

            {showForm && (
                <div className="card bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Plan Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Gold Tier"
                                    className="input-field"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Price ($)</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="e.g. 50"
                                    className="input-field"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Duration (Months)</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    className="input-field"
                                    value={formData.duration}
                                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Features (comma separated)</label>
                                <input
                                    type="text"
                                    placeholder="Workout plan, Diet plan, Weekly check-in"
                                    className="input-field"
                                    value={formData.features}
                                    onChange={e => setFormData({ ...formData, features: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary">
                                Save Plan
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map(plan => (
                    <div key={plan._id} className="card relative group hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${plan.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                                        {plan.isActive ? 'Active' : 'Archived'}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold flex items-center text-slate-900 dark:text-white">
                                    <span className="text-sm font-normal text-slate-500 mr-0.5">$</span>
                                    {plan.price}
                                    <span className="text-sm text-slate-500 font-normal ml-1">/ {plan.duration} mo</span>
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(plan._id)}
                                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                title="Delete Plan"
                            >
                                <FiTrash2 className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Features</p>
                            <ul className="text-sm text-slate-600 dark:text-gray-300 space-y-1">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-0.5">✓</span>
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
