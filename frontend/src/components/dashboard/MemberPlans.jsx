import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import Loading from '../common/Loading';
import { FiCheck, FiPackage, FiShield, FiZap, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import CheckoutModal from './CheckoutModal';

const MemberPlans = () => {
    const { user, updateUser } = useAuth();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const res = await api.get('/trainer/plans/all');
            setPlans(res.data);
        } catch (error) {
            toast.error('Failed to load plans');
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribeClick = (plan) => {
        setSelectedPlan(plan);
        setIsCheckoutOpen(true);
    };

    const handlePaymentSuccess = (updatedUser) => {
        if (updatedUser) {
            updateUser(updatedUser);
        }
    };

    const handleCancel = async () => {
        if (!window.confirm("Are you sure you want to cancel your plan?")) return;
        setProcessing('cancel');
        try {
            const res = await api.post('/users/cancel-plan');
            toast.success(res.data.message);
            if (res.data.user) {
                updateUser(res.data.user);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Cancellation failed');
        } finally {
            setProcessing(null);
        }
    };

    if (loading) return <Loading size="lg" />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
            <div className="text-center mb-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
                    Simple, Transparent Pricing
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Unlock your full potential with our premium training programs. No hidden fees, cancel anytime.
                </p>
            </div>

            {plans.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 dark:bg-[#111214] border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                    <FiPackage className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Plans Available</h3>
                    <p className="text-slate-500">Check back soon for new membership options.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => {
                        const userPlanId = user?.membership?.planId?._id || user?.membership?.planId;
                        const isCurrent = userPlanId === plan._id;
                        const isPopular = index === 1; // Assuming middle plan is popular

                        return (
                            <div
                                key={plan._id}
                                className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${isCurrent
                                        ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 shadow-xl scale-105 z-10'
                                        : isPopular
                                            ? 'bg-white dark:bg-[#111214] border-blue-500 ring-1 ring-blue-500 shadow-lg scale-105 z-10'
                                            : 'bg-white dark:bg-[#111214] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                                    }`}
                            >
                                {isPopular && !isCurrent && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className={`text-xl font-bold mb-2 ${isCurrent ? 'text-white dark:text-slate-900' : 'text-slate-900 dark:text-white'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-4xl font-bold ${isCurrent ? 'text-white dark:text-slate-900' : 'text-slate-900 dark:text-white'}`}>
                                            ${plan.price}
                                        </span>
                                        <span className={`text-sm ${isCurrent ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500'}`}>
                                            / {plan.duration} {plan.duration === 1 ? 'month' : 'months'}
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <FiCheck className={`w-5 h-5 flex-shrink-0 ${isCurrent ? 'text-emerald-400 dark:text-emerald-600' : 'text-emerald-500'}`} />
                                            <span className={`text-sm font-medium ${isCurrent ? 'text-slate-200 dark:text-slate-700' : 'text-slate-600 dark:text-slate-300'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => isCurrent ? handleCancel() : handleSubscribeClick(plan)}
                                    disabled={processing === plan._id || processing === 'cancel'}
                                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${isCurrent
                                            ? 'bg-white/10 hover:bg-white/20 text-white dark:bg-slate-900/10 dark:hover:bg-slate-900/20 dark:text-slate-900 ring-1 ring-white/30 dark:ring-slate-900/30'
                                            : isPopular
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
                                                : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {processing === plan._id ? (
                                        'Processing...'
                                    ) : processing === 'cancel' && isCurrent ? (
                                        'Cancelling...'
                                    ) : isCurrent ? (
                                        'Cancel Current Plan'
                                    ) : (
                                        'Get Started'
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Checkout Modal */}
            {selectedPlan && (
                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    plan={selectedPlan}
                    onSuccess={handlePaymentSuccess}
                />
            )}

            {/* Trust Indicators */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-900 dark:text-white">
                        <FiShield className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Secure Payment</h4>
                    <p className="text-sm text-slate-500">Encrypted transactions for your peace of mind.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-900 dark:text-white">
                        <FiZap className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Instant Activation</h4>
                    <p className="text-sm text-slate-500">Start your training journey immediately.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-900 dark:text-white">
                        <FiLock className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Cancel Anytime</h4>
                    <p className="text-sm text-slate-500">No long-term contracts or hidden fees.</p>
                </div>
            </div>
        </div>
    );
};

export default MemberPlans;
