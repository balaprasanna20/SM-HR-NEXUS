import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSend, FiCheck, FiChevronDown } from 'react-icons/fi';
import SocialLinks from '../components/widgets/SocialLinks';
import SEO from '../components/layout/SEO';
import PageTransition from '../components/layout/PageTransition';
import MagneticButton from '../components/common/MagneticButton';
import WordReveal from '../components/widgets/WordReveal';
import { SITE_CONFIG } from '../utils/config';

const contactPoints = [
  { icon: FiMapPin, label: 'Headquarters', value: '3/2 Second Street, Raghava Reddy Colony, Ashok Nagar, Chennai 600083' },
  { icon: FiPhone, label: 'Phone & Office', value: '+91 6385 099 063 (Location — Chennai)' },
  { icon: FiMail, label: 'Enquiries', value: SITE_CONFIG.contactEmail },
];

const INITIAL = { name: '', company: '', email: '', phone: '', service: '', message: '', website: '' };

const Contact = () => {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (form.phone.trim() && !form.phone.match(/^\+?[0-9\s-]{10,15}$/)) {
      e.phone = 'Valid phone required (10-15 digits)';
    }
    if (!form.message.trim()) {
      e.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters';
    } else if (form.message.length > 1000) {
      e.message = 'Message cannot exceed 1000 characters';
    }
    return e;
  };

  const handleSubmit = (type = 'whatsapp') => async (e) => {
    if (e) e.preventDefault();

    // Security: Honeypot check for spam bot prevention
    if (form.website) {
      console.warn('Bot detected via honeypot');
      setSent('email');
      return;
    }

    // Security: Rate limiting check (min 15s between submissions)
    const lastSubmit = localStorage.getItem('sm_form_last_submit');
    const now = Date.now();
    if (lastSubmit && now - parseInt(lastSubmit, 10) < 15000) {
      setErrors({ form: 'Please wait a few seconds before submitting again.' });
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (type === 'email') {
      setSubmitting(true);
      let success = false;

      try {
        if (!SITE_CONFIG.googleScriptUrl) {
          throw new Error('Google Script URL is not configured.');
        }

        const payload = {
          ...form,
          type: 'contact',
          apiToken: SITE_CONFIG.apiToken
        };

        const res = await fetch(SITE_CONFIG.googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          if (data.status === 'success') {
            success = true;
          } else {
            console.warn('Google Script response error:', data.message);
          }
        }

        if (success) {
          localStorage.setItem('sm_form_last_submit', String(now));
          setSent('email');
          setForm(INITIAL);
        } else {
          setErrors({ form: 'Failed to send enquiry. Please try WhatsApp or try again.' });
        }
      } catch (err) {
        console.warn('Email dispatch error:', err);
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      } finally {
        setSubmitting(false);
      }
    } else {
      const whatsappNumber = SITE_CONFIG.whatsappNumber;
      const text = `*SM HR Nexus Enquiry*\n\n*Name:* ${form.name}\n*Company:* ${form.company || '—'}\n*Email:* ${form.email}\n*Phone:* ${form.phone || '—'}\n*Service:* ${form.service || '—'}\n*Message:* ${form.message}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
      localStorage.setItem('sm_form_last_submit', String(now));
      setSent('whatsapp');
      setForm(INITIAL);
    }
  };

  const set = (k) => (e) => { setForm(f => ({ ...f, [k]: e.target.value })); setErrors(e2 => ({ ...e2, [k]: undefined })); };

  const fieldCls = (key) =>
    `w-full bg-navy-950/60 border ${errors[key] ? 'border-red-500/50' : 'border-white/10'} hover:border-white/20 focus:border-gold-500/60 text-cream-100 placeholder-cream-300/30 rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-colors duration-300`;

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "name": "Contact SM HR Nexus",
      "description": "Contact SM HR Nexus' recruitment & consulting team to book a consultation.",
      "url": "https://www.smhrnexus.com/contact",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "SM HR Nexus",
        "telephone": "+916385099063",
        "email": "info@smhrnexus.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3/2 Second Street, Raghava Reddy Colony, Ashok Nagar",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600083",
          "addressCountry": "IN"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How can I contact SM HR Nexus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can contact SM HR Nexus via WhatsApp at +91 6385 099 063, email at info@smhrnexus.com, or by visiting the office at 3/2 Second Street, Raghava Reddy Colony, Ashok Nagar, Chennai 600083."
          }
        },
        {
          "@type": "Question",
          "name": "What are SM HR Nexus' office hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SM HR Nexus partners are available Monday to Saturday, 9:00 AM to 7:00 PM IST."
          }
        },
        {
          "@type": "Question",
          "name": "How do I book a consultation with SM HR Nexus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can book a consultation by filling out the contact form on the Contact page. You can send your enquiry via WhatsApp or email — both go directly to the partner's line. A senior partner will review your enquiry and respond within 24 hours."
          }
        }
      ]
    }
  ]
};

  return (
    <PageTransition>
      <SEO title="Contact | Book a Consultation" description="Contact SM HR Nexus' recruitment & consulting team to book a consultation, discuss a mandate, or enquire about any of our six specialized practice clusters." schema={contactSchema} />

      {/* Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-5 md:space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-gold-500" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-500">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-cream-50 tracking-tight leading-tight flex flex-col items-start gap-1">
            <WordReveal text="Start a" />
            <WordReveal text="Conversation" className="text-gradient-gold" delay={0.25} />
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8 md:space-y-10">
            <motion.div className="space-y-6 md:space-y-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-cream-100">Office Details</h2>
                <p className="text-xs md:text-sm text-cream-300/60 mt-1.5 leading-relaxed font-light">Our partners are available Monday–Saturday, 9:00 AM – 7:00 PM IST.</p>
              </div>
              <div className="space-y-4 md:space-y-6">
                {contactPoints.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold-600 mb-0.5">{label}</h3>
                      <p className="text-xs md:text-sm text-cream-100/90 font-medium leading-relaxed">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold-600 mb-3">Connect With Us</p>
                <SocialLinks />
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div className="lg:col-span-3 bg-navy-950/80 border border-gold-500/20 rounded-2xl p-6 sm:p-10 shadow-2xl relative"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
            {sent ? (
              <motion.div className="py-12 text-center space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 mx-auto">
                  <FiCheck className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-cream-100">Message Received</h3>
                <p className="text-xs md:text-sm text-cream-300/70 max-w-sm mx-auto leading-relaxed font-light">
                  Thank you for reaching out. One of our senior partners will review your enquiry and get back to you within 24 hours.
                </p>
                <button onClick={() => setSent(false)} className="text-xs font-bold tracking-widest uppercase text-gold-500 hover:text-gold-400 pt-2 transition-colors">
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                {/* Honeypot field - hidden from humans, catches automated spam bots */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    value={form.website}
                    onChange={set('website')}
                    autoComplete="off"
                  />
                </div>

                {errors.form && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                    {errors.form}
                  </div>
                )}

                <div>
                  <h3 className="text-xl md:text-2xl font-black text-cream-100">Book a Consultation</h3>
                  <p className="text-xs text-cream-300/60 mt-1 font-light">Fill in your details to connect directly with our advisory team.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-[9px] font-bold tracking-[0.3em] uppercase text-cream-300/60">Full Name *</label>
                    <input id="contact-name" name="name" aria-label="Full Name" type="text" placeholder="Rajesh Sharma" value={form.name} onChange={set('name')} className={fieldCls('name')} />
                    {errors.name && <p className="text-[9px] text-red-400">{errors.name}</p>}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-company" className="text-[9px] font-bold tracking-[0.3em] uppercase text-cream-300/60">Company</label>
                    <input id="contact-company" name="company" aria-label="Company" type="text" placeholder="Apex Enterprises" value={form.company} onChange={set('company')} className={fieldCls('company')} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="text-[9px] font-bold tracking-[0.3em] uppercase text-cream-300/60">Email *</label>
                    <input id="contact-email" name="email" aria-label="Email Address" type="email" placeholder="rajesh@apex.com" value={form.email} onChange={set('email')} className={fieldCls('email')} />
                    {errors.email && <p className="text-[9px] text-red-400">{errors.email}</p>}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className="text-[9px] font-bold tracking-[0.3em] uppercase text-cream-300/60">Phone</label>
                    <input id="contact-phone" name="phone" aria-label="Phone Number" type="tel" placeholder="+91 99000 00000" value={form.phone} onChange={set('phone')} className={fieldCls('phone')} />
                    {errors.phone && <p className="text-[9px] text-red-400">{errors.phone}</p>}
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-service" className="text-[9px] font-bold tracking-[0.3em] uppercase text-cream-300/60">Service of Interest</label>
                  <div className="relative">
                    <select id="contact-service" name="service" aria-label="Service of Interest" value={form.service} onChange={set('service')} className={`${fieldCls('service')} appearance-none cursor-pointer pr-10`}>
                      <option value="">— Select a practice area —</option>
                      <option>End-to-End Recruitment — SM HR Nexus</option>
                      <option>HR SOPs & Corporate Consulting</option>
                      <option>Psychometric Testing & L&D</option>
                      <option>Investigative Background Inquiries</option>
                      <option>Statutory Compliance & Payroll</option>
                      <option>Educational Consultancy Services</option>
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-300/50" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-[9px] font-bold tracking-[0.3em] uppercase text-cream-300/60">Message *</label>
                  <textarea id="contact-message" name="message" aria-label="Message" placeholder="Describe your mandate, timeline, and any specific requirements..." rows={4} value={form.message} onChange={set('message')} className={`${fieldCls('message')} resize-none`} />
                  {errors.message && <p className="text-[9px] text-red-400">{errors.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <MagneticButton
                    type="button"
                    onClick={handleSubmit('whatsapp')}
                    className="w-full relative overflow-hidden group inline-flex items-center justify-center gap-2 bg-gold-500 text-cream-50 font-bold text-xs tracking-[0.15em] uppercase py-3.5 rounded-lg shadow-lg cursor-pointer"
                    strength={0.15}
                  >
                    <span className="relative z-10">Send via WhatsApp</span>
                    <FiSend className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    <span className="absolute inset-0 bg-gold-300 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />
                  </MagneticButton>

                  <MagneticButton
                    type="button"
                    onClick={handleSubmit('email')}
                    disabled={submitting}
                    className="w-full relative overflow-hidden group inline-flex items-center justify-center gap-2 bg-navy-950/80 border border-gold-500/40 hover:border-gold-500 text-cream-100 hover:text-gold-400 font-bold text-xs tracking-[0.15em] uppercase py-3.5 rounded-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
                    strength={0.15}
                  >
                    <span className="relative z-10">{submitting ? 'Sending Email...' : 'Send via Email'}</span>
                    <FiMail className={`relative z-10 w-4 h-4 text-gold-400 ${submitting ? 'animate-pulse' : 'transition-transform group-hover:translate-x-1'}`} />
                    <span className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </MagneticButton>
                </div>
                <p className="text-[9px] text-center text-cream-300/40 font-light pt-1">
                  Send your enquiry via WhatsApp or email — both go directly to our partner's line.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

    </PageTransition>
  );
};

export default Contact;
