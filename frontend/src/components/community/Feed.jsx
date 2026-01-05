import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import Loading from '../common/Loading';
import { FiPlus, FiMessageSquare } from 'react-icons/fi';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await api.get('/community/posts');
      setPosts(response.data.posts || []);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size="lg" />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Community</h1>
            <p className="text-slate-600 dark:text-slate-400">Connect with other elite athletes.</p>
        </div>
        
        <button 
            onClick={() => setShowCreate(true)} 
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-slate-900/10 dark:shadow-none"
        >
          <FiPlus size={20} /> New Post
        </button>
      </div>

      {showCreate && (
        <CreatePost
          onClose={() => setShowCreate(false)}
          onSuccess={() => {
            setShowCreate(false);
            loadPosts();
          }}
        />
      )}

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-20 px-6 bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-2xl border-dashed">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <FiMessageSquare size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No discussions yet</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                Be the first to share your progress or ask a question to the community.
            </p>
            <button 
                onClick={() => setShowCreate(true)} 
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
                Start a conversation
            </button>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="animate-fade-in-up">
                 <PostCard post={post} onUpdate={loadPosts} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
