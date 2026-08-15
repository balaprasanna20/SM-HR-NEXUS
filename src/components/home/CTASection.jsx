import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import RevealText from './RevealText';
import MagneticButton from '../common/MagneticButton';

export const CTASection = () => (
  <section id="cta" className="py-20 md:py-28 bg-cream-100 relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
      />
    </div>

    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-8 md:space-y-10">
      <RevealText className="space-y-5">
        <p className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-500">Start Today</p>
        <h2 className="text-3xl md:text-5xl font-black text-navy-900 tracking-tight leading-[1.1]">
          Ready to Find Your<br />
          <span className="text-gradient-gold">Ideal Match?</span>
        </h2>
        <p className="text-sm md:text-base text-navy-700/60 max-w-md mx-auto leading-relaxed font-light">
          Partner with SM HR Nexus — from end-to-end recruitment to HR SOP consulting and statutory compliance.
        </p>
      </RevealText>

      <RevealText delay={0.15} className="flex flex-col sm:flex-row justify-center gap-4">
        <MagneticButton
          as={Link}
          to="/contact"
          className="relative overflow-hidden group inline-flex items-center justify-center gap-3 bg-gold-500 text-cream-50 font-bold text-xs tracking-widest uppercase px-8 py-3.5 rounded-lg"
        >
          <span className="relative z-10">Book a Consultation</span>
          <FiArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
          <span className="absolute inset-0 bg-gold-300 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />
        </MagneticButton>

        <MagneticButton
          as={Link}
          to="/about"
          className="inline-flex items-center justify-center border border-navy-700/15 text-navy-800 font-semibold text-xs tracking-widest uppercase px-8 py-3.5 rounded-lg hover:border-gold-500/40 hover:text-gold-400 transition-all duration-300"
        >
          Our Story
        </MagneticButton>
      </RevealText>
    </div>
  </section>
);

export default CTASection;
