import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RevealText from './RevealText';

const clientLogos = [
  { id: 1,  name: 'OMAX',            sub: 'Passionate about Performance', file: 'omax' },
  { id: 2,  name: 'Rebel Foods',     sub: '',                             file: 'rebel' },
  { id: 3,  name: 'SCYBERS',         sub: '',                             file: 'scybers' },
  { id: 4,  name: 'Quinte',          sub: 'Increased Protection',         file: 'quinte' },
  { id: 5,  name: 'Chai Waale',      sub: 'Tea Professionals',            file: 'chaiwaale' },
  { id: 6,  name: 'Austin Engg',     sub: 'Engineering Ltd.',             file: 'austin' },
  { id: 7,  name: 'St. John GCL',    sub: 'Logistics',                    file: 'stjohn' },
  { id: 8,  name: 'LA',              sub: '',                             file: 'la' },
  { id: 9,  name: 'SpanTag',         sub: 'Technologies',                 file: 'spantag' },
  { id: 10, name: 'echoVME',         sub: 'Go Digital',                   file: 'echovme' },
  { id: 11, name: 'ProSol',          sub: 'Unified Workways',             file: 'prosol' },
  { id: 12, name: 'Codeyoung',       sub: '',                             file: 'codeyoung' },
  { id: 13, name: 'NVGL',            sub: 'Visa Global Logistics',        file: 'nvgl' },
  { id: 14, name: 'Satchmo Foods',   sub: '',                             file: 'satchmo' },
  { id: 15, name: 'Mount Road Bilal', sub: 'Kebabs & Biryani',            file: 'bilal' },
];

const row1Logos = clientLogos.slice(0, 8);
const row2Logos = clientLogos.slice(8, 15);

const ClientLogoCard = ({ client }) => {
  const [err, setErr] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="w-[160px] h-[68px] sm:w-[195px] sm:h-[82px] md:w-[230px] md:h-[96px] rounded-xl flex items-center justify-center shrink-0 cursor-pointer mx-3 sm:mx-5 md:mx-6 select-none relative transition-all duration-300 group overflow-hidden bg-white p-3 shadow-sm hover:shadow-gold-500/25"
    >
      {!err ? (
        <img
          src={`/clients/${client.file}.jpeg`}
          alt={client.name}
          onError={() => setErr(true)}
          className="w-full h-full object-contain logo-crisp transition-transform duration-300 group-hover:scale-105"
          draggable={false}
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center px-3 py-1">
          <p className="font-black text-xs md:text-sm leading-tight text-cream-950">{client.name}</p>
          {client.sub && (
            <p className="text-[9px] text-gold-600 mt-0.5 leading-tight">{client.sub}</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

const MarqueeTrack = ({ logos, cssClass }) => {
  if (!logos || logos.length === 0) return null;
  const doubled = [...logos, ...logos];
  return (
    <div className="flex overflow-hidden">
      <div className={cssClass}>
        {doubled.map((c, i) => (
          <ClientLogoCard key={`${c.id}-${i}`} client={c} />
        ))}
      </div>
    </div>
  );
};

export const ClientsSection = () => {
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!clientLogos || clientLogos.length === 0) {
    return null;
  }

  return (
    <section
      id="clients"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: '#0A1128' }}
    >
      {/* Gold radial glow — centre */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)' }}
        />
      </div>
      {/* Subtle top edge highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)' }}
      />
      {/* Subtle bottom edge highlight */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)' }}
      />

      <div className="relative z-10">
        <div className="text-center space-y-3 mb-10 md:mb-14 px-4 md:px-6">
          <RevealText className="space-y-2 md:space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 md:w-6 h-px bg-gold-500/70" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.35em] md:tracking-[0.4em] uppercase text-gold-400">Our Clients</span>
              <div className="w-5 md:w-6 h-px bg-gold-500/70" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
              Trusted by<br />
              <span className="text-gradient-gold">Industry Leaders</span>
            </h2>
          </RevealText>
        </div>

        <div className="mb-5">
          <MarqueeTrack logos={row1Logos} cssClass="marquee-ltr" />
        </div>

        <MarqueeTrack logos={row2Logos} cssClass="marquee-rtl" />
      </div>
    </section>
  );
};

export default ClientsSection;
