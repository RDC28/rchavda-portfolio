import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ images = [], onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) {
            setProgress(100);
            setTimeout(onComplete, 300);
            return;
        }

        let loadedCount = 0;
        const uniqueImages = [...new Set(images)];
        const total = uniqueImages.length;

        const handleLoad = () => {
            loadedCount++;
            setProgress(Math.round((loadedCount / total) * 100));
            if (loadedCount === total) {
                setTimeout(onComplete, 500);
            }
        };

        uniqueImages.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = handleLoad;
            img.onerror = handleLoad;
        });
    }, [images, onComplete]);

    return (
        <motion.div
            className="loading-screen"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className="loading-percentage">
                {progress}%
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
