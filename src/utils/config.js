/**
 * SM HR Nexus - Centralized Site Configuration & API Endpoints
 */

export const SITE_CONFIG = {
  name: 'SM HR Nexus',
  company: 'SM Group',
  contactEmail: 'info@smhrnexus.com',
  whatsappNumber: '916385099063',
  
  // Default API Endpoints & Keys
  web3FormsKey: import.meta.env.VITE_WEB3FORMS_KEY || '',
  googleScriptUrl: import.meta.env.VITE_GOOGLE_SCRIPT_URL || '',
  apiToken: import.meta.env.VITE_API_TOKEN || '',
  
  // File upload constraints
  maxFileSizeMB: 5,
  acceptedTypes: ['.pdf', '.doc', '.docx']
};
