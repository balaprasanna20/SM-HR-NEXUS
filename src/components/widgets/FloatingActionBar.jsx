import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiArrowRight, FiX } from 'react-icons/fi';

const FloatingActionBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();

  // Hide on contact page
  const isContactPage = location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (dismissed || isContactPage) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex fixed bottom-6 left-6 z-40 items-center gap-3 bg-navy-950/95 border border-gold-500/30 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-2xl"
        >
          <Link
            to="/contact"
            className="flex items-center gap-3 group px-2 py-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300">
              <FiCalendar className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-400">Partner Advisory</span>
              <span className="text-xs font-black text-cream-50 group-hover:text-gold-300 transition-colors flex items-center gap-1.5">
                Book Consultation <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          <button
            onClick={() => setDismissed(true)}
            className="w-7 h-7 rounded-full bg-cream-100/10 hover:bg-cream-100/20 text-cream-300/60 hover:text-cream-50 flex items-center justify-center transition-colors text-xs ml-1"
            aria-label="Dismiss floating advisory bar"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionBar;
