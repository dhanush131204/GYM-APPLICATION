import { useState, useEffect } from 'react';
import api, { BASE_URL } from '../../utils/api';
import { toast } from 'react-hot-toast';
import { FiVideo, FiUpload, FiTrash2, FiPlay, FiInfo, FiYoutube } from 'react-icons/fi';

const MediaManager = () => {
    const [uploadMode, setUploadMode] = useState('url'); // 'url' or 'upload'
    const [videoFile, setVideoFile] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        videoUrl: '',
        muscleGroup: 'Full Body',
        difficulty: 'Beginner',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = async () => {
        try {
            const res = await api.get('/trainer/media');
            setExercises(res.data);
        } catch (error) {
            console.error('Failed to fetch exercises:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('muscleGroup', formData.muscleGroup);
        data.append('difficulty', formData.difficulty);
        data.append('description', formData.description);

        if (uploadMode === 'url') {
            data.append('videoUrl', formData.videoUrl);
        } else if (videoFile) {
            data.append('video', videoFile);
        }

        try {
            await api.post('/trainer/media', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Exercise added to library');
            setFormData({ name: '', videoUrl: '', muscleGroup: 'Full Body', difficulty: 'Beginner', description: '' });
            setVideoFile(null);
            fetchExercises();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add exercise');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this exercise?')) return;
        try {
            await api.delete(`/trainer/media/${id}`);
            toast.success('Exercise deleted');
            fetchExercises();
        } catch (error) {
            toast.error('Failed to delete exercise');
        }
    };

    const getVideoSrc = (url) => {
        if (!url) return '';
        if (url.startsWith('/uploads/')) {
            return `${BASE_URL}${url}`;
        }
        return url;
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 dark:border-slate-800 pb-12 gap-10">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Content <span className="text-primary-500">Forge.</span></h2>
                    <p className="text-base font-bold text-slate-500 uppercase tracking-widest mt-4 leading-relaxed">Neural exercise synthesis & system-wide asset repository.</p>
                </div>
                <div className="flex items-center gap-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-8 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
                    <FiInfo className="w-5 h-5 text-primary-500" />
                    <span>Format Support: MP4, WebM, Neural-Stream</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 sticky top-12 shadow-premium">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
                            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-500 shadow-sm">
                                <FiUpload size={20} />
                            </div>
                            Asset Ingestion
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic">Protocol Identity</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="SYNCHRONIZE PROTOCOL NAME..."
                                    className="input-field py-4"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-5 italic">Transmission Ingest Mode</label>
                                <div className="grid grid-cols-2 gap-4 mb-5">
                                    <button
                                        type="button"
                                        onClick={() => setUploadMode('url')}
                                        className={`flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-widest rounded-2xl transition-all border ${uploadMode === 'url' ? 'bg-primary-50 border-primary-200 text-primary-600 dark:bg-primary-900/20 dark:border-primary-800/50 shadow-glow' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                                    >
                                        <FiYoutube size={18} /> Stream
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setUploadMode('upload')}
                                        className={`flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-widest rounded-2xl transition-all border ${uploadMode === 'upload' ? 'bg-primary-50 border-primary-200 text-primary-600 dark:bg-primary-900/20 dark:border-primary-800/50 shadow-glow' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                                    >
                                        <FiUpload size={18} /> Binary
                                    </button>
                                </div>

                                {uploadMode === 'url' ? (
                                    <input
                                        type="url"
                                        required={uploadMode === 'url'}
                                        placeholder="https://content.cdn/raw-stream"
                                        className="input-field"
                                        value={formData.videoUrl}
                                        onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                                    />
                                ) : (
                                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 text-center hover:border-slate-400 transition-colors cursor-pointer relative bg-slate-50 dark:bg-slate-800/30">
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                            accept="video/*"
                                            required={uploadMode === 'upload'}
                                            onChange={e => setVideoFile(e.target.files[0])}
                                        />
                                        <div className="pointer-events-none">
                                            <FiUpload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                            <p className="text-sm text-slate-500 font-medium">Click to select video</p>
                                            <p className="text-xs text-slate-400 mt-1">MP4 up to 100MB</p>
                                        </div>
                                        {videoFile && (
                                            <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center rounded-lg border-2 border-emerald-500/20">
                                                <p className="text-sm font-medium text-emerald-600 flex items-center gap-2">
                                                    ✓ {videoFile.name}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Muscle Group</label>
                                    <select
                                        className="input-field"
                                        value={formData.muscleGroup}
                                        onChange={e => setFormData({ ...formData, muscleGroup: e.target.value })}
                                    >
                                        {['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'].map(g => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">Level</label>
                                    <select
                                        className="input-field"
                                        value={formData.difficulty}
                                        onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                                    >
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="label">Instructions</label>
                                <textarea
                                    className="input-field min-h-[100px] resize-none"
                                    required
                                    placeholder="Brief guide on form and technique..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-5 rounded-2xl flex justify-center items-center gap-4 shadow-glow font-black text-xs uppercase tracking-[0.3em]"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FiUpload size={18} /> Commit to Forge
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Content List */}
                <div className="lg:col-span-2 space-y-4">
                    {exercises.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 dark:bg-[#111214] border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                <FiVideo className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white">Library is empty</h3>
                            <p className="text-slate-500">Upload your first training video to get started.</p>
                        </div>
                    ) : (
                        exercises.map((ex) => (
                            <div key={ex._id} className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex gap-6 hover:border-primary-500/50 transition-all group shadow-premium hover:shadow-premium-hover">
                                <div className="w-48 h-32 bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden relative flex-shrink-0 border border-slate-200 dark:border-slate-800 group-hover:scale-[1.02] transition-transform">
                                    {ex.videoUrl?.includes('youtube') || ex.videoUrl?.includes('vimeo') ? (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white/20">
                                            <FiPlay size={32} />
                                        </div>
                                    ) : (
                                        <video
                                            src={getVideoSrc(ex.videoUrl)}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-primary-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                            <FiPlay size={20} className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0 py-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">{ex.name}</h4>
                                            <div className="flex items-center gap-2 mt-4 flex-wrap">
                                                <span className="px-3 py-1 rounded-lg text-xs font-black uppercase bg-primary-50 text-primary-600 dark:bg-primary-900/20 tracking-widest">
                                                    {ex.muscleGroup}
                                                </span>
                                                <span className="px-3 py-1 rounded-lg text-xs font-black uppercase bg-secondary-50 text-secondary-600 dark:bg-secondary-900/20 tracking-widest">
                                                    {ex.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(ex._id)}
                                            className="p-3 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                                            title="Purge Asset"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-sm font-bold text-slate-500 mt-4 line-clamp-2 leading-relaxed uppercase tracking-wide opacity-80">
                                        {ex.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MediaManager;
