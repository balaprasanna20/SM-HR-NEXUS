import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { teamMembers } from '../../data/team';
import { FiCheckCircle, FiLinkedin, FiArrowRight } from 'react-icons/fi';

const TeamRow = ({ member, index }) => {
  const rowRef = useRef(null);
  const isEven = index % 2 === 0;
  const firstName = member.name.split(' ')[0];

  // Scroll parallax for photo image
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });
  
  // Subtle parallax translation on vertical axis
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Motion variants for fade-in slide layouts
  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? 50 : -50, 
      y: 15 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const photoVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -50 : 50, 
      scale: 0.96 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const pillContainerVariants = {
    hidden: {},
    visible: {
      transition: { 
        staggerChildren: 0.06, 
        delayChildren: 0.3 
      }
    }
  };

  const pillItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 14 
      } 
    }
  };

  return (
    <div
      ref={rowRef}
      className={`team-card-row ${isEven ? 'row-odd' : 'row-even'} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}
    >
      {/* CONTENT BOX */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={`team-content-box lg:col-span-7 ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <div className="bg-cream-50 border border-gold-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl text-navy-900 space-y-5 sm:space-y-6 relative">
          
          {/* Header Tag */}
          <div className="space-y-2.5 border-b border-navy-900/10 pb-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-gold-700 bg-gold-500/10 border border-gold-500/30 px-3.5 py-1 rounded-full">
                {member.department}
              </span>
            </div>

            {/* Friendly "Hey folks, I'm [Name]" Heading */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy-900 tracking-tight">
              Hey folks, I'm <span className="text-gold-600">{firstName}</span>.
            </h3>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-navy-900/70">
              {member.role}
            </p>
          </div>

          {/* Bio Description */}
          <p className="text-sm sm:text-base text-navy-900/90 leading-relaxed font-light text-left sm:text-justify">
            {member.bio}
          </p>

          {/* Highlights Pills */}
          <motion.div 
            variants={pillContainerVariants}
            className="flex flex-wrap gap-2 pt-1"
          >
            {member.highlights.map((h, i) => (
              <motion.span
                key={i}
                variants={pillItemVariants}
                className="team-badge-pill inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-navy-900 bg-navy-900/5 border border-navy-900/15 px-3 sm:px-3.5 py-1.5 rounded-xl shadow-xs"
              >
                <FiCheckCircle className="text-gold-600 w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{h}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* Connect Footer */}
          <div className="pt-4 border-t border-navy-900/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-light italic text-navy-900/60">With genuine passion,</p>
              <p className="text-sm sm:text-base font-bold text-navy-900 tracking-tight">{member.name}</p>
            </div>

            <a
              href={member.linkedin || '#'}
              onClick={(e) => {
                if (!member.linkedin || member.linkedin === '#') e.preventDefault();
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-gold-500 text-cream-50 hover:text-navy-950 text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-md cursor-pointer group"
            >
              <FiLinkedin className="w-4 h-4 text-gold-400 group-hover:text-navy-950 transition-colors" />
              <span>Connect Profile</span>
              <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </motion.div>

      {/* PHOTO BOX */}
      <motion.div
        variants={photoVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={`team-photo-box lg:col-span-5 flex justify-center ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <div className="relative w-full max-w-xs sm:max-w-md">

          {/* Photo Frame with Metallic Gold Border */}
          <div className="bg-gradient-to-tr from-gold-500/50 via-navy-900 to-gold-500/50 p-2.5 sm:p-3 rounded-3xl border border-gold-500/40 shadow-2xl relative">
            
            {/* Photo Wrapper (4:5 Aspect Ratio) */}
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative bg-cream-50 group">
              <motion.img
                style={{ y }}
                src={member.image}
                alt={member.name}
                className="team-photo-img w-full h-full object-cover object-center scale-110 transition-transform duration-700 group-hover:scale-115"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Clean Name Tag Below Image */}
            <div className="mt-3 text-center py-2 px-3 bg-navy-950/90 border border-gold-500/20 rounded-xl">
              <p className="text-xs font-extrabold text-cream-50 truncate">{member.name}</p>
              <p className="text-[10px] text-gold-400 font-medium truncate mt-0.5">{member.role}</p>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

const GSAPTeamShowcase = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="py-20 md:py-36 bg-navy-950 text-cream-50 relative overflow-hidden isolate">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)',
          backgroundSize: '65px 65px',
        }}
      />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-navy-800/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-20 md:space-y-36">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-cream-50 tracking-tight leading-tight flex flex-col items-center gap-1.5 sm:gap-2">
            <span>Meet the Specialists Steering</span>
            <span className="text-gradient-gold">SM HR Nexus</span>
          </h2>
          <p className="text-cream-300/70 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto pt-2">
            Scroll down to read personal notes from our 5 domain leaders in recruitment, advisory, and statutory compliances.
          </p>
        </div>

        {/* ─── 5 ALTERNATING TEAM ROWS WITH SMOOTH SCROLL & "HEY FOLKS" GREETINGS ─── */}
        <div className="space-y-12 md:space-y-32">
          {teamMembers.map((member, index) => (
            <TeamRow key={member.id} member={member} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default GSAPTeamShowcase;
