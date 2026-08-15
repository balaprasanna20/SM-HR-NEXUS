import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEO from '../components/layout/SEO';
import PageTransition from '../components/layout/PageTransition';
import WordReveal from '../components/widgets/WordReveal';
import GSAPTeamShowcase from '../components/widgets/GSAPTeamShowcase';


const RevealText = ({ children, delay = 0, className = '' }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const timelineEvents = [
  { year: '2011', title: 'Company Founded', desc: 'SM HR Nexus was established with a focus on executive recruitment, providing ideal match-making for regional companies.' },
  { year: '2015', title: 'HR SOPs & Consulting', desc: 'Launched our corporate advisory division, helping enterprises design bespoke organization policies and performance structures.' },
  { year: '2019', title: 'Psychometric Testing Launch', desc: 'Introduced systematic psychometric and OPQ assessment tools to gauge candidate attitudes and prevent compliance issues.' },
  { year: '2023', title: 'Expanded Operations', desc: 'Expanded corporate operations in Chennai, supporting client transactions and statutory compliance programs.' },
];

const values = [
  { title: 'Absolute Integrity', desc: 'Every engagement is governed by complete confidentiality, non-poaching ethics, and transparent evaluations.' },
  { title: 'Ideal Match Making', desc: 'We take no sides. The best interest of our candidate and employer partners drives our execution forward.' },
  { title: 'Execution Precision', desc: 'From calculating statutory returns (PF/ESI) to running detailed candidate investigative checks with accuracy.' },
  { title: 'Timely Delivery', desc: 'Securing top-tier talent quickly under pressure without sacrificing verification standards or alignment.' },
];

const About = () => (
  <PageTransition>
    <SEO
      title="About Us | Journey, Vision & Leadership"
      description="Learn about SM HR Nexus' corporate recruitment journey, core values, mission and vision, and the partners driving our business clusters."
    />

    {/* Page Header */}
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 bg-cream-50 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-5 md:space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-gold-500" />
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-500">Our Story</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-navy-900 tracking-tight leading-tight flex flex-col items-start gap-1">
          <WordReveal text="Powered by People," />
          <WordReveal text="Driven by Excellence" className="text-gradient-gold" delay={0.25} />
        </h1>
      </div>
    </section>

    {/* Company Story */}
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <RevealText className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-cream-100 leading-tight">
            Ideal Match Makers and Strategic HR Consultants
          </h2>
          <div className="space-y-4 text-cream-300/70 text-sm md:text-base leading-relaxed font-light">
            <p>Founded on the bedrock of success — Conceive, Create, Complete — SM HR Nexus is a multi-faceted corporate management consultancy established by top-notch professionals with over 100 years of cumulative experience steering the fortunes of national and international corporations.</p>
            <p>We believe in mutual growth. By utilizing multi-pronged sourcing strategies, comprehensive psychometric profiles, and strict background checks, we connect the right candidates with the right roles while ensuring labor compliance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-cream-100/10">
            <div className="space-y-1">
              <h4 className="text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase text-gold-600 mb-1">Our Mission</h4>
              <p className="text-xs md:text-sm text-cream-300/70 leading-relaxed font-light">Bring the 3C advantage to our corporate partners, matching suitability, capability, and reliability with absolute integrity.</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase text-gold-600 mb-1">Our Vision</h4>
              <p className="text-xs md:text-sm text-cream-300/70 leading-relaxed font-light">To steer corporate fortunes as India's premier multi-faceted HR advisory, recognized for SM HR Nexus executive recruitment.</p>
            </div>
          </div>
        </RevealText>

        <RevealText delay={0.1}>
          <div className="relative rounded-2xl overflow-hidden border border-cream-100/10 shadow-2xl aspect-[4/3] max-w-lg mx-auto lg:max-w-none">
            <img src="/images/hero-boardroom.webp" alt="Corporate Boardroom" className="w-full h-full object-cover" />
          </div>
        </RevealText>
      </div>
    </section>

    {/* Core Values */}
    <section className="py-20 md:py-28 bg-cream-100">
      <div className="max-w-7xl mx-auto px-6">
        <RevealText className="mb-12 md:mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-gold-500" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-500">Our Principles</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 tracking-tight">Core Values</h2>
        </RevealText>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <RevealText key={v.title} delay={i * 0.06}>
              <div className="bg-cream-200 border border-white/5 rounded-xl p-6 md:p-8 space-y-4 hover:border-gold-500/20 transition-colors h-full">
                <div className="w-8 h-[2px] rounded-full bg-gold-500" />
                <h3 className="text-base md:text-lg font-bold text-navy-900">{v.title}</h3>
                <p className="text-xs md:text-sm text-navy-700/55 leading-relaxed font-light">{v.desc}</p>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>

    {/* Alternating GSAP Team Showcase Section */}
    <GSAPTeamShowcase />

    {/* Timeline */}
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="max-w-3xl mx-auto px-6">
        <RevealText className="mb-12 md:mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-gold-500" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-600">Our Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-cream-100 tracking-tight">Timeline</h2>
        </RevealText>

        <div className="relative border-l border-gold-500/20 pl-6 md:pl-10 space-y-10 md:space-y-14">
          {timelineEvents.map((e, i) => (
            <RevealText key={e.year} delay={i * 0.08}>
              <div className="relative">
                <div className="absolute -left-[31px] md:-left-[46px] top-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-navy-900 border-2 border-gold-500 rounded-full" />
                <span className="text-[10px] md:text-[11px] font-black tracking-[0.35em] uppercase text-gold-600">{e.year}</span>
                <h3 className="text-lg md:text-xl font-black text-cream-100 mt-1 mb-2 leading-snug">{e.title}</h3>
                <p className="text-xs md:text-sm text-cream-300/60 leading-relaxed font-light max-w-2xl">{e.desc}</p>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  </PageTransition>
);

export default About;
