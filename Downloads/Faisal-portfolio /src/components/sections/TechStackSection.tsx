import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const techItems = [
  { name: 'React Native',  color: 'hsl(195, 85%, 60%)' },
  { name: 'React.js',      color: 'hsl(195, 85%, 55%)' },
  { name: 'Groq API',      color: 'hsl(260, 70%, 65%)' },
  { name: 'Supabase',      color: 'hsl(150, 55%, 48%)' },
  { name: 'Expo SDK 54',   color: 'hsl(220, 60%, 60%)' },
  { name: 'JavaScript',    color: 'hsl(50, 90%, 55%)' },
  { name: 'TypeScript',    color: 'hsl(210, 80%, 60%)' },
  { name: 'Next.js',       color: 'hsl(0, 0%, 82%)' },
  { name: 'Tailwind CSS',  color: 'hsl(190, 85%, 52%)' },
  { name: 'FastAPI',       color: 'hsl(160, 60%, 48%)' },
  { name: 'PostgreSQL',    color: 'hsl(210, 65%, 55%)' },
  { name: 'Expo Router',   color: 'hsl(220, 55%, 58%)' },
  { name: 'DevOps',        color: 'hsl(0, 0%, 65%)' },
  { name: 'Docker',        color: 'hsl(200, 75%, 55%)' },
  { name: 'CI/CD',         color: 'hsl(175, 60%, 50%)' },
];

const TechStackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-150px' });
  const [size, setSize] = useState(560);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 480) setSize(300);
      else if (w < 768) setSize(400);
      else if (w < 1024) setSize(500);
      else setSize(620);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const radius = size / 2 - (size < 400 ? 36 : 52);
  const bubble = size < 400 ? 60 : size < 600 ? 72 : 88;

  return (
    <section ref={sectionRef} className="scroll-section py-20 md:py-32 overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight uppercase">
            My <span className="gradient-text-purple">Techstack</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 font-mono tracking-widest uppercase">
            Orbiting continuously · Hover to pause
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="mx-auto flex items-center justify-center"
          style={{ width: size, height: size, maxWidth: '100%' }}
        >
          <div
            className="tech-orbit relative"
            style={{ width: size, height: size }}
          >
            {/* Faint guide ring */}
            <div
              className="absolute rounded-full border border-primary/15"
              style={{
                width: radius * 2,
                height: radius * 2,
                left: size / 2 - radius,
                top: size / 2 - radius,
              }}
            />

            {techItems.map((tech, i) => {
              const angle = (i / techItems.length) * 360;
              return (
                <div
                  key={tech.name}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                  }}
                >
                  {/* Counter-rotate wrapper: negates orbit rotation + individual angle so icon stays upright */}
                  <div className="tech-orbit-counter">
                    <div
                      style={{ transform: `rotate(-${angle}deg)` }}
                    >
                      <div
                        className="flex items-center justify-center rounded-full border border-white/15 font-bold text-[10px] sm:text-xs md:text-sm text-center select-none"
                        style={{
                          width: bubble,
                          height: bubble,
                          background: `radial-gradient(circle at 30% 28%, ${tech.color}ee, ${tech.color}77 55%, ${tech.color}22)`,
                          boxShadow: `0 0 24px ${tech.color}66, inset 0 -8px 16px rgba(0,0,0,0.35)`,
                          color: '#fff',
                          textShadow: `0 0 8px ${tech.color}, 0 1px 2px rgba(0,0,0,0.7)`,
                          padding: '0 6px',
                          lineHeight: 1.1,
                        }}
                      >
                        {tech.name}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes tech-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes tech-spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .tech-orbit { animation: tech-spin 28s linear infinite; }
        .tech-orbit:hover { animation-play-state: paused; }
        .tech-orbit-counter { animation: tech-spin-rev 28s linear infinite; }
        .tech-orbit:hover .tech-orbit-counter { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

export default TechStackSection;
