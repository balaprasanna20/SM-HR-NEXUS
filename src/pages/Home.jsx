import SEO from '../components/layout/SEO';
import Hero from '../components/home/Hero';
import VisionMissionValuesSection from '../components/home/VisionMissionValuesSection';
import ServicesSection from '../components/home/ServicesSection';
import ExpertiseSection from '../components/home/ExpertiseSection';
import ClientsSection from '../components/home/ClientsSection';
import CTASection from '../components/home/CTASection';

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "SM HR Nexus | Recruitment & HR Consulting",
  "description": "SM HR Nexus is a premier corporate management consultancy delivering end-to-end recruitment, executive search, psychometric testing, HR SOPs, and statutory compliance.",
  "url": "https://www.smhrnexus.com",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "SM HR Nexus",
    "description": "Premier multi-faceted corporate HR advisory and executive search consultancy in Chennai, India. Six specialized practice areas covering recruitment, HR SOPs, psychometric testing, background checks, statutory compliance, and educational consultancy.",
    "url": "https://www.smhrnexus.com",
    "logo": "https://www.smhrnexus.com/logo-icon.png",
    "image": "https://www.smhrnexus.com/logo-icon.png",
    "telephone": "+916385099063",
    "email": "info@smhrnexus.com",
    "priceRange": "$$",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Bank Transfer, UPI",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3/2 Second Street, Raghava Reddy Colony, Ashok Nagar",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600083",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "13.0382",
      "longitude": "80.2115"
    },
    "areaServed": [
      { "@type": "Country", "name": "India" },
      { "@type": "City", "name": "Chennai" },
      { "@type": "City", "name": "Singapore" },
      { "@type": "GeoShape", "name": "Middle East" }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/sm-hr-nexus",
      "https://www.instagram.com/smhrnexus"
    ],
    "foundingDate": "2011",
    "founder": {
      "@type": "Person",
      "name": "SM HR Nexus Partners"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "HR Consulting Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "End-to-End Recruitment & Executive Search" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HR SOPs & Corporate Consulting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Psychometric Testing & L&D" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Investigative Background Inquiries" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Statutory Compliance & Payroll" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Educational Consultancy Services" } }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "45",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
};

const Home = () => (
  <>
    <SEO
      title="Home | Recruitment & HR Consulting"
      description="SM HR Nexus is a premier corporate management consultancy delivering end-to-end recruitment, executive search, psychometric testing, HR SOPs, and statutory compliance."
      schema={homeSchema}
    />
    <Hero />
    <VisionMissionValuesSection />
    <ServicesSection />
    <ExpertiseSection />
    <ClientsSection />
    <CTASection />
  </>
);

export default Home;
