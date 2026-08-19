import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight, FiMapPin, FiClock, FiBriefcase } from 'react-icons/fi';
import SEO from '../components/layout/SEO';
import PageTransition from '../components/layout/PageTransition';
import MagneticButton from '../components/common/MagneticButton';
import WordReveal from '../components/widgets/WordReveal';
import { benefits, openRoles } from '../data/careers';

import ResumeUploadForm from '../components/widgets/ResumeUploadForm';

const RevealText = ({ children, delay = 0, className = '' }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }} className={className}>
      {children}
    </motion.div>
  );
};

const handleApply = (title) => {
  const toEmail = 'info@smhrnexus.com';
  const sub = encodeURIComponent(`Application for ${title}`);
  const body = encodeURIComponent(`Dear HR Team,\n\nI am writing to apply for the ${title} position at SM HR Nexus.\n\nFull Name:\nPhone Number:\nYears of Experience:\n\nThank you,`);
  window.location.href = `mailto:${toEmail}?subject=${sub}&body=${body}`;
};

const careersSchema = {
  "@context": "https://schema.org",
  "@graph": [
    ...openRoles.map((role) => ({
      "@type": "JobPosting",
      "title": role.title,
      "description": role.description + ' Requirements: ' + role.requirements.join('. '),
      "datePosted": "2026-08-05",
      "validThrough": "2027-02-05",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "SM HR Nexus",
        "sameAs": "https://www.smhrnexus.com",
        "logo": "https://www.smhrnexus.com/logo-icon.png"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3/2 Second Street, Raghava Reddy Colony, Ashok Nagar",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600083",
          "addressCountry": "IN"
        }
      },
      "industry": "Human Resources",
      "occupationalCategory": role.department
    })),
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the work culture at SM HR Nexus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SM HR Nexus has a flat-hierarchy culture where recruitment consultants get direct access to partners with over 100 years of cumulative experience. The company funds professional development including HR management certifications and compliance training."
          }
        },
        {
          "@type": "Question",
          "name": "What benefits does SM HR Nexus offer to employees?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SM HR Nexus offers comprehensive medical insurance, generous professional development budgets, collaborative mentorship under experienced partners, and annual performance-based bonuses."
          }
        },
        {
          "@type": "Question",
          "name": "How do I apply for a job at SM HR Nexus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can apply by clicking the 'Apply Now' button on any open position, which will open your email client pre-filled with the application details. You can also submit your resume directly through the resume upload form on the Careers page."
          }
        }
      ]
    }
  ]
};

const Careers = () => (
  <PageTransition>
    <SEO title="Careers | Join Our Expert Team" description="Explore careers at SM HR Nexus. Join our team of domain professionals in recruitment, HR SOP consulting, and statutory compliances." schema={careersSchema} />

    {/* Header */}
    <section className="relative pt-28 pb-12 md:pt-44 md:pb-24 bg-cream-50 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-5 md:space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-gold-500" />
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-500">Join Our Team</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-navy-900 tracking-tight leading-tight flex flex-col items-start gap-1">
          <WordReveal text="Build Corporate" />
          <WordReveal text="Excellence" className="text-gradient-gold" delay={0.25} />
        </h1>
      </div>
    </section>

    {/* Culture section */}
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <RevealText className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-cream-100 leading-tight">
            Work That Challenges<br />& Empowers You
          </h2>
          <div className="space-y-4 text-cream-300/70 text-sm md:text-base leading-relaxed font-light">
            <p>At SM HR Nexus, candidate insight and partner dedication are rewarded. Our flat-hierarchy culture gives recruitment consultants direct access to partners with over 100 years of cumulative experience from day one.</p>
            <p>We fund professional development — whether you're pursuing advanced HR management certifications or compliance training, we invest in your roadmap.</p>
          </div>
        </RevealText>
        <RevealText delay={0.1}>
          <div className="aspect-[4/3] rounded-xl overflow-hidden border border-cream-100/8 shadow-lg max-w-lg mx-auto lg:max-w-none">
            <img src="/images/hero-workspace.webp" alt="SM HR Nexus office culture" className="w-full h-full object-cover" />
          </div>
        </RevealText>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-20 md:py-28 bg-cream-100">
      <div className="max-w-7xl mx-auto px-6">
        <RevealText className="mb-12 md:mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-gold-500" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-500">Perquisites</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 tracking-tight">Benefits & Culture</h2>
        </RevealText>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <RevealText key={b.title} delay={i * 0.06}>
              <div className="bg-cream-200 border border-white/5 rounded-xl p-6 md:p-8 space-y-4 hover:border-gold-500/20 transition-colors h-full">
                <div className="w-8 h-[2px] rounded-full bg-gold-500" />
                <h3 className="text-base md:text-lg font-bold text-navy-900">{b.title}</h3>
                <p className="text-xs md:text-sm text-navy-700/55 leading-relaxed font-light">{b.description}</p>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>

    {/* Open Roles & Direct Resume Upload Section */}
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        <div>
          <RevealText className="mb-12 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-gold-500" />
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-600">Open Positions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-cream-100 tracking-tight">Current Opportunities</h2>
          </RevealText>

          <div className="space-y-6">
            {openRoles.map((role, i) => (
              <RevealText key={role.id} delay={i * 0.05}>
                <div className="bg-navy-950 border border-cream-100/8 rounded-xl p-6 md:p-8 space-y-5 hover:border-gold-500/30 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cream-100/8 pb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-cream-100 leading-tight">{role.title}</h3>
                      <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold-600 mt-1">{role.department}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { icon: FiMapPin, text: role.location },
                        { icon: FiClock, text: role.type },
                        { icon: FiBriefcase, text: role.experience },
                      ].map(({ icon: Icon, text }) => (
                        <span key={text} className="flex items-center gap-1 bg-cream-100/6 text-cream-300 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                          <Icon className="w-3 h-3 text-gold-600" />{text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-cream-300/70 leading-relaxed font-light">{role.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {role.requirements.map((r, ri) => (
                      <li key={ri} className="flex gap-2 items-start text-xs text-cream-300/65 font-light">
                        <span className="mt-2 w-1 h-1 rounded-full bg-gold-500 shrink-0" />{r}
                      </li>
                    ))}
                  </ul>
                  <MagneticButton
                    onClick={() => handleApply(role.title)}
                    className="relative overflow-hidden group inline-flex items-center gap-2.5 bg-cream-100 text-navy-900 font-bold text-[10px] tracking-[0.2em] uppercase px-5 py-3 rounded-lg hover:text-cream-50 transition-colors duration-400"
                    strength={0.15}
                  >
                    <span className="relative z-10">Apply Now</span>
                    <FiArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    <span className="absolute inset-0 bg-gold-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />
                  </MagneticButton>
                </div>
              </RevealText>
            ))}
          </div>
        </div>

        {/* Spontaneous Application - Resume Upload */}
        <div id="upload-resume" className="pt-8 border-t border-cream-100/10">
          <RevealText delay={0.1}>
            <ResumeUploadForm />
          </RevealText>
        </div>
      </div>
    </section>
  </PageTransition>
);

export default Careers;
