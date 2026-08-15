import { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter — counts from 0 to `end` when it enters the viewport.
 * Uses native IntersectionObserver + requestAnimationFrame (no external deps).
 */
const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const spanRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const startTime = performance.now();

        const tick = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={spanRef} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
