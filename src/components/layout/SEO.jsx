import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description }) => {
  const location = useLocation();

  useEffect(() => {
    // Update Document Title
    const formattedTitle = title ? `${title} | SM HR Nexus` : "SM HR Nexus | Recruitment & HR Consulting Services";
    document.title = formattedTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || "SM HR Nexus is a multi-faceted corporate management consultancy providing end-to-end recruitment, executive search, psychometric testing, HR SOPs, and statutory compliance.";

    // Update Open Graph (OG) title, description, and image for WhatsApp/LinkedIn sharing
    const setMetaProperty = (selector, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attr, val] = selector.replace('meta[', '').replace(']', '').split('=');
        el.setAttribute(attr, val.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const currentUrl = `${window.location.origin}${location.pathname}`;
    const defaultImg = `${window.location.origin}/logo-icon.png`;

    setMetaProperty('meta[property="og:title"]', formattedTitle);
    setMetaProperty('meta[property="og:description"]', metaDescription.content);
    setMetaProperty('meta[property="og:url"]', currentUrl);
    setMetaProperty('meta[property="og:image"]', defaultImg);

    setMetaProperty('meta[name="twitter:title"]', formattedTitle);
    setMetaProperty('meta[name="twitter:description"]', metaDescription.content);
    setMetaProperty('meta[name="twitter:image"]', defaultImg);
  }, [title, description, location]);

  return null;
};

export default SEO;
