
const socialData = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/sm-hr-nexus/',
    ariaLabel: 'SM HR Nexus on LinkedIn',
    hoverBg: 'bg-[#0077B5]',
    hoverBorder: 'hover:border-[#0077B5] focus-visible:border-[#0077B5]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] relative z-10 transition-all duration-[450ms] cubic-bezier(0.25, 0.8, 0.25, 1) group-hover:text-white group-hover:-translate-y-[2px] group-focus-visible:text-white group-focus-visible:-translate-y-[2px]">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/sm_hr_nexus',
    ariaLabel: 'SM HR Nexus on Instagram',
    hoverBg: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
    hoverBorder: 'hover:border-[#ee2a7b] focus-visible:border-[#ee2a7b]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] relative z-10 transition-all duration-[450ms] cubic-bezier(0.25, 0.8, 0.25, 1) group-hover:text-white group-hover:-translate-y-[2px] group-focus-visible:text-white group-focus-visible:-translate-y-[2px]">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  }
];

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-[14px]">
      {socialData.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          className={`relative w-12 h-12 rounded-full border border-[#c9a96e]/35 flex items-center justify-center overflow-hidden transition-colors duration-[450ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] ${social.hoverBorder} focus-visible:outline-none group`}
        >
          {/* Brand color fill slides up from bottom */}
          <div className={`absolute inset-0 ${social.hoverBg} translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] rounded-full -z-0`} />
          
          {/* Icon */}
          <span className="text-[#f5f2ea]/75 transition-colors duration-[450ms] group-hover:text-white z-10 flex items-center justify-center">
            {social.icon}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
