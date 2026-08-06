import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/sections/HeroSection';
import WhatIDoSection from '@/components/sections/WhatIDoSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import WorkSection from '@/components/sections/WorkSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ContactSection from '@/components/sections/ContactSection';

// three.js + drei and gsap are the two heaviest dependencies here, and neither
// paints anything until the loading screen has finished. Splitting them out
// keeps them off the critical path; they are warmed in the background below so
// they are parsed and ready the moment `loaded` flips.
const Scene3D = lazy(() => import('@/components/three/Scene3D'));
const ScrollStory = lazy(() => import('@/components/ScrollStory'));

const DESKTOP_QUERY = '(min-width: 768px)';

/**
 * Mirrors the >=768px gate the 3D scene already applied internally. Hoisting it
 * here means the three.js chunk is never even requested on mobile.
 */
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    onChange();
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
};

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const isDesktop = useIsDesktop();

  // Warm the split chunks while the loading screen is still on screen, so the
  // overlays appear at exactly the same moment they always did.
  useEffect(() => {
    import('@/components/ScrollStory');
    if (isDesktop) import('@/components/three/Scene3D');
  }, [isDesktop]);

  return (
    <div className="relative text-foreground overflow-x-hidden">
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Fixed 3D background canvas */}
      {loaded && isDesktop && (
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      )}

      {/* GSAP scroll storytelling overlay (progress bar + chapter labels) */}
      {loaded && (
        <Suspense fallback={null}>
          <ScrollStory />
        </Suspense>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10"
      >
        <Navbar />
        <SocialSidebar />

        <HeroSection />
        <WhatIDoSection />
        <ExperienceSection />
        <WorkSection />
        <TechStackSection />
        <ContactSection />
      </motion.div>
    </div>
  );
};

export default Index;
