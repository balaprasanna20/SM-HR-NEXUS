import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    // Disable on touch screens / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = glowRef.current;
    if (!el) return;

    let raf;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // Smooth lerp follow using GPU-accelerated transform
    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el.style.transform = `translate(-50%, -50%) translate3d(${currentX}px, ${currentY}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
};

export default CursorGlow;
