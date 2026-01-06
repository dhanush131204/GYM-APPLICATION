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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-slate-100 dark:border-slate-800/50 pb-12">
        <div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-3">Community <span className="text-primary-500">Nexus.</span></h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Neural synchronization with elite global athletes.</p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary px-8 py-5 rounded-2xl shadow-glow"
        >
          <FiPlus size={20} /> New Discussion Protocol
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
          <div className="text-center py-32 px-10 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-inner">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/20 rounded-3xl flex items-center justify-center mx-auto mb-10 text-primary-500 shadow-glow">
              <FiMessageSquare size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">Quiet <span className="text-primary-500">Nexus.</span></h3>
            <p className="text-sm font-bold text-slate-500 mb-12 max-w-sm mx-auto uppercase tracking-widest leading-relaxed">
              Neural channel idle. Initialize a discussion protocol to synchronize progress.
            </p>
            <button
              onClick={() => setShowCreate(true)}
              className="btn-primary px-10 py-5 rounded-[1.5rem] shadow-glow"
            >
              Start Conversation
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
