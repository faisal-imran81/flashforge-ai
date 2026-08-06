import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, memo } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const NAME = 'FAISAL IMRAN';

/**
 * Pacing is unchanged from the original design:
 *   COUNT_MS matches the old 50 ticks x 30ms counter, and HANDOFF_MS keeps the
 *   content fade-in overlapping the exit slide exactly as before.
 * Only DEAD_HOLD_MS was trimmed — it is a pause with no animation running.
 */
const COUNT_MS = 1500;
const DEAD_HOLD_MS = 300;
const HANDOFF_MS = 800;

/**
 * The 15 letters never change, so they are split out and memoised. Previously
 * every progress tick re-rendered all of them (50 times per load).
 */
const NameReveal = memo(() => (
  <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-center overflow-hidden flex flex-wrap justify-center">
    {NAME.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3 + i * 0.04,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={
          i < 6 ? 'inline-block text-foreground' : i === 6 ? 'inline-block' : 'inline-block gradient-text-purple'
        }
        style={{ minWidth: char === ' ' ? '0.4em' : undefined }}
      >
        {char === ' ' ? ' ' : char}
      </motion.span>
    ))}
  </h1>
));
NameReveal.displayName = 'NameReveal';

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [show, setShow] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLParagraphElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let raf = 0;
    let exitTimer: ReturnType<typeof setTimeout>;
    let handoffTimer: ReturnType<typeof setTimeout>;
    const start = performance.now();

    // The counter is written straight to the DOM rather than through state, so
    // the bar animates at the display's full refresh rate instead of in 33fps
    // steps, and the surrounding letter animations never re-render.
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / COUNT_MS) * 100));

      if (barRef.current) barRef.current.style.width = `${pct}%`;
      if (percentRef.current) {
        percentRef.current.textContent = `${String(pct).padStart(3, '0')}%`;
      }

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
        return;
      }

      exitTimer = setTimeout(() => {
        setShow(false);
        handoffTimer = setTimeout(() => onCompleteRef.current(), HANDOFF_MS);
      }, DEAD_HOLD_MS);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      clearTimeout(handoffTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Ambient glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(hsl(80 45% 42% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(80 45% 42% / 0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          {/* Name reveal */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase text-muted-foreground"
            >
              Software & AI Engineer
            </motion.p>

            <NameReveal />

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '240px' }}
              transition={{ duration: 0.6, delay: 1 }}
              className="relative h-[2px] bg-border/40 overflow-hidden rounded-full"
            >
              <div
                ref={barRef}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent"
                style={{ width: '0%' }}
              />
            </motion.div>

            <motion.p
              ref={percentRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="font-mono text-xs text-muted-foreground tabular-nums"
            >
              000%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
