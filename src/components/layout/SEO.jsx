import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.smhrnexus.com';

const SEO = ({ title, description, schema }) => {
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

    // ── Canonical URL ──────────────────────────────────
    const canonicalUrl = `${SITE_URL}${location.pathname === '/' ? '' : location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // ── Meta Robots ────────────────────────────────────
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    // ── Open Graph (OG) + Twitter Meta Tags ────────────
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

    const defaultImg = `${SITE_URL}/logo-icon.png`;

    setMetaProperty('meta[property="og:title"]', formattedTitle);
    setMetaProperty('meta[property="og:description"]', metaDescription.content);
    setMetaProperty('meta[property="og:url"]', canonicalUrl);
    setMetaProperty('meta[property="og:image"]', defaultImg);
    setMetaProperty('meta[property="og:type"]', 'website');
    setMetaProperty('meta[property="og:site_name"]', 'SM HR Nexus');
    setMetaProperty('meta[property="og:locale"]', 'en_IN');

    setMetaProperty('meta[name="twitter:title"]', formattedTitle);
    setMetaProperty('meta[name="twitter:description"]', metaDescription.content);
    setMetaProperty('meta[name="twitter:image"]', defaultImg);
    setMetaProperty('meta[name="twitter:card"]', 'summary_large_image');

    // ── BreadcrumbList JSON-LD ──────────────────────────
    const breadcrumbId = 'seo-breadcrumb-ld';
    let breadcrumbScript = document.getElementById(breadcrumbId);
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = breadcrumbId;
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbItems = [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }
    ];
    if (pathSegments.length > 0) {
      const pageName = title ? title.split('|')[0].trim() : pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1);
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": pageName,
        "item": canonicalUrl
      });
    }
    breadcrumbScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    });

    // ── Page-specific JSON-LD Schema ───────────────────
    const pageSchemaId = 'seo-page-schema-ld';
    let pageSchemaScript = document.getElementById(pageSchemaId);
    if (schema) {
      if (!pageSchemaScript) {
        pageSchemaScript = document.createElement('script');
        pageSchemaScript.id = pageSchemaId;
        pageSchemaScript.type = 'application/ld+json';
        document.head.appendChild(pageSchemaScript);
      }
      pageSchemaScript.textContent = JSON.stringify(schema);
    } else if (pageSchemaScript) {
      pageSchemaScript.remove();
    }

    // ── Cleanup ────────────────────────────────────────
    return () => {
      // Schemas are cleaned up when new page loads via re-render
    };
  }, [title, description, location, schema]);

  return null;
};

export default SEO;
