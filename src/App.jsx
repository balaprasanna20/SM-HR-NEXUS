import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CursorGlow from './components/widgets/CursorGlow';
import ScrollToTop from './components/layout/ScrollToTop';
import Loader from './components/common/Loader';
import WhatsAppButton from './components/widgets/WhatsAppButton';
import FloatingActionBar from './components/widgets/FloatingActionBar';

// Direct import for Home (immediate first paint)
import Home from './pages/Home';

// Lazy-loaded routes for code-splitting
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const ApplyNow = lazy(() => import('./pages/ApplyNow'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Minimal Suspense Fallback Spinner
const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-navy-950 text-cream-50">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-bold tracking-widest uppercase text-gold-400">Loading...</span>
    </div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(() => {
    const hasLoaded = sessionStorage.getItem('sm_has_loaded');
    return hasLoaded ? false : true;
  });

  const handleFinishLoading = () => {
    sessionStorage.setItem('sm_has_loaded', 'true');
    setLoading(false);
  };

  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-gold-500 text-navy-950 px-4 py-2 font-bold text-xs rounded shadow-lg"
      >
        Skip to main content
      </a>

      <AnimatePresence>
        {loading && <Loader finishLoading={handleFinishLoading} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen bg-cream-50 overflow-hidden">
          <CursorGlow />
          <Navbar />
          
          <main id="main-content">
            <Suspense fallback={<PageFallback />}>
              <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/apply" element={<ApplyNow />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>

          <Footer />
          <FloatingActionBar />
          <WhatsAppButton />
        </div>
      )}
    </>
  );
};

const App = () => (
  <Router>
    <ScrollToTop />
    <AppRoutes />
  </Router>
);

export default App;
