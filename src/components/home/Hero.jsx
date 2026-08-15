import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import MagneticButton from '../common/MagneticButton';

const WORDS = ['Talent.', 'Growth.', 'Excellence.', 'Results.'];

const HERO_IMAGES = [
  '/images/hero-boardroom.webp',
  '/images/hero-workspace.webp',
  '/images/hero-advisory.webp',
  '/images/hero-skyline-opt.webp'
];

export const Hero = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);

  // Scroll parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2600);
    const slideInterval = setInterval(() => {
      setCurrentImgIdx(prev => (prev + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(t);
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden noise-overlay isolate bg-[#0a1128]"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={currentImgIdx}
            src={HERO_IMAGES[currentImgIdx]}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 6.5, ease: "linear" }
            }}
            loading="lazy"
            alt="SM HR Nexus corporate advisory background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Dark overlay for rich contrast on white text */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{ backgroundColor: 'rgba(10, 17, 40, 0.76)' }}
      />

      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <motion.div
        style={isMobile ? {} : { y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center justify-center pt-24 pb-20 md:pt-32 md:pb-40 space-y-6 md:space-y-8"
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-6 h-px bg-gold-400" />
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Premier HR & Recruitment Advisory
          </span>
          <div className="w-6 h-px bg-gold-400" />
        </motion.div>

        {/* Headline with word swap */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tight leading-[1.05]"
        >
          <span className="block font-medium text-cream-50" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}>We Deliver</span>
          <div className="overflow-hidden block mt-2" style={{ height: '1.25em' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="block font-black text-gradient-gold"
                style={{ textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}
              >
                {WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-sm md:text-base text-cream-100 max-w-2xl leading-relaxed font-normal"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.55)' }}
        >
          Drawing on over 100 years of cumulative expertise, SM HR Nexus is a trusted executive search and HR advisory partner. We help modern enterprises identify board-level leadership, implement regulatory-compliant operations, and scale talent management frameworks built on our Conceive · Create · Complete bedrock.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 justify-center w-full sm:w-auto px-6 sm:px-0"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton
            as={Link}
            to="/services"
            className="relative overflow-hidden group inline-flex items-center justify-center gap-3 bg-gold-500 text-cream-50 font-bold text-xs tracking-widest uppercase px-6 py-4 rounded-lg shadow-lg"
          >
            <span className="relative z-10">Explore Services</span>
            <FiArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 bg-gold-300 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />
          </MagneticButton>

          <MagneticButton
            as={Link}
            to="/contact"
            className="inline-flex items-center justify-center gap-3 border border-cream-100/30 text-cream-100 font-bold text-xs tracking-widest uppercase px-6 py-4 rounded-lg hover:border-gold-400 hover:text-gold-400 transition-all duration-300 active:scale-[0.98]"
          >
            Contact Partners
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FiChevronDown className="w-3.5 h-3.5 text-gold-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
