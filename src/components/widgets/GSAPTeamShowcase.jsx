import { motion } from 'framer-motion';
import { teamMembers } from '../../data/team';
import { FiLinkedin } from 'react-icons/fi';

const FounderCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-navy-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 pt-16 sm:pt-20 shadow-xl hover:shadow-2xl hover:border-gold-500/60 transition-all duration-300 flex flex-col items-center text-center mt-14 group"
    >
      {/* Top Overlapping Circular Avatar Photo */}
      <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-gold-500/40 shadow-xl overflow-hidden bg-navy-950 border-2 border-gold-400 group-hover:scale-105 group-hover:ring-gold-500 transition-all duration-300">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover scale-115"
            style={{ objectPosition: member.imagePosition || 'center top' }}
          />
        </div>
      </div>

      {/* Name */}
      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2">
        {member.name}
      </h3>

      {/* Role / Subtitle */}
      <p className="text-sm sm:text-base font-semibold text-gold-400 mt-1">
        {member.role}
      </p>

      {/* Department Tag */}
      <span className="text-[11px] font-semibold text-gold-300 bg-gold-500/10 border border-gold-500/20 px-3 py-0.5 rounded-full mt-2">
        {member.department}
      </span>

      {/* Short Intro / Description */}
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4 flex-1 max-w-xs font-normal">
        {member.bio}
      </p>

      {/* LinkedIn Profile Icon Button at Bottom */}
      <div className="mt-6 pt-4 border-t border-gold-500/20 w-full flex justify-center">
        <a
          href={member.linkedin || '#'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!member.linkedin || member.linkedin === '#') e.preventDefault();
          }}
          title={`Connect with ${member.name} on LinkedIn`}
          aria-label={`LinkedIn profile for ${member.name}`}
          className="w-11 h-11 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-navy-950 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
        >
          <FiLinkedin className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  );
};

const GSAPTeamShowcase = () => {
  return (
    <section className="py-20 md:py-32 bg-cream-50 text-navy-900 relative overflow-hidden">
      {/* Background Accent Grids */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-900 tracking-tight">
            Our Core Team & Founders
          </h2>
          <p className="text-navy-700/70 text-sm sm:text-base font-light leading-relaxed">
            Meet the driving force behind SM HR Nexus, ensuring excellence and integrity across every strategic engagement.
          </p>
        </div>

        {/* 4 Team Member Cards Layout: Responsive 1/2/4 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-6 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <FounderCard key={member.id} member={member} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default GSAPTeamShowcase;

