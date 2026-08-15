import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import SEO from '../components/layout/SEO';
import PageTransition from '../components/layout/PageTransition';

const NotFound = () => {
  return (
    <PageTransition>
      <SEO title="404 — Page Not Found | SM HR Nexus" description="The page you are looking for does not exist or has been moved." />
      
      <section className="relative min-h-[85vh] flex items-center justify-center bg-navy-950 px-6 py-28 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
          />
        </div>

        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 max-w-lg mx-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 tracking-tighter">
              404
            </span>
          </motion.div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black text-cream-50 tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm text-cream-300/70 font-light leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-lg transition-all shadow-lg"
            >
              <FiHome className="w-4 h-4" />
              Return Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-cream-100/20 hover:border-gold-500/50 text-cream-200 hover:text-gold-400 font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-lg transition-all"
            >
              <FiArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default NotFound;
