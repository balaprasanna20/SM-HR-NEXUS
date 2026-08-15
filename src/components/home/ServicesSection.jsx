import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiBriefcase, FiBookOpen, FiShield, FiPieChart, FiCpu } from 'react-icons/fi';
import RevealText from './RevealText';
import WordReveal from '../widgets/WordReveal';
import PracticeDetailModal from '../common/PracticeDetailModal';
import { services } from '../../data/services';

const SERVICE_IMAGES = [
  '/images/service-recruitment.webp',
  '/images/service-hrsops.webp',
  '/images/service-psychometric.webp',
  '/images/service-investigative.webp',
  '/images/service-compliance.webp',
  '/images/service-education.webp'
];

const iconMap = {
  FiUsers,
  FiBriefcase,
  FiBookOpen,
  FiShield,
  FiPieChart,
  FiCpu,
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 }
  }
};

const TiltCard = ({ service, index, onSelect }) => {
  const cardRef = useRef(null);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current || (window.matchMedia && !window.matchMedia('(pointer: fine)').matches)) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;
    setTiltX(rX);
    setTiltY(rY);
  };

  const handleMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
    setIsHovered(false);
  };

  const IconComponent = iconMap[service.iconName] || FiBriefcase;

  return (
    <div className="perspective-[1000px] h-[340px] sm:h-[380px] w-full touch-pan-y" style={{ touchAction: 'pan-y' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(service, index)}
        className={`relative h-full rounded-2xl overflow-hidden flex flex-col justify-end border cursor-pointer transition-all duration-500 select-none touch-pan-y ${
          isHovered
            ? 'border-gold-500/40 shadow-2xl shadow-gold-500/5'
            : 'border-cream-100/5 hover:border-gold-500/20 shadow-soft'
        }`}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
          touchAction: 'pan-y',
          backgroundColor: isHovered ? 'var(--color-navy-800)' : 'var(--color-cream-200)'
        }}
      >
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 right-0 bg-cover bg-center transition-all duration-500 ease-out"
          style={{
            height: isHovered ? '100%' : '200px',
            backgroundImage: `url(${SERVICE_IMAGES[index]})`
          }}
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0 transition-all duration-500 ease-out pointer-events-none"
          style={{
            backgroundColor: isHovered ? 'rgba(10, 17, 40, 0.85)' : 'rgba(0, 0, 0, 0)'
          }}
        />

        {/* Number Badge */}
        <div
          className="absolute top-[10px] right-[10px] w-[34px] h-[34px] rounded-full flex items-center justify-center pointer-events-none z-30"
          style={{
            backgroundColor: 'rgba(11, 26, 51, 0.6)',
            color: '#e8c46b',
            fontSize: '13px',
            fontWeight: 500
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Default content area at bottom */}
        <div className={`p-6 h-[180px] flex flex-col justify-center gap-2 transition-all duration-500 relative z-10 ${
          isHovered ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}>
          <span className="text-[10px] font-bold tracking-widest text-gold-600 uppercase">
            Practice Area
          </span>
          <h3 className="text-lg font-black tracking-tight leading-tight text-navy-900">
            {service.title}
          </h3>
          <p className="text-xs text-navy-800/80 leading-relaxed font-light line-clamp-2">
            {service.shortDescription}
          </p>
        </div>

        {/* Hover content overlay */}
        <div className={`absolute inset-0 p-6.5 flex flex-col justify-between transition-all duration-500 pointer-events-none z-20 ${
          isHovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-gold-500 text-navy-900 flex items-center justify-center border border-gold-500 shadow-lg shadow-gold-500/10">
              <IconComponent className="w-5 h-5" />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-black tracking-tight leading-snug text-cream-50">
                {service.title}
              </h3>

              <div className="relative">
                <AnimatePresence initial={false} mode="wait">
                  {isHovered && (
                    <motion.div
                      key="subs"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={listVariants}
                      className="space-y-2.5"
                    >
                      <p className="text-[10px] font-bold tracking-wider uppercase text-gold-500">Practice focus:</p>
                      <ul className="space-y-1.5">
                        {service.subServices.slice(0, 3).map((sub, idx) => (
                          <motion.li
                            key={idx}
                            variants={itemVariants}
                            className="flex gap-2 items-start text-xs text-cream-100 font-semibold leading-tight"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gold-500 shrink-0" />
                            {sub}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(service, index);
              }}
              className="inline-flex items-center gap-2 text-gold-500 font-black text-[10px] tracking-widest uppercase hover:gap-3 transition-all cursor-pointer bg-transparent border-none p-0"
            >
              Click for Full Details <FiArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectService = (service, index) => {
    setSelectedService(service);
    setSelectedIndex(index);
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-navy-900 relative diagonal-top diagonal-bottom">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealText className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-gold-500" />
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-600">Business Clusters</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-cream-100 tracking-tight leading-tight">
              <WordReveal text="Six Practice Areas" />
            </h2>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold tracking-widest uppercase text-cream-100 link-hover hover:text-gold-600 transition-colors"
          >
            All Services →
          </Link>
        </RevealText>

        {/* 3x2 Grid of 3D Tilting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {services.map((service, i) => (
            <TiltCard key={service.id} service={service} index={i} onSelect={handleSelectService} />
          ))}
        </div>
      </div>

      {/* Modal for detail view */}
      <PracticeDetailModal
        service={selectedService}
        index={selectedIndex}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};

export default ServicesSection;
