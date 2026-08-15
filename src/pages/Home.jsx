import SEO from '../components/layout/SEO';
import Hero from '../components/home/Hero';
import VisionMissionValuesSection from '../components/home/VisionMissionValuesSection';
import ServicesSection from '../components/home/ServicesSection';
import ExpertiseSection from '../components/home/ExpertiseSection';
import ClientsSection from '../components/home/ClientsSection';
import CTASection from '../components/home/CTASection';

const Home = () => (
  <>
    <SEO
      title="Home | Recruitment & HR Consulting"
      description="SM HR Nexus is a premier corporate management consultancy delivering end-to-end recruitment, executive search, psychometric testing, HR SOPs, and statutory compliance."
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
