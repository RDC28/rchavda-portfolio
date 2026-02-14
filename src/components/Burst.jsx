import React, { useRef, useEffect } from 'react';

const Burst = ({ trigger }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!trigger) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];
        const colors = ['#d4a853', '#ffffff', '#ffd700', '#f0d090'];

        // Match container size
        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * 2;
            canvas.height = rect.height * 2;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.scale(2, 2);
        };
        resize();

        const createParticles = () => {
            const count = 40;
            const centerX = canvas.width / 4; // Because of 2x scale and center logic
            const centerY = canvas.height / 4;

            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1 + Math.random() * 3;
                particles.push({
                    x: centerX,
                    y: centerY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1,
                    decay: 0.015 + Math.random() * 0.02,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: 1 + Math.random() * 2
                });
            }
        };

        createParticles();

        let animFrame;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let alive = false;
            particles.forEach((p) => {
                if (p.life > 0) {
                    alive = true;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.05; // gravity
                    p.life -= p.decay;

                    ctx.globalAlpha = p.life;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            if (alive) {
                animFrame = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => cancelAnimationFrame(animFrame);
    }, [trigger]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 5
            }}
        />
    );
};

export default Burst;
