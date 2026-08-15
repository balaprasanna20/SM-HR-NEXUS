import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

/**
 * Animated expertise/skill progress bar triggered on viewport entry.
 * High contrast styling for light cream background.
 */
const ExpertiseBar = ({ skill, percent, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-bold text-cream-100 tracking-wide">{skill}</span>
        <span className="text-xs font-black text-gold-600 tabular-nums">{percent}%</span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(10, 17, 40, 0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #A8893A 0%, #C9A84C 100%)' }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${percent}%` : 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay }}
        />
      </div>
    </div>
  );
};

export default ExpertiseBar;
