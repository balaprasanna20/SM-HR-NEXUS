import RevealText from './RevealText';

const coreValuesList = [
  { title: 'Absolute Integrity', desc: 'Every engagement is governed by complete confidentiality, non-poaching ethics, and transparent evaluations.' },
  { title: 'Ideal Match Making', desc: 'We take no sides. The best interest of candidate and employer partners drives our execution forward.' },
  { title: 'Execution Precision', desc: 'From calculating statutory returns (PF/ESI) to running detailed candidate investigative checks with accuracy.' },
  { title: 'Timely Delivery', desc: 'Securing top-tier talent quickly under pressure without sacrificing verification standards or alignment.' },
];

export const VisionMissionValuesSection = () => (
  <section id="vision-mission" className="py-20 md:py-28 bg-cream-50 relative">
    <div className="max-w-7xl mx-auto px-6 space-y-16">
      {/* Vision & Mission Grid */}
      <RevealText className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-cream-100 border border-gold-500/20 rounded-2xl p-8 md:p-12 shadow-soft">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-gold-500" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-600">Our Purpose</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy-900 leading-tight">
            Our Mission & Vision
          </h2>
          <p className="text-xs md:text-sm text-navy-800/70 leading-relaxed font-light">
            Founded on the bedrock of success — <strong className="text-gold-600 font-semibold">Conceive · Create · Complete</strong> — SM HR Nexus connects top-tier talent with corporate excellence through proven methodologies and ethical governance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 lg:pt-0">
          <div className="bg-navy-900 border border-cream-100/10 rounded-xl p-5 space-y-2 text-cream-50">
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold-500">Mission</span>
            <h3 className="text-sm font-bold text-cream-100">The 3C Advantage</h3>
            <p className="text-xs text-cream-300/70 leading-relaxed font-light">
              Bring the 3C advantage to corporate partners, matching suitability, capability, and reliability with absolute integrity.
            </p>
          </div>

          <div className="bg-navy-900 border border-cream-100/10 rounded-xl p-5 space-y-2 text-cream-50">
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold-500">Vision</span>
            <h3 className="text-sm font-bold text-cream-100">Premier HR Advisory</h3>
            <p className="text-xs text-cream-300/70 leading-relaxed font-light">
              To steer corporate fortunes as India's premier multi-faceted HR advisory, recognized for SM HR Nexus executive recruitment.
            </p>
          </div>
        </div>
      </RevealText>

      {/* Core Values 4-Card Grid */}
      <div className="space-y-8">
        <RevealText className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-gold-500" />
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-600">Guiding Pillars</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy-900 tracking-tight">Core Values</h2>
          </div>
        </RevealText>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValuesList.map((val, i) => (
            <RevealText key={val.title} delay={i * 0.06}>
              <div className="bg-cream-200 border border-white/10 rounded-xl p-6 space-y-3 hover:border-gold-500/30 transition-all h-full shadow-sm">
                <div className="w-8 h-[2px] rounded-full bg-gold-500" />
                <h3 className="text-base font-bold text-navy-900">{val.title}</h3>
                <p className="text-xs text-navy-700/65 leading-relaxed font-light">{val.desc}</p>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default VisionMissionValuesSection;
