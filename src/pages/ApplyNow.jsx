import SEO from '../components/layout/SEO';
import PageTransition from '../components/layout/PageTransition';
import ResumeUploadForm from '../components/widgets/ResumeUploadForm';
import WordReveal from '../components/widgets/WordReveal';

const ApplyNow = () => (
  <PageTransition>
    <SEO 
      title="Apply Now | Upload Your Resume & CV" 
      description="Submit your profile directly to SM HR Nexus recruitment team for current and upcoming corporate opportunities." 
    />

    {/* Header */}
    <section className="relative pt-32 pb-10 md:pt-40 md:pb-12 bg-navy-950 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-gold-500" />
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-gold-500">Quick Application</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-cream-50 tracking-tight leading-tight">
          <WordReveal text="Submit Your Profile" />
        </h1>
      </div>
    </section>

    {/* Resume Upload Form Section */}
    <section className="py-10 md:py-16 bg-navy-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ResumeUploadForm />
      </div>
    </section>
  </PageTransition>
);

export default ApplyNow;
