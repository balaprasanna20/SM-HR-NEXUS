/**
 * Simple form validation helpers for the corporate portal.
 */

export const validateEmail = (email) => {
  if (!email) return "Email address is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  
  // Optional warning for free personal domains (gmail, yahoo, outlook, etc.)
  const freeDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "aol.com"];
  const domain = email.split("@")[1]?.toLowerCase();
  if (freeDomains.includes(domain)) {
    // We can allow it but show a subtle recommendation for corporate email
    return { isCorporateWarning: true };
  }
  
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return "Phone number is required.";
  const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
  if (!phoneRegex.test(phone.trim())) {
    return "Please enter a valid phone number (10 to 15 digits).";
  }
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || !value.trim()) {
    return `${fieldName} is required.`;
  }
  return null;
};
