import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import MagneticButton from '../common/MagneticButton';

const logo = '/logo-icon.png';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 30);

      // Smooth auto-hide on scroll down, smooth reveal on scroll up
      if (currentScrollY > 80 && currentScrollY > lastScrollY && !menuOpen) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 80) {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    // Disable body scroll when mobile menu is open
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      setHidden(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'backdrop-blur-xl backdrop-saturate-150 border-b py-1 shadow-lg' 
            : 'backdrop-blur-xl backdrop-saturate-150 border-b py-2'
        }`}
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.90)',
          borderColor: '#E5E7EB',
          willChange: 'transform'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4 h-14 md:h-16">
          <Link to="/" className="group flex items-center gap-2.5 focus:outline-none shrink-0" aria-label="SM HR Nexus Home">
            <img
              src={logo}
              alt="SM HR Nexus Logo"
              className="h-10 md:h-12 w-auto object-contain logo-crisp transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
            />
          </Link>

          {/* ── Desktop Nav ───────────────────────── */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`nav-hover-underline text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-gray-900 hover:text-black'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Action Area ─────────────────── */}
          <div className="hidden md:flex items-center gap-4">
            <MagneticButton
              as={Link}
              to="/apply"
              className="inline-flex items-center justify-center border border-navy-900/20 hover:border-gold-500 bg-transparent hover:bg-gold-500 text-navy-950 hover:text-navy-950 text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-lg transition-all duration-300 shadow-sm cursor-pointer"
            >
              Apply Now
            </MagneticButton>
          </div>

          {/* ── Mobile Hamburger Toggle ───────────── */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* ── Mobile Fullscreen Menu ───────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[64px] z-40 bg-navy-950/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 md:hidden text-cream-50"
          >
            <nav className="flex flex-col space-y-6 pt-6">
              {navLinks.map(({ label, path }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  <Link
                    to={path}
                    className="text-2xl font-black tracking-tight text-cream-50 hover:text-gold-400 transition-colors flex items-center justify-between"
                  >
                    <span>{label}</span>
                    <span className="text-xs font-bold text-gold-500/60 font-mono">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="space-y-4 pt-8 border-t border-white/10">
              <Link
                to="/apply"
                className="w-full inline-flex items-center justify-center bg-gold-500 text-navy-950 text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl shadow-lg"
              >
                Apply Now
              </Link>
              <p className="text-center text-[10px] uppercase tracking-widest text-cream-100/50">
                SM HR Nexus • Executive Search & HR Advisory
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
