import React, { useState } from 'react';
import { FiImage } from 'react-icons/fi';

const SafeImage = ({ src, alt, className, ...props }) => {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div
                className={`flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 ${className}`}
                {...props}
            >
                <div className="flex flex-col items-center gap-2 opacity-20">
                    <FiImage size={40} className="text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Offline Asset</span>
                </div>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    );
};

export default SafeImage;
