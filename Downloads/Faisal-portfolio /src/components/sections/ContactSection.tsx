import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CONTACT_EMAIL = 'faisalimran2006@gmail.com';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Opens the visitor's mail client with the message prefilled.
  // TODO: swap for EmailJS/Resend/a form endpoint to send without leaving the page.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio enquiry from ${formData.name}`;
    const body = `${formData.message}\n\n—\n${formData.name}\n${formData.email}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    toast({
      title: 'Opening your mail app',
      description: `If nothing opens, email me directly at ${CONTACT_EMAIL}.`,
    });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <motion.section ref={ref} id="contact" className="scroll-section py-20 md:py-32 pb-28 md:pb-32" style={{ y: sectionY, opacity: sectionOpacity }}>
      <div className="section-container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs tracking-widest uppercase text-primary">Let's connect</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tight gradient-text-purple mb-4">
            Hire Me
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
            Got a project in mind? Let's build something extraordinary together.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="glass-card p-5 sm:p-8 md:p-12 space-y-5 md:space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-display"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-display"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none font-display"
              placeholder="Tell me about your project..."
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 md:py-4 rounded-lg bg-primary text-primary-foreground font-semibold tracking-wide flex items-center justify-center gap-3 transition-all duration-300"
            style={{ boxShadow: '0 0 40px hsl(80 45% 42% / 0.3)' }}
          >
            {sent ? (
              <>
                <Mail className="w-5 h-5" />
                Mail app opened
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-10 md:mt-16 text-muted-foreground font-mono text-xs tracking-widest"
        >
          Designed & Built by Faisal Imran © 2026
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
