import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { id: 'ch-hero', label: '01 — Origin', range: [0, 0.16] },
  { id: 'ch-do', label: '02 — Craft', range: [0.16, 0.34] },
  { id: 'ch-exp', label: '03 — Journey', range: [0.34, 0.52] },
  { id: 'ch-work', label: '04 — Work', range: [0.52, 0.7] },
  { id: 'ch-stack', label: '05 — Arsenal', range: [0.7, 0.86] },
  { id: 'ch-contact', label: '06 — Connect', range: [0.86, 1] },
];

const ScrollStory = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      });

      // Section reveal animations (additive, non-destructive)
      gsap.utils.toArray<HTMLElement>('section').forEach((sec) => {
        gsap.fromTo(
          sec,
          { filter: 'blur(8px)' },
          {
            filter: 'blur(0px)',
            scrollTrigger: { trigger: sec, start: 'top 85%', end: 'top 40%', scrub: true },
          },
        );
      });

      // Chapter label crossfade
      chapters.forEach((c) => {
        const el = document.getElementById(c.id);
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 10 });
        ScrollTrigger.create({
          trigger: document.body,
          start: () => `${c.range[0] * 100}% top`,
          end: () => `${c.range[1] * 100}% top`,
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.5 }),
          onLeave: () => gsap.to(el, { opacity: 0, y: -10, duration: 0.4 }),
          onEnterBack: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.5 }),
          onLeaveBack: () => gsap.to(el, { opacity: 0, y: 10, duration: 0.4 }),
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none fixed inset-0 z-40">
      {/* Top scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-border/20">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-primary via-accent to-primary"
          style={{ boxShadow: '0 0 10px hsl(200 95% 60% / 0.7)' }}
        />
      </div>

      {/* Chapter label — bottom-left */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <div className="relative h-5">
          {chapters.map((c) => (
            <div key={c.id} id={c.id} className="absolute inset-0 whitespace-nowrap">
              {c.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollStory;
