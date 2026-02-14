import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const RandomWord = ({ text, minDelay = 0, maxDelay = 1, trigger = true, duration = 0.5, blur = '4px', y = 10 }) => {
    // Split text into words while preserving spaces
    const words = useMemo(() => text.split(' '), [text]);

    return (
        <>
            {words.map((word, i) => {
                // Generate a stable random delay for each word
                const randomDelay = useMemo(() =>
                    minDelay + Math.random() * (maxDelay - minDelay),
                    [minDelay, maxDelay, word, i]);

                return (
                    <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                        <motion.span
                            initial={{ opacity: 0, y: y, filter: `blur(${blur})` }}
                            animate={trigger ? {
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)'
                            } : {
                                opacity: 0,
                                y: y,
                                filter: `blur(${blur})`
                            }}
                            transition={{
                                duration: duration,
                                delay: randomDelay,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            style={{ display: 'inline-block' }}
                        >
                            {word}
                        </motion.span>
                        {i < words.length - 1 ? ' ' : ''}
                    </span>
                );
            })}
        </>
    );
};

export default RandomWord;
