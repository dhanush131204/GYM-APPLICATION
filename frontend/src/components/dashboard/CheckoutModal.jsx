import { useState } from 'react';
import { FiX, FiLock, FiCreditCard, FiCalendar, FiShield } from 'react-icons/fi';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';

const CheckoutModal = ({ plan, isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/payments/mock-confirm', {
                planId: plan._id,
                cardDetails: cardData
            });

            toast.success('Payment successful! Welcome to ' + plan.name);
            onSuccess(res.data.user);
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Payment failed');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-slide-up">
                {/* Header */}
                <div className="relative p-6 border-b dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">Checkout</h2>
                    <p className="text-gray-500 text-sm mt-1">Complete your subscription for {plan.name}</p>
                </div>

                <div className="p-6">
                    {/* Plan Summary */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-6 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Plan Total</p>
                            <p className="text-2xl font-black text-primary-600">${plan.price}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{plan.duration} Month Access</p>
                            <p className="text-xs text-gray-500 italic">One-time payment</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Cardholder Name</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FiCreditCard className="w-5 h-5" />
                                </span>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                                    value={cardData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Card Number</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FiLock className="w-5 h-5" />
                                </span>
                                <input
                                    required
                                    type="text"
                                    name="number"
                                    placeholder="4242 4242 4242 4242"
                                    maxLength="19"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary-500 transition-all font-medium font-mono"
                                    value={cardData.number}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Expiry Date</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FiCalendar className="w-5 h-5" />
                                    </span>
                                    <input
                                        required
                                        type="text"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                                        value={cardData.expiry}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">CVC</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FiShield className="w-5 h-5" />
                                    </span>
                                    <input
                                        required
                                        type="text"
                                        name="cvc"
                                        placeholder="123"
                                        maxLength="3"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                                        value={cardData.cvc}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-black text-lg rounded-xl shadow-xl shadow-primary-600/20 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-75 disabled:active:scale-100"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>Pay ${plan.price} & Secure Access</>
                                )}
                            </button>
                            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                <FiLock className="w-3 h-3" /> Encrypted & Secure Payment
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
