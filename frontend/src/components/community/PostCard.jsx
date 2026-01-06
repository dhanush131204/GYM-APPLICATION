import { useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import { FiHeart, FiMessageCircle, FiTrash2, FiMoreHorizontal, FiActivity, FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const PostCard = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(post.likes?.some(id => id === user?.id) || false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

  const handleLike = async () => {
    try {
      await api.post(`/community/posts/${post._id}/like`);
      setLiked(!liked);
      setLikeCount(prev => liked ? prev - 1 : prev + 1);
    } catch (error) {
      toast.error('Channel interaction failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('TERMINATE THIS DISPATCH?')) return;

    try {
      await api.delete(`/community/posts/${post._id}`);
      toast.success('Dispatch terminated');
      onUpdate();
    } catch (error) {
      toast.error('Termination failed');
    }
  };

  return (
    <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-premium hover:shadow-2xl transition-all duration-300 font-sans group">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center font-black text-primary-500 text-2xl border border-primary-100 dark:border-primary-800/50 shadow-sm">
            {post.user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">{post.user?.name}</h4>
            <div className="flex items-center gap-4 mt-2">
              <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-500 text-xs font-black uppercase tracking-[0.2em] rounded-lg border border-primary-100 dark:border-primary-800/50">
                {post.type?.replace('_', ' ') || 'General Protocol'}
              </span>
              <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {(user?.id === post.user?._id || user?.role === 'admin') && (
          <button
            onClick={handleDelete}
            className="p-4 text-slate-300 hover:text-primary-500 transition-all rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-transparent hover:border-primary-100 dark:hover:border-primary-800/50"
          >
            <FiTrash2 size={20} />
          </button>
        )}
      </div>

      <div className="mb-12 pl-0 md:pl-20">
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed whitespace-pre-wrap font-bold uppercase tracking-wide italic">{post.content}</p>
      </div>

      <div className="flex items-center gap-10 pl-0 md:pl-20">
        <button
          onClick={handleLike}
          className={`flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${liked
            ? 'text-primary-500'
            : 'text-slate-400 hover:text-primary-500'
            }`}
        >
          <div className={`p-4 rounded-2xl transition-all ${liked
            ? 'bg-primary-50 dark:bg-primary-900/20 shadow-glow border border-primary-200 dark:border-primary-700'
            : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800'
            }`}>
            <FiHeart size={20} className={liked ? 'fill-current' : ''} />
          </div>
          <span>{likeCount} Synchronizations</span>
        </button>

        <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-secondary-500 transition-all">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group-hover:border-secondary-500/30">
            <FiMessageSquare size={20} />
          </div>
          <span>{post.comments?.length || 0} Neural Links</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
