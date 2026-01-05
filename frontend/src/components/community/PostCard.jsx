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
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 text-xl border border-slate-200/50 dark:border-slate-700/50">
            {post.user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{post.user?.name}</h4>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 text-[10px] font-black uppercase tracking-widest rounded-md">
                {post.type?.replace('_', ' ') || 'General Protocol'}
              </span>
              <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {(user?.id === post.user?._id || user?.role === 'admin') && (
          <button
            onClick={handleDelete}
            className="p-3 text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/10"
          >
            <FiTrash2 size={16} />
          </button>
        )}
      </div>

      <div className="mb-10 pl-0 md:pl-16">
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-wrap font-medium">{post.content}</p>
      </div>

      <div className="flex items-center gap-8 pl-0 md:pl-16">
        <button
          onClick={handleLike}
          className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${liked
            ? 'text-rose-500'
            : 'text-slate-400 hover:text-rose-500'
            }`}
        >
          <div className={`p-3 rounded-xl transition-all ${liked
            ? 'bg-rose-50 dark:bg-rose-900/20 shadow-inner'
            : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800'
            }`}>
            <FiHeart size={16} className={liked ? 'fill-current' : ''} />
          </div>
          <span>{likeCount} Endorsements</span>
        </button>

        <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-all">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group-hover:border-indigo-500/30">
            <FiMessageSquare size={16} />
          </div>
          <span>{post.comments?.length || 0} Responses</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
