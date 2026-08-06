import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    year: "2023",
    role: "BS Computer Science",
    company: "FAST NUCES, Faisalabad",
    description: "Started CS degree — data structures, algorithms, databases, and software engineering. Shipped personal projects alongside coursework from day one.",
  },
  {
    year: "2025",
    role: "Personal Projects",
    company: "Solace · Muslimeen · Elucid",
    description: "Built and shipped 3 full AI products independently — full-stack web and cross-platform mobile, all using Groq API and Supabase. Each one live and in production.",
  },
  {
    year: "NOW",
    role: "Frontend AI Engineering Intern",
    company: "FlyRank AI",
    description: "Building AI-powered frontend features at FlyRank. LLM integrations, production React/TypeScript components, and real interfaces shipped to customers.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.section ref={ref} className="scroll-section py-20 md:py-32" style={{ y: sectionY, opacity: sectionOpacity }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif italic tracking-tight">
            My journey &
            <br />
            <span className="gradient-text-purple not-italic font-display font-bold">experience</span>
          </h2>
        </motion.div>

        {/* Timeline — stacks vertically on mobile */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line — hidden on mobile, left-aligned line instead */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent origin-top"
          />

          {/* Glowing orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"
            style={{ boxShadow: '0 0 20px hsl(80 45% 42% / 0.6)' }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.25 }}
              className="relative mb-12 md:mb-16"
            >
              {/* Mobile layout */}
              <div className="md:hidden pl-10">
                <span className={`font-bold text-lg mb-2 block ${exp.year === 'NOW' ? 'text-primary text-glow-purple' : 'text-foreground'}`}>
                  {exp.year}
                </span>
                <p className="font-bold text-sm">{exp.role}</p>
                <p className="text-xs text-muted-foreground mb-1">{exp.company}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>

              {/* Desktop layout */}
              <div className="hidden md:grid grid-cols-[1fr_60px_1fr] gap-4">
                <div className="text-right pr-4">
                  {i % 2 === 0 ? (
                    <>
                      <p className="font-bold text-sm">{exp.role}</p>
                      <p className="text-xs text-muted-foreground">{exp.company}</p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className={`font-bold text-lg ${exp.year === 'NOW' ? 'text-primary text-glow-purple' : 'text-foreground'}`}>
                    {exp.year}
                  </span>
                </div>
                <div className="pl-4">
                  {i % 2 !== 0 ? (
                    <>
                      <p className="font-bold text-sm">{exp.role}</p>
                      <p className="text-xs text-muted-foreground">{exp.company}</p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ExperienceSection;
