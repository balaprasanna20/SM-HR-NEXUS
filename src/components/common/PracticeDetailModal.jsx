import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiArrowRight, FiUsers, FiBriefcase, FiBookOpen, FiShield, FiPieChart, FiCpu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const iconMap = {
  FiUsers: FiUsers,
  FiBriefcase: FiBriefcase,
  FiBookOpen: FiBookOpen,
  FiShield: FiShield,
  FiPieChart: FiPieChart,
  FiCpu: FiCpu,
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.25 } },
};

const PracticeDetailModal = ({ service, index, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!service) return null;

  const IconComponent = iconMap[service.iconName] || FiBriefcase;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-[#060b19]/80 backdrop-blur-md"
          />

          {/* Modal Content Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${index}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl bg-navy-900 border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto text-left"
          >
            {/* Header banner background gradient */}
            <div className="relative p-6 sm:p-8 border-b border-cream-100/10 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 flex justify-between items-start">
              <div className="space-y-2 pr-8">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-500 bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-full">
                    Practice {String((index ?? 0) + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 id={`modal-title-${index}`} className="text-2xl sm:text-3xl font-black text-cream-50 tracking-tight leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-cream-100/10 hover:bg-gold-500 hover:text-navy-950 text-cream-200 transition-all flex items-center justify-center shrink-0"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Icon & Description */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-950/60 border border-cream-100/5">
                <div className="w-12 h-12 rounded-xl bg-gold-500 text-navy-950 flex items-center justify-center shrink-0 shadow-lg shadow-gold-500/20 mt-1">
                  <IconComponent className="w-6 h-6" />
                </div>
                <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed font-light">
                  {service.longDescription || service.shortDescription}
                </p>
              </div>

              {/* Sub-services Grid */}
              {service.subServices && service.subServices.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-gold-500">
                    Core Capabilities & Offerings
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.subServices.map((sub, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-cream-100/5 border border-white/5 text-xs text-cream-100 font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Features */}
              {service.features && service.features.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-gold-500">
                    Key Highlights
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feat, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-xs font-semibold text-gold-400"
                      >
                        <FiCheckCircle className="w-3.5 h-3.5 text-gold-400" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action Buttons */}
            <div className="p-6 border-t border-cream-100/10 bg-navy-950 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-cream-300/60 font-light">
                Need customized HR solutions for your organization?
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-lg border border-cream-100/20 text-cream-200 text-xs font-semibold hover:border-gold-400 transition-colors"
                >
                  Close
                </button>
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all shadow-lg"
                >
                  Inquire Now <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PracticeDetailModal;
