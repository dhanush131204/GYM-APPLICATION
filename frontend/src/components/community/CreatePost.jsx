import { useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import { FiX, FiSend, FiTag, FiTerminal } from 'react-icons/fi';
import { POST_TYPE_LABELS } from '../../utils/constants';

const CreatePost = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    content: '',
    type: 'general',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/community/posts', formData);
      toast.success('Dispatch synchronized successfully');
      onSuccess();
    } catch (error) {
      toast.error('Channel broadcast failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
      <div
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white dark:bg-[#111214] rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="flex justify-between items-center p-8 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">New Dispatch</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Global Broadcast Mode</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Dispatch Node</label>
              <div className="relative">
                <FiTerminal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-white appearance-none cursor-pointer text-[10px] font-black uppercase tracking-widest"
                >
                  {Object.entries(POST_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Protocol Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-white min-h-[180px] resize-none text-sm font-medium leading-relaxed"
                placeholder="Synchronize your progress or broadcast a protocol update..."
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-5 bg-transparent border border-slate-200 dark:border-slate-800 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Abort Dispatch
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-5 bg-slate-900 hover:opacity-90 dark:bg-white text-white dark:text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FiSend size={16} /> Broadcast
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
