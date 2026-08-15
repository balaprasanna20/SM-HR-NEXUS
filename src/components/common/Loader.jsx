import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ finishLoading }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Show drawing for 2.2 seconds, then initiate curtain split exit
    const timeout = setTimeout(() => {
      setShow(false);
    }, 2200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence onExitComplete={finishLoading}>
      {show && (
        <motion.div className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-none">
          
          {/* Left Curtain Panel sliding out */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-cream-50 border-r border-gold-500/10"
            initial={{ x: 0 }}
            exit={{ 
              x: '-100%',
              transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] } 
            }}
          />

          {/* Right Curtain Panel sliding out */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-cream-50 border-l border-gold-500/10"
            initial={{ x: 0 }}
            exit={{ 
              x: '100%',
              transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] } 
            }}
          />

          {/* Center Brand & SVG Line Drawing */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="flex flex-col items-center space-y-7">
              
              {/* Dynamic SVG logo stroke drawing */}
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_15px_rgba(201,168,76,0.3)]">
                {/* 1. Orbit Golden Ring slanted around the initials */}
                <motion.path
                  d="M 15,62 C 10,50 90,10 85,38 C 80,66 20,80 15,62"
                  stroke="#C9A84C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 1.8, 
                    ease: [0.43, 0.13, 0.23, 0.96] 
                  }}
                />

                {/* 2. Stylized letter 'S' */}
                <motion.path
                  d="M 28,36 C 28,26 44,26 44,34 C 44,43 28,42 28,50 C 28,58 44,58 44,48"
                  stroke="#C9A84C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 1.6, 
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: 0.2
                  }}
                />

                {/* 3. Stylized letter 'M' */}
                <motion.path
                  d="M 52,58 L 52,32 L 64,48 L 76,32 L 76,58"
                  stroke="#C9A84C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 1.6, 
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: 0.4
                  }}
                />
              </svg>

              {/* Company Text fading in as drawing completes */}
              <motion.div
                className="text-center space-y-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  y: -10,
                  transition: { duration: 0.4, ease: 'easeIn' }
                }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 1.2 }}
              >
                <h1 className="text-sm font-black tracking-[0.35em] uppercase text-navy-900">
                  SM GROUP
                </h1>
                <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-gold-500/80">
                  Conceive · Create · Complete
                </p>
              </motion.div>

            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
