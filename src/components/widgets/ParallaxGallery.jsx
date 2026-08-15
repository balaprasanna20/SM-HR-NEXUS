import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const ParallaxPhoto = ({ image, title, subtitle, index, tag }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Photo moves vertically as you scroll
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <div ref={containerRef} className="relative h-[60vh] md:h-[72vh] overflow-hidden border-b border-gold-500/10 group">
      {/* Background Photo */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05] group-hover:scale-105 transition-transform duration-1000"
        />
      </motion.div>

      {/* Dark Gradient Overlay & Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent flex flex-col justify-end p-8 sm:p-12 md:p-16">
        <motion.div style={{ opacity }} className="max-w-4xl space-y-3">
          {tag && (
            <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.35em] uppercase text-gold-400 bg-gold-500/10 border border-gold-500/30 px-3.5 py-1 rounded-full">
              {tag}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-cream-50 tracking-tight leading-tight">
            {title} <span className="text-gold-400 font-light">#{index}</span>
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-cream-300/80 font-light max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const DEFAULT_ITEMS = [
  {
    image: '/images/hero-boardroom.webp',
    title: 'Executive Leadership Advisory',
    subtitle: 'Steering strategic human capital transformation across top corporate organizations.',
    tag: 'Pillar 01',
  },
  {
    image: '/images/hero-workspace.webp',
    title: 'Modern Workplace Culture',
    subtitle: 'Fostering high-performance environments with structured HR SOPs & policy frameworks.',
    tag: 'Pillar 02',
  },
  {
    image: '/images/hero-advisory.webp',
    title: 'Strategic Talent Sourcing',
    subtitle: 'Connecting visionaries with high-growth enterprises through targeted executive search.',
    tag: 'Pillar 03',
  },
  {
    image: '/images/service-compliance.webp',
    title: 'Statutory Compliance Audit',
    subtitle: 'End-to-end automation of labor law compliance, PF, ESI, and payroll governance.',
    tag: 'Pillar 04',
  },
  {
    image: '/images/hero-skyline.webp',
    title: 'Pan-India Footprint',
    subtitle: 'Delivering seamless HR advisory and talent management across primary business hubs.',
    tag: 'Pillar 05',
  },
];

const ParallaxGallery = ({ items = DEFAULT_ITEMS, heading = "Explore Our Core Spheres", badge = "Interactive Parallax Experience" }) => {
  return (
    <section className="bg-navy-950 text-cream-50 py-16 md:py-24 relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20">
          <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.35em] uppercase text-gold-400">
            {badge}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cream-50 tracking-tight">
          {heading}
        </h2>
      </div>

      {/* 5-Photo Parallax Showcase */}
      <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6">
        {items.map((item, idx) => (
          <div key={idx} className="rounded-3xl overflow-hidden shadow-2xl border border-gold-500/20">
            <ParallaxPhoto
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              tag={item.tag}
              index={`0${idx + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ParallaxGallery;
