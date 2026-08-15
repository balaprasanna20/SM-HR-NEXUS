import { Link } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import SocialLinks from '../widgets/SocialLinks';

const clusterLinks = [
  { label: 'Recruitment & Executive Search', path: '/services' },
  { label: 'HR SOPs & Corporate Consulting', path: '/services' },
  { label: 'Psychometric Testing & L&D', path: '/services' },
  { label: 'Investigative Background Inquiries', path: '/services' },
  { label: 'Statutory Compliance & Payroll', path: '/services' },
  { label: 'Educational Consultancy Services', path: '/services' },
];

const pageLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Practice Areas', path: '/services' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact Us', path: '/contact' },
];

const Footer = () => (
  <footer className="bg-navy-950 border-t border-gold-500/20 text-cream-100 relative">
    {/* Subtle Gold Ambient Light */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent pointer-events-none" />

    {/* Top Grid */}
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      
      {/* Column 1: Brand & Contact Info */}
      <div className="space-y-6">
        <Link to="/" className="flex items-center gap-3 group w-fit">
          <div className="relative w-11 h-11 rounded-full overflow-hidden bg-cream-100 border border-gold-500/30 flex items-center justify-center p-1">
            <img
              src={logo}
              alt="SM HR Nexus Logo"
              className="w-full h-full object-contain logo-crisp"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-black tracking-widest uppercase text-cream-50">SM HR Nexus</span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold-400 mt-1">Recruitment & HR Services</span>
          </div>
        </Link>

        <p className="text-xs text-cream-300/75 leading-relaxed font-light">
          India's premier multi-faceted corporate management consultancy. Built on our Conceive · Create · Complete bedrock.
        </p>

        <div className="space-y-3 pt-1 text-xs">
          <div className="flex gap-3 items-start text-cream-200/90">
            <FiMapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
            <span>3/2 Second Street, Raghava Reddy Colony, Ashok Nagar, Chennai 600083</span>
          </div>
          <div className="flex gap-3 items-center text-cream-200/90">
            <FiPhone className="w-4 h-4 text-gold-400 shrink-0" />
            <a href="tel:+916385099063" className="hover:text-gold-400 transition-colors">+91 6385 099 063</a>
          </div>
          <div className="flex gap-3 items-center text-cream-200/90">
            <FiMail className="w-4 h-4 text-gold-400 shrink-0" />
            <a href="mailto:info@smhrnexus.com" className="hover:text-gold-400 transition-colors">info@smhrnexus.com</a>
          </div>
        </div>

        <div className="pt-2">
          <SocialLinks />
        </div>
      </div>

      {/* Column 2: Quick Links */}
      <div className="space-y-4">
        <h4 className="text-xs font-black tracking-[0.35em] uppercase text-gold-400">Navigation</h4>
        <ul className="space-y-2.5 text-xs">
          {pageLinks.map(({ label, path }) => (
            <li key={path}>
              <Link to={path} className="text-cream-200/80 hover:text-gold-400 transition-colors font-medium inline-block py-0.5">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3: Business Clusters */}
      <div className="space-y-4">
        <h4 className="text-xs font-black tracking-[0.35em] uppercase text-gold-400">Practice Areas</h4>
        <ul className="space-y-2.5 text-xs">
          {clusterLinks.map((c) => (
            <li key={c.label}>
              <Link to={c.path} className="text-cream-200/80 hover:text-gold-400 transition-colors font-medium inline-block py-0.5">
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 4: Consultation CTA & Office */}
      <div className="space-y-5">
        <h4 className="text-xs font-black tracking-[0.35em] uppercase text-gold-400">Partner Consultation</h4>
        <p className="text-xs text-cream-300/75 leading-relaxed font-light">
          Connect directly with our advisory team to discuss talent acquisition, statutory compliance, or HR restructuring.
        </p>

        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-black text-xs tracking-widest uppercase px-5 py-3 rounded.lg transition-all duration-300 shadow-md w-full justify-center"
        >
          Book Advisory Session
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="p-4 rounded-xl bg-navy-900 border border-gold-500/15 space-y-1">
          <p className="text-[10px] font-bold tracking-widest uppercase text-gold-400">Headquarters</p>
          <p className="text-xs text-cream-100 font-semibold">Location — Chennai</p>
        </div>
      </div>

    </div>

    {/* Bottom Bar */}
    <div className="border-t border-white/10 py-6 bg-navy-950">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream-300/50">
        <p>© {new Date().getFullYear()} SM HR Nexus. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/about" className="hover:text-gold-400 transition-colors">Privacy & Terms</Link>
          <span className="w-1 h-1 rounded-full bg-gold-500/30" />
          <Link to="/contact" className="hover:text-gold-400 transition-colors">Support</Link>
          <span className="w-1 h-1 rounded-full bg-gold-500/30" />
          <span>Conceive · Create · Complete</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
