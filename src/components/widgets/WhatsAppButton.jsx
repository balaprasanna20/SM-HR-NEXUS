import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_CONFIG } from '../../utils/config';

const WhatsAppButton = () => {
  const phoneNumber = SITE_CONFIG.whatsappNumber;
  const message = encodeURIComponent("Hello SM Group, I visited your corporate website and would like to inquire about your advisory services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center p-3.5 rounded-xl bg-cream-50 border border-gold-500/35 text-gold-400 shadow-2xl hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-500 group overflow-hidden"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp className="w-5 h-5" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] group-hover:ml-2.5 transition-all duration-500 ease-out whitespace-nowrap text-xs font-bold tracking-widest uppercase">
        WhatsApp
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
