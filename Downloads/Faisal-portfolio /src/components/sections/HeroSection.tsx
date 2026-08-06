import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import avatarHero from '@/assets/avatar-hero.webp';
import avatarDesk from '@/assets/avatar-desk.webp';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Morph: standing hero → sitting desk pose
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 0.6, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.4], [0, 6]);

  const deskOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.7], [0, 1, 0.85]);
  const deskScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.75, 1, 1.05]);
  const deskY = useTransform(scrollYProgress, [0.2, 0.6], [40, -20]);
  const deskRotate = useTransform(scrollYProgress, [0.2, 0.6], [-6, 0]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.4], [0, 100]);
  const overlayOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 0.85]);

  const particle1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const particle2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const particle3Y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const heroFilter = useTransform(heroBlur, (b) => `blur(${b}px)`);

  return (
    <section ref={ref} className="relative min-h-screen md:min-h-[130vh] flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-full bg-accent/15 blur-[80px]" />

      <motion.div style={{ y: particle1Y }} className="hidden sm:block absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-primary/50 blur-[1px]" />
      <motion.div style={{ y: particle2Y }} className="hidden sm:block absolute top-[30%] right-[20%] w-3 h-3 rounded-full bg-accent/40 blur-[1px]" />
      <motion.div style={{ y: particle3Y }} className="hidden sm:block absolute top-[60%] left-[30%] w-1.5 h-1.5 rounded-full bg-primary/60 blur-[1px]" />
      <motion.div style={{ y: particle1Y }} className="hidden sm:block absolute top-[50%] right-[35%] w-2 h-2 rounded-full bg-accent/50 blur-[1px]" />
      <motion.div style={{ y: particle2Y }} className="hidden sm:block absolute top-[70%] left-[60%] w-1 h-1 rounded-full bg-primary/70" />

      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(hsl(200 95% 60% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(200 95% 60% / 0.4) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Avatar morph stack */}
      <div className="relative z-10 w-[200px] sm:w-[280px] md:w-[420px] h-[260px] sm:h-[360px] md:h-[520px] flex items-center justify-center">
        {/* Hero standing */}
        <motion.img
          initial={{ opacity: 0, scale: 0.6, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.3, type: 'spring' }}
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY, filter: heroFilter }}
          src={avatarHero}
          alt="Faisal Imran Avatar"
          className="absolute w-full h-auto drop-shadow-[0_0_60px_hsl(200_95%_60%_/_0.35)] select-none pointer-events-none"
          draggable={false}
        />
        {/* Sitting desk pose */}
        <motion.img
          style={{ opacity: deskOpacity, scale: deskScale, y: deskY, rotate: deskRotate }}
          src={avatarDesk}
          alt="Faisal Imran working at desk"
          className="absolute w-full h-auto drop-shadow-[0_0_80px_hsl(200_95%_60%_/_0.5)] select-none pointer-events-none"
          draggable={false}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[140px] md:w-[240px] h-[24px] md:h-[36px] rounded-full bg-primary/40 blur-xl"
        />
      </div>

      {/* Hero text */}
      <motion.div
        style={{ opacity: textOpacity, x: textX }}
        className="absolute right-4 sm:right-8 md:right-20 top-1/2 -translate-y-1/2 z-20 text-right"
      >
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xs sm:text-sm text-muted-foreground mb-2"
        >
          I ship AI products. Fast.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none"
        >
          <span className="text-foreground">FAISAL</span>
          <br />
          <span className="gradient-text-purple">IMRAN</span>
        </motion.h1>
      </motion.div>

      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        href="/Faisal_Imran_Resume.pdf"
        download="Faisal_Imran_Resume.pdf"
        className="absolute bottom-20 md:bottom-8 right-4 sm:right-8 md:right-12 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors z-20"
      >
        Resume ↓
      </motion.a>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-background z-30 pointer-events-none"
      />
    </section>
  );
};

export default HeroSection;
