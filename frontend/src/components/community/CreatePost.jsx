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
        <div className="flex justify-between items-center p-10 border-b border-slate-100 dark:border-slate-800/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">New <span className="text-primary-500">Dispatch.</span></h2>
            <p className="text-xs font-black text-primary-500 uppercase tracking-[0.2em] mt-2 italic shadow-glow inline-block">Global Broadcast Mode :: Priority Alpha</p>
          </div>
          <button
            onClick={onClose}
            className="p-4 text-slate-300 hover:text-primary-500 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all border border-transparent hover:border-primary-100 dark:hover:border-primary-800/50"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Dispatch Source Node</label>
              <div className="relative">
                <FiTerminal className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-500" size={18} />
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full pl-14 pr-8 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:text-white appearance-none cursor-pointer text-[11px] font-black uppercase tracking-widest transition-all"
                >
                  {Object.entries(POST_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value} className="bg-white dark:bg-[#111214]">{label.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Operational Protocol Data</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:text-white min-h-[220px] resize-none text-[15px] font-bold leading-relaxed transition-all placeholder:text-slate-400"
                placeholder="SYNCHRONIZE OPERATIONAL PROGRESS OR BROADCAST PROTOCOL UPDATES..."
                required
              />
            </div>
          </div>

          <div className="flex gap-6 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-5 bg-transparent border border-slate-200 dark:border-slate-800 text-slate-400 font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:text-primary-500"
            >
              Terminate
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-5 bg-primary-600 hover:bg-primary-500 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl transition-all shadow-glow flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FiSend size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Commit Dispatch
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
