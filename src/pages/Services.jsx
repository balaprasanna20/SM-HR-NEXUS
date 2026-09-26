import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCheckCircle, FiSearch, FiSliders, FiActivity, FiGift, FiBookOpen, FiUsers, FiCpu, FiPieChart, FiShield, FiBriefcase } from 'react-icons/fi';
import SEO from '../components/layout/SEO';
import PageTransition from '../components/layout/PageTransition';
import WordReveal from '../components/widgets/WordReveal';
import { services } from '../data/services';

const iconMap = { FiBookOpen: FiBookOpen, FiUsers: FiUsers, FiCpu: FiCpu, FiPieChart: FiPieChart, FiShield: FiShield, FiBriefcase: FiBriefcase };

const RevealText = ({ children, delay = 0, className = '' }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }} className={className}>
      {children}
    </motion.div>
  );
};

const steps = [
  { step: '01', title: 'Consultation', subtitle: 'Conceive the Problem', desc: 'Deep stakeholder interviews and process mapping to fully understand core challenges.', icon: FiSearch },
  { step: '02', title: 'Planning', subtitle: 'Create the Strategy', desc: 'Our advisors design regulatory-compliant, scalable strategies tailored to your vertical.', icon: FiSliders },
  { step: '03', title: 'Execution', subtitle: 'Implement Precisely', desc: 'Deploy cloud systems, recruitment campaigns, or corporate structures with measurable accuracy.', icon: FiActivity },
  { step: '04', title: 'Delivery', subtitle: 'Verify & Support', desc: 'We confirm quality benchmarks and become your single-source, long-term operational partner.', icon: FiGift },
];

const industries = [
  'Manufacturing & Heavy Engineering', 'IT Services & Cloud Technologies', 'Healthcare & Pharmaceuticals',
  'Banking & Insurance Organizations', 'Private Colleges & Universities', 'Real Estate & Logistics',
];

const ProcessSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <RevealText className="mb-12 md:mb-16 text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-px bg-gold-500" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-500">Our Methodology</span>
            <div className="w-6 h-px bg-gold-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 tracking-tight">The 3C Framework</h2>
          <p className="text-xs md:text-sm text-navy-950 max-w-xl mx-auto font-medium">Conceive, Create, Complete — a structured path transforming corporate challenges into verified successes.</p>
        </RevealText>

        <div className="relative">
          {/* Scroll progress drawing line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 hidden lg:block" />
          <motion.div
            style={{ scaleX }}
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-gold-500 -translate-y-1/2 origin-left hidden lg:block shadow-[0_0_8px_#C9A84C]"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((s, i) => {
              const StepIcon = s.icon;
              return (
                <RevealText key={s.title} delay={i * 0.06}>
                  <div className="bg-cream-200 border border-white/5 rounded-xl p-6 md:p-8 space-y-4 hover:border-gold-500/20 transition-all duration-300 relative overflow-hidden group h-full shadow-lg">
                    <span className="absolute top-4 right-5 text-5xl md:text-6xl font-black text-white/3 select-none group-hover:text-gold-500/5 transition-colors">{s.step}</span>
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-cream-50 transition-all duration-400">
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-navy-900 leading-tight">{s.title}</h3>
                      <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-gold-600/80 mt-1">{s.subtitle}</p>
                    </div>
                    <p className="text-xs md:text-sm text-navy-950 leading-relaxed font-medium">{s.desc}</p>
                  </div>
                </RevealText>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    ...services.map((srv, idx) => ({
      "@type": "Service",
      "name": srv.title,
      "description": srv.longDescription,
      "provider": {
        "@type": "Organization",
        "name": "SM HR Nexus",
        "url": "https://www.smhrnexus.com"
      },
      "areaServed": { "@type": "Country", "name": "India" },
      "serviceType": srv.title,
      "url": "https://www.smhrnexus.com/services"
    })),
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does SM HR Nexus offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SM HR Nexus offers six specialized practice areas: End-to-End Recruitment & Executive Search, HR SOPs & Corporate Consulting, Psychometric Testing & L&D, Investigative Background Inquiries, Statutory Compliance & Payroll, and Educational Consultancy Services."
          }
        },
        {
          "@type": "Question",
          "name": "What is the 3C Framework at SM HR Nexus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 3C Framework — Conceive, Create, Complete — is SM HR Nexus' structured methodology. It starts with deep stakeholder consultations, moves to regulatory-compliant strategy planning, and concludes with precise execution and long-term partnership support."
          }
        },
        {
          "@type": "Question",
          "name": "Which industries does SM HR Nexus serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SM HR Nexus serves Manufacturing & Heavy Engineering, IT Services & Cloud Technologies, Healthcare & Pharmaceuticals, Banking & Insurance, Private Colleges & Universities, and Real Estate & Logistics."
          }
        },
        {
          "@type": "Question",
          "name": "Does SM HR Nexus handle statutory compliance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, SM HR Nexus provides comprehensive statutory compliance support including PF, ESI, and PT filing, monthly/annual returns, challans, transfer and settlement forms, and tax-friendly salary structuring."
          }
        },
        {
          "@type": "Question",
          "name": "What is psychometric testing at SM HR Nexus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SM HR Nexus uses psychometric and OPQ assessment tools to evaluate candidate attitudes, behavioral patterns, and reliability. This complements traditional interview methods and helps detect doctored responses."
          }
        }
      ]
    }
  ]
};

const Services = () => (
  <PageTransition>
    <SEO title="Services | HR Practice Clusters" description="Explore SM HR Nexus' six specialized practice areas: recruitment, HR SOPs & consulting, psychometric testing, background inquiries, statutory compliance, and educational placement consulting." schema={servicesSchema} />

    {/* Header */}
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 bg-cream-50 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-5 md:space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-gold-500" />
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-500">Business Clusters</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-navy-900 tracking-tight leading-tight flex flex-col items-start gap-1">
          <WordReveal text="Six Specialized" />
          <WordReveal text="Practice Areas" className="text-gradient-gold" delay={0.25} />
        </h1>
      </div>
    </section>

    {/* Services alternating list */}
    <section className="py-12 md:py-20 bg-navy-900">
      {services.map((srv, idx) => {
        const Icon = iconMap[srv.iconName] || FiBookOpen;
        const isEven = idx % 2 === 0;
        return (
          <div key={srv.id} className={`py-14 md:py-20 border-b border-cream-100/5 ${!isEven ? 'bg-navy-800/40' : ''}`}>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <RevealText className={`space-y-6 ${!isEven ? 'lg:order-last' : ''}`} delay={0}>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-gold-600 mb-0.5">Cluster {String(idx + 1).padStart(2, '0')}</p>
                    <h2 className="text-xl md:text-2xl font-black text-cream-100 leading-tight">{srv.title}</h2>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-cream-300/70 leading-relaxed font-light">{srv.longDescription}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {srv.subServices.map((sub, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-cream-200 font-semibold leading-tight">
                      <FiCheckCircle className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {srv.features.map((f, i) => (
                    <span key={i} className="bg-cream-100/6 text-cream-200 text-[10px] md:text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-cream-100/8">
                      {f}
                    </span>
                  ))}
                </div>
              </RevealText>

              <RevealText delay={0.08} className={`max-w-md mx-auto lg:max-w-none ${!isEven ? 'lg:order-first' : ''}`}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-cream-100/8 shadow-lg">
                  <img
                    src={[
                      '/images/service-recruitment.webp',
                      '/images/service-hrsops.webp',
                      '/images/service-psychometric.webp',
                      '/images/service-investigative.webp',
                      '/images/service-compliance.webp',
                      '/images/service-education.webp'
                    ][idx]}
                    alt={srv.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </RevealText>
            </div>
          </div>
        );
      })}
    </section>

    {/* Process Section */}
    <ProcessSection />

    {/* Industries */}
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
        <RevealText className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-cream-100 tracking-tight">Industries We Serve</h2>
          <p className="text-xs md:text-sm text-cream-300/60 max-w-lg mx-auto font-light">Specialized solutions for enterprises operating across core industrial and knowledge sectors.</p>
        </RevealText>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {industries.map((ind, i) => (
            <RevealText key={ind} delay={i * 0.04}>
              <div className="bg-navy-800 border border-cream-100/6 rounded-xl py-4 px-5 text-cream-200 font-bold text-xs md:text-sm hover:bg-cream-100 hover:text-gold-700 transition-all duration-400 cursor-default">
                {ind}
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  </PageTransition>
);

export default Services;
