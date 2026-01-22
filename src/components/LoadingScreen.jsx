import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ images = [], onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) {
            setProgress(100);
            setTimeout(onComplete, 500); // Small delay for smoothness
            return;
        }

        let loadedCount = 0;
        const total = images.length;

        // Dedup images just in case
        const uniqueImages = [...new Set(images)];
        const uniqueTotal = uniqueImages.length;

        const handleLoad = () => {
            loadedCount++;
            const newProgress = Math.round((loadedCount / uniqueTotal) * 100);
            setProgress(newProgress);

            if (loadedCount === uniqueTotal) {
                setTimeout(onComplete, 800); // Wait a bit at 100%
            }
        };

        uniqueImages.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = handleLoad;
            img.onerror = handleLoad; // Count errors as loaded to prevent stuck screen
        });

    }, [images, onComplete]);

    return (
        <motion.div
            className="loading-screen"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <motion.div
                className="loading-percentage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {progress}%
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
