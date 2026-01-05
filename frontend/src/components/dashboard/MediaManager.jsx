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
            <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Content Library</h2>
                    <p className="text-slate-500 mt-1">Manage workout videos and exercise guides.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                    <FiInfo className="w-4 h-4" />
                    <span>Supported: MP4, WebM, YouTube</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-lg p-6 sticky top-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                                <FiUpload className="w-4 h-4" />
                            </div>
                            Add New Content
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label">Exercise Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Kettlebell Swing"
                                    className="input-field"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="label mb-2 block">Media Source</label>
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <button
                                        type="button"
                                        onClick={() => setUploadMode('url')}
                                        className={`flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all border ${uploadMode === 'url' ? 'bg-slate-50 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-white' : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                                    >
                                        <FiYoutube /> Link
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setUploadMode('upload')}
                                        className={`flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all border ${uploadMode === 'upload' ? 'bg-slate-50 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-white' : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                                    >
                                        <FiUpload /> File
                                    </button>
                                </div>

                                {uploadMode === 'url' ? (
                                    <input
                                        type="url"
                                        required={uploadMode === 'url'}
                                        placeholder="https://youtube.com/..."
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
                                className="w-full btn-primary py-3 flex justify-center items-center gap-2"
                            >
                                {loading ? 'Uploading...' : 'Save to Library'}
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
                            <div key={ex._id} className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex gap-4 hover:border-blue-400/50 transition-colors group">
                                <div className="w-40 h-28 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden relative flex-shrink-0 border border-slate-100 dark:border-slate-800">
                                    {ex.videoUrl?.includes('youtube') || ex.videoUrl?.includes('vimeo') ? (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white/50">
                                            <FiPlay className="w-8 h-8" />
                                        </div>
                                    ) : (
                                        <video
                                            src={getVideoSrc(ex.videoUrl)}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FiPlay className="text-white drop-shadow-md w-8 h-8" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0 py-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white truncate">{ex.name}</h4>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                    {ex.muscleGroup}
                                                </span>
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                    {ex.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(ex._id)}
                                            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                            title="Delete Exercise"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
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
