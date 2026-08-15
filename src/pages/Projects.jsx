import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight, FiX, FiCalendar, FiUser, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/layout/SEO';
import PageTransition from '../components/layout/PageTransition';
import { projects } from '../data/projects';

const filters = [
  { label: 'All', slug: 'all' },
  { label: 'Recruitment', slug: 'recruitment-headhunting' },
  { label: 'HR Consulting', slug: 'hr-sops-consulting' },
  { label: 'Psychometric', slug: 'psychometric-learning' },
  { label: 'Background Inquiries', slug: 'investigative-checks' },
  { label: 'Statutory Compliance', slug: 'statutory-compliance' },
  { label: 'Educational', slug: 'educational-consultancy' },
];

const ProjectCard = ({ proj, index, onClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      layout onClick={onClick}
      className="group cursor-pointer bg-cream-200 border border-white/5 rounded-xl overflow-hidden hover:border-gold-500/25 transition-all duration-400"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <span className="absolute bottom-3 left-3 text-[8px] font-bold tracking-[0.3em] uppercase bg-navy-950/85 backdrop-blur-sm text-gold-400 border border-gold-500/30 px-2.5 py-1 rounded-full shadow-md">
          {proj.categoryLabel}
        </span>
      </div>
      <div className="p-5 md:p-6 space-y-2.5">
        <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold-600">{proj.client}</p>
        <h3 className="text-sm md:text-base font-bold text-navy-900 group-hover:text-gold-400 transition-colors leading-snug line-clamp-2">{proj.title}</h3>
        <p className="text-xs md:text-sm text-navy-700/50 line-clamp-2 leading-relaxed font-light">{proj.summary}</p>
        <div className="flex items-center gap-2 text-gold-500/70 text-[10px] font-bold tracking-widest uppercase pt-1 group-hover:text-gold-400 transition-colors">
          <span>Details</span><FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const Modal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div className="absolute inset-0 bg-cream-50/90 backdrop-blur-xl"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 bg-cream-200 border border-white/8 rounded-xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl"
        initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <button onClick={onClose} aria-label="Close modal" className="absolute top-4 right-4 z-20 p-2 text-navy-700/50 hover:text-navy-900 hover:bg-white/5 rounded-lg transition-all">
          <FiX className="w-4 h-4" />
        </button>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-56 md:h-auto min-h-[260px] md:min-h-[400px] overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <span className="absolute bottom-4 left-4 text-[8px] font-bold tracking-[0.3em] uppercase bg-navy-950/85 text-gold-400 border border-gold-500/30 px-3 py-1.5 rounded-full shadow-md">
            {project.categoryLabel}
          </span>
        </div>
        <div className="p-6 md:p-8 space-y-5">
          <div>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold-500 mb-1">{project.client}</p>
            <h2 className="text-xl md:text-2xl font-black text-navy-900 leading-tight">{project.title}</h2>
            <p className="text-xs md:text-sm text-navy-700/55 mt-1.5 italic font-light">{project.summary}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-3.5">
            <div className="flex items-center gap-2.5">
              <FiUser className="w-4 h-4 text-gold-500 shrink-0" />
              <div>
                <p className="text-[8px] uppercase tracking-wider font-bold text-navy-700/35">Client</p>
                <p className="text-xs font-semibold text-navy-800">{project.client}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <FiCalendar className="w-4 h-4 text-gold-500 shrink-0" />
              <div>
                <p className="text-[8px] uppercase tracking-wider font-bold text-navy-700/35">Duration</p>
                <p className="text-xs font-semibold text-navy-800">{project.timeline}</p>
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold-500">Project Overview</h4>
            <p className="text-xs md:text-sm text-navy-700/60 leading-relaxed font-light">{project.description}</p>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold-500">Key Deliverables</h4>
            <ul className="space-y-1.5">
              {project.achievements.map((a, i) => (
                <li key={i} className="flex gap-2 items-start text-xs text-navy-700/60 font-light">
                  <FiCheckCircle className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />{a}
                </li>
              ))}
            </ul>
          </div>
          {project.clientQuote && (
            <div className="border-l-2 border-gold-500 pl-3.5 italic text-xs md:text-sm text-navy-700/55 font-light">
              &ldquo;{project.clientQuote}&rdquo;
              <p className="not-italic text-[8px] font-bold uppercase tracking-wider text-navy-700/35 mt-1">— {project.client}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <PageTransition>
      <SEO title="Projects | Case Study Portfolio" description="Browse SM HR Nexus' corporate project portfolio and case studies across executive recruitment, background verification checks, and HR compliance audits." />

      {/* Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 bg-cream-50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-5 md:space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-gold-500" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-500">Portfolio</span>
          </div>
          <motion.h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-navy-900 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            Proven Case<br /><span className="text-gradient-gold">Studies</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 space-y-8 md:space-y-10">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 md:gap-2.5">
            {filters.map(f => (
              <button key={f.slug} onClick={() => setFilter(f.slug)}
                className={`text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase px-3.5 py-1.5 md:px-4 md:py-2 rounded-full border transition-all duration-300 ${
                  filter === f.slug
                    ? 'bg-gold-500 text-cream-50 border-gold-500'
                    : 'bg-transparent border-white/10 text-navy-700/60 hover:text-navy-900 hover:border-white/25'
                }`}>
                {f.label}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((proj, i) => (
                <ProjectCard key={proj.id} proj={proj} index={i} onClick={() => setSelected(proj)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Projects;
