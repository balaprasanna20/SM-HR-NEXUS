import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiFileText, FiCheckCircle, FiAlertCircle, FiX, FiSend, FiLoader } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import MagneticButton from '../common/MagneticButton';
import { SITE_CONFIG } from '../../utils/config';

const ResumeUploadForm = ({ onClose, defaultRole = '' }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: defaultRole || '',
    experience: '',
    note: ''
  });

  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    if (!selectedFile) return;

    const fileExt = '.' + selectedFile.name.split('.').pop().toLowerCase();
    if (!SITE_CONFIG.acceptedTypes.includes(fileExt)) {
      setError(`Invalid file type. Only ${SITE_CONFIG.acceptedTypes.join(', ')} files are supported.`);
      return;
    }

    if (selectedFile.size > SITE_CONFIG.maxFileSizeMB * 1024 * 1024) {
      setError(`File size exceeds maximum limit of ${SITE_CONFIG.maxFileSizeMB}MB.`);
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('Please fill in all required contact fields.');
      return;
    }
    if (!file) {
      setError('Please upload your Resume (PDF or Word document).');
      return;
    }

    setError('');
    setIsSubmitting(true);
    setStatusMessage('Processing resume & sending email...');

    try {
      const appliedRole = formData.role.trim() || 'General Candidate';

      if (!SITE_CONFIG.googleScriptUrl) {
        throw new Error('Google Script endpoint is not configured.');
      }

      let fileBase64 = '';
      if (file) {
        fileBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = () => resolve('');
          reader.readAsDataURL(file);
        });
      }

      const googlePayload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: appliedRole,
        experience: formData.experience || 'N/A',
        note: formData.note || 'N/A',
        fileName: file ? file.name : '',
        fileMimeType: file ? (file.type || 'application/pdf') : 'application/pdf',
        fileBase64: fileBase64,
        type: 'resume',
        apiToken: SITE_CONFIG.apiToken
      };

      const res = await fetch(SITE_CONFIG.googleScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(googlePayload)
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      if (data.status === 'success') {
        setSubmitted(true);
      } else {
        throw new Error(data.message || 'Failed to submit application');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'An error occurred while processing your resume. Please try again.');
    } finally {
      setIsSubmitting(false);
      setStatusMessage('');
    }
  };

  const handleWhatsAppSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('Please fill in all required contact fields.');
      return;
    }
    const appliedRole = formData.role.trim() || 'General Candidate';
    const whatsappNumber = SITE_CONFIG.whatsappNumber;
    const text = `*SM HR Nexus — Candidate Application*\n\n*Name:* ${formData.fullName}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Role:* ${appliedRole}\n*Experience:* ${formData.experience || 'N/A'}${file ? `\n*Resume File:* ${file.name}` : ''}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  const resetForm = () => {
    setFile(null);
    setError('');
    setSubmitted(false);
    setStatusMessage('');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      role: defaultRole || '',
      experience: '',
      note: ''
    });
    if (onClose) onClose();
  };

  return (
    <div className="bg-navy-950 border border-gold-500/25 rounded-2xl p-5 sm:p-8 space-y-6 shadow-2xl relative">
      {/* Title */}
      <div className="flex justify-between items-start border-b border-cream-100/10 pb-4">
        <div>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-500">
            SM HR Nexus Careers
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-cream-50 mt-1 tracking-tight">
            Upload Your Resume / CV
          </h3>
          <p className="text-xs sm:text-sm text-cream-300/80 mt-1 font-light">
            Submit your profile directly to our recruitment team for current & upcoming opportunities.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-cream-100/10 hover:bg-gold-500 hover:text-navy-950 text-cream-200 transition-all flex items-center justify-center min-h-[44px] min-w-[44px]"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-10 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center mx-auto border border-gold-500/40">
              <FiCheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black text-cream-50">Resume Submitted!</h4>
            <p className="text-xs sm:text-sm text-cream-300/80 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-gold-400">{formData.fullName}</strong>. Our SM HR Nexus recruitment partners will review your profile for <span className="text-cream-100 font-medium">{formData.role || 'General Position'}</span>.
            </p>
            <div className="pt-4">
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-lg bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-md min-h-[44px]"
              >
                Upload Another Application
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="resume-fullName" className="block text-xs font-bold tracking-wider uppercase text-cream-200/90 mb-1.5">
                  Full Name *
                </label>
                <input
                  id="resume-fullName"
                  name="fullName"
                  aria-label="Full Name"
                  type="text"
                  required
                  placeholder="e.g. Anand Kumar"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-navy-900 border border-cream-100/15 rounded-lg px-4 py-3 text-xs sm:text-sm text-cream-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/40 focus:outline-none transition-all min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="resume-email" className="block text-xs font-bold tracking-wider uppercase text-cream-200/90 mb-1.5">
                  Email Address *
                </label>
                <input
                  id="resume-email"
                  name="email"
                  aria-label="Email Address"
                  type="email"
                  required
                  placeholder="anand@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-navy-900 border border-cream-100/15 rounded-lg px-4 py-3 text-xs sm:text-sm text-cream-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/40 focus:outline-none transition-all min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="resume-phone" className="block text-xs font-bold tracking-wider uppercase text-cream-200/90 mb-1.5">
                  Phone Number *
                </label>
                <input
                  id="resume-phone"
                  name="phone"
                  aria-label="Phone Number"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-navy-900 border border-cream-100/15 rounded-lg px-4 py-3 text-xs sm:text-sm text-cream-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/40 focus:outline-none transition-all min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="resume-experience" className="block text-xs font-bold tracking-wider uppercase text-cream-200/90 mb-1.5">
                  Total Experience
                </label>
                <input
                  id="resume-experience"
                  name="experience"
                  aria-label="Total Experience"
                  type="text"
                  placeholder="e.g. 4 Years"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full bg-navy-900 border border-cream-100/15 rounded-lg px-4 py-3 text-xs sm:text-sm text-cream-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/40 focus:outline-none transition-all min-h-[44px]"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="resume-role" className="block text-xs font-bold tracking-wider uppercase text-cream-200/90 mb-1.5">
                  Desired Position / Role
                </label>
                <input
                  id="resume-role"
                  name="role"
                  aria-label="Desired Position or Role"
                  type="text"
                  placeholder="e.g. Senior HR Manager, Talent Lead, General Application..."
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-navy-900 border border-cream-100/15 rounded-lg px-4 py-3 text-xs sm:text-sm text-cream-100 placeholder-cream-300/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/40 focus:outline-none transition-all min-h-[44px]"
                />
              </div>
            </div>

            {/* Drag and Drop Zone */}
            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-cream-200/80 mb-1.5">
                Resume File (PDF or Word) *
              </label>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? 'border-gold-500 bg-gold-500/10'
                    : file
                    ? 'border-gold-500/50 bg-navy-900'
                    : 'border-cream-100/15 hover:border-gold-500/30 bg-navy-900/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {file ? (
                  <div className="flex items-center justify-between gap-3 bg-navy-950 p-3 rounded-lg border border-gold-500/30 text-left">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-gold-500/15 text-gold-400 flex items-center justify-center shrink-0">
                        <FiFileText className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-cream-100 truncate">{file.name}</p>
                        <p className="text-[10px] text-cream-300/50 font-light">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="p-1 rounded-md text-cream-300/60 hover:text-red-400 hover:bg-white/5 transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 py-2">
                    <div className="w-12 h-12 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center mx-auto border border-gold-500/20">
                      <FiUploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-semibold text-cream-100">
                      Drag & Drop your Resume here or <span className="text-gold-400 underline">Browse File</span>
                    </p>
                    <p className="text-[10px] text-cream-300/50">
                      Supports PDF, DOC, DOCX up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Progress Status Indicator */}
            {isSubmitting && statusMessage && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs">
                <FiLoader className="w-4 h-4 animate-spin shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Error Message Alert */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <FiAlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-lg shadow-lg transition-colors cursor-pointer min-h-[44px] disabled:opacity-50"
              >
                <FaWhatsapp className="w-4 h-4 text-white" />
                <span>Apply via WhatsApp</span>
              </button>
              <MagneticButton
                as="button"
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto relative overflow-hidden group inline-flex items-center justify-center gap-2 bg-gold-500 text-navy-950 font-bold text-xs tracking-widest uppercase px-7 py-3.5 rounded-lg shadow-lg hover:bg-gold-400 transition-colors disabled:opacity-50 cursor-pointer min-h-[44px]"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Uploading Profile...' : 'Submit via Email'}
                </span>
                <FiSend className={`relative z-10 w-4 h-4 transition-transform ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
              </MagneticButton>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeUploadForm;
