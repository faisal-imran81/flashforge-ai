import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import project1 from '@/assets/project-1.webp';
import project2 from '@/assets/project-2.webp';
import project3 from '@/assets/project-3.webp';

interface Project {
  id: number;
  title: string;
  description: string;
  tag: string;
  stack: string;
  /** Live URL. Omit while a project has no public deployment — the card renders without a link. */
  href?: string;
  imageSrc: string;
}

/** Live screenshot via microlink — use as imageSrc once a project has a public URL. */
const shot = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(
    url,
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800&waitFor=1500`;

// TODO: add `href: 'https://…'` + swap imageSrc to shot(url) as each project goes live.
const projects: Project[] = [
  {
    id: 1,
    title: 'Solace',
    description:
      'Full-stack AI mental health platform built in 3 days. Real-time LLM streaming via Groq + LLaMA 3.1 8B, crisis keyword detection, AI-powered journal with sentiment analysis, mood tracker with 7-day visualization, and a Three.js 3D landing page. Deployed on Vercel + Railway.',
    tag: 'Full Stack · AI',
    stack: 'Next.js · FastAPI · Groq API · PostgreSQL · Supabase · Clerk · Three.js',
    href: 'https://solace-web-fm4f-gamma.vercel.app/',
    imageSrc: project1,
  },
  {
    id: 2,
    title: 'Muslimeen',
    description:
      'AI Qur\'an companion app — cross-platform iOS, Android, and Web. Anonymous guest access with zero friction onboarding, Supabase-backed conversation history, and real-time LLM responses via Groq API. Built as a technical assessment; debugged a silent Vercel build failure via production logs.',
    tag: 'Mobile · AI',
    stack: 'React Native · Expo SDK 54 · Groq API · Supabase · Vercel',
    href: 'https://quran-chat-app-seven.vercel.app/',
    imageSrc: project2,
  },
  {
    id: 3,
    title: 'Elucid',
    description:
      'AI learning companion with 5 difficulty levels from ELI5 to PhD, each with a dedicated system prompt. Quiz mode generates questions from full conversation context via Groq. Daily streak tracking in Supabase, animated CSS background, cross-platform on iOS, Android, and Web.',
    tag: 'Mobile · AI',
    stack: 'React Native · Expo SDK 54 · Expo Router · Groq API · Supabase · PostgreSQL',
    href: 'https://elucid-ai-tutor.vercel.app/',
    imageSrc: project3,
  },
];

const StackCard = ({ project, index, total }: { project: Project; index: number; total: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // As card leaves (later cards stack on top), shrink & fade slightly
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [0.6, 1, 1, 0.5]);

  // Stagger sticky top so cards stack with a visible offset
  const topOffset = 80 + index * 24;

  // Linked card when the project is deployed, plain card otherwise
  const Card = project.href ? motion.a : motion.div;
  const linkProps = project.href
    ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <div
      ref={ref}
      className="sticky"
      style={{
        top: `${topOffset}px`,
        marginBottom: index === total - 1 ? 0 : '18vh',
      }}
    >
      <Card
        {...linkProps}
        style={{ scale, opacity }}
        className="glass-card-hover block overflow-hidden rounded-2xl border border-primary/20 bg-card/70 backdrop-blur-xl shadow-2xl"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px] overflow-hidden">
            <img
              src={project.imageSrc}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
              {String(index + 1).padStart(2, '0')} · {project.tag}
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-3">{project.title}</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            <div className="mt-5 font-mono text-[11px] tracking-wide text-muted-foreground/80">
              {project.stack}
            </div>
            {project.href && (
              <div className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Visit live →
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

const WorkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} id="work" className="scroll-section relative">
      <div className="section-container pt-20 md:pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl tracking-tight">
            <span className="font-serif italic">My</span>{' '}
            <span className="font-bold gradient-text-purple">Work</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 font-mono tracking-widest uppercase">
            Scroll — cards stack up
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto pb-[30vh]">
          {projects.map((p, i) => (
            <StackCard key={p.id} project={p} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
