import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 18, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] },
  },
};

const PageTransition = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);

export default PageTransition;
