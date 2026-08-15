import { Link } from 'react-router-dom';
import RevealText from './RevealText';
import WordReveal from '../widgets/WordReveal';
import ExpertiseBar from '../common/ExpertiseBar';

const expertiseData = [
  { skill: 'End-to-End Recruitment', percent: 98 },
  { skill: 'HR SOPs & Consulting', percent: 95 },
  { skill: 'Psychometric Testing & L&D', percent: 90 },
  { skill: 'Investigative Inquiries', percent: 94 },
  { skill: 'Statutory Compliances & Payroll', percent: 96 },
  { skill: 'Educational Placements & SSDP', percent: 88 },
];

export const ExpertiseSection = () => (
  <section id="expertise" className="py-20 md:py-28 bg-navy-900 relative diagonal-top diagonal-bottom">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
      <RevealText className="space-y-5 text-left">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-gold-500" />
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-600">Domain Expertise</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-cream-100 tracking-tight leading-tight">
          <WordReveal text="Precision Across HR Domains" />
        </h2>
        <p className="text-sm md:text-base text-cream-300/70 leading-relaxed max-w-md font-light">
          Our top-notch professionals bring decades of cumulative experience to every mandate, from SM HR Nexus executive search to statutory compliance audits.
        </p>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cream-100 hover:text-gold-600 transition-colors link-hover"
        >
          Meet Partners →
        </Link>
      </RevealText>

      <div className="space-y-6">
        {expertiseData.map((item, i) => (
          <ExpertiseBar key={item.skill} skill={item.skill} percent={item.percent} delay={i * 0.06} />
        ))}
      </div>
    </div>
  </section>
);

export default ExpertiseSection;
