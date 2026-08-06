import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

const SocialSidebar = () => {
  const links = [
    { icon: Github, href: 'https://github.com/faisal-imran81', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/faisal-imran-623284373', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:faisalimran2006@gmail.com', label: 'Email' },
  ];

  return (
    <>
      {/* Desktop — fixed left sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-5"
      >
        {links.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
        <div className="w-px h-16 bg-border mx-auto mt-2" />
      </motion.div>

      {/* Mobile — bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-8 py-4 bg-background/80 backdrop-blur-md border-t border-border"
      >
        {links.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </motion.div>
    </>
  );
};

export default SocialSidebar;
