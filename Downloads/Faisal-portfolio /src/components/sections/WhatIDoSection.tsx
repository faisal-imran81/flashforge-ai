import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Server, Database, LineChart, Users } from 'lucide-react';
import avatarDesk from '@/assets/avatar-desk.webp';

const WhatIDoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll-driven section reveal
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const cards = [
    {
      icon: Code2,
title: "FULL STACK DEV",
description: "Building end-to-end products  from React Native mobile apps to Next.js web platforms, FastAPI backends, and PostgreSQL databases. I own the full stack and ship complete systems.",
tags: ["React Native", "Next.js", "FastAPI", "PostgreSQL", "Supabase"],
    },
    {
      icon: Brain,
      title: "AI INTEGRATION",
      description: "Wiring LLM APIs into real product workflows — Gemini API, RAG pipelines, and AI-powered features that ship to production, not just notebooks.",
      tags: ["Gemini API","Groq API", "LLM Integration", "RAG", "Python"],
    },
    {
      icon: Server,
      title: "BACKEND & APIS",
      description: "Building REST APIs with Node.js and Express, authentication flows, and third-party integrations. PostgreSQL and MongoDB for data, Supabase for speed.",
      tags: ["Node.js", "Express", "REST APIs", "Supabase"],
    },
    {
      icon: Database,
      title: "DATABASES",
      description: "Relational and document schema design, query optimisation, and working with PostgreSQL, MongoDB, and MySQL across multiple shipped projects.",
      tags: ["PostgreSQL", "MongoDB", "MySQL", "Query Tuning"],
    },
    {
      icon: LineChart,
      title: "DEVOPS (LEARNING)",
      description: "Actively building DevOps skills — Docker, CI/CD pipelines, GitHub Actions, and deployment workflows. This is where I am heading next.",
      tags: ["Docker", "CI/CD", "GitHub Actions", "Vercel"],
    },
    {
      icon: Users,
      title: "SHIPPING FAST",
      description: "3 days to MVP is my standard. I care about getting working software in front of users quickly, then iterating — not over-engineering before launch.",
      tags: ["MVP mindset", "Agile", "Side Projects", "Iteration"],
    },
  ];

  return (
    <motion.section
      ref={ref}
      id="about"
      className="scroll-section py-20 md:py-32"
      style={{ y: sectionY, opacity: sectionOpacity }}
    >
      <div className="section-container">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-none">
            WHAT
            <br />
            I <span className="gradient-text-purple">BUILD</span>
          </h2>
        </motion.div>

        {/* Avatar + Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-start mb-5 md:mb-6">
          {/* Avatar at desk */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={avatarDesk}
              loading="lazy"
              decoding="async"
              alt="Faisal Imran working at desk with laptop and monitors"
              className="w-full max-w-[280px] md:max-w-[400px] h-auto drop-shadow-[0_0_40px_hsl(80,45%,42%,0.25)]"
            />
          </motion.div>

          {/* First two cards */}
          {cards.slice(0, 2).map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              className="glass-card-hover p-5 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <card.icon className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base md:text-lg tracking-wide">{card.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {card.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom row — remaining 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {cards.slice(2).map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.12 }}
              className="glass-card-hover p-5 md:p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <card.icon className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-sm tracking-wide">{card.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {card.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhatIDoSection;
