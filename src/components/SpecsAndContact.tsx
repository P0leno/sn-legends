import { motion, useReducedMotion } from 'motion/react';
import { Bot, Megaphone, Send } from 'lucide-react';
import { GlassButton } from '@/components/ui/glass-button';
import { PROFILE } from '../data/profile';
import './SpecsAndContact.css';

const CURRENT_YEAR = new Date().getFullYear();

export function SpecsAndContact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="container">
          <motion.div
            className="contact-open-block"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="contact-copy">
              <h2 className="type-section contact-title">Связь в Telegram</h2>
              <p className="type-body contact-lead">
                По вопросам QUARK, QuarkApp и сотрудничества — напрямую в Telegram.
              </p>
            </div>

            <div className="contact-actions">
              <GlassButton
                type="button"
                size="default"
                contentClassName="flex items-center justify-center gap-2"
                onClick={() => window.open(PROFILE.telegram, '_blank', 'noopener,noreferrer')}
              >
                <Send size={16} strokeWidth={2} />
                <span>{PROFILE.handle}</span>
              </GlassButton>

              <GlassButton
                type="button"
                size="default"
                contentClassName="flex items-center justify-center gap-2"
                onClick={() => window.open(PROFILE.quarkBot, '_blank', 'noopener,noreferrer')}
              >
                <Bot size={16} strokeWidth={1.8} />
                <span>@quarkgiftbot</span>
              </GlassButton>

              <GlassButton
                type="button"
                size="default"
                contentClassName="flex items-center justify-center gap-2"
                onClick={() => window.open(PROFILE.quarkChannel, '_blank', 'noopener,noreferrer')}
              >
                <Megaphone size={16} strokeWidth={1.8} />
                <span>@quarkgift</span>
              </GlassButton>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-copy tabular-nums">
            © {CURRENT_YEAR} {PROFILE.name}
          </span>
          <a
            href={PROFILE.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-meta tactile"
          >
            {PROFILE.handle}
          </a>
        </div>
      </footer>
    </>
  );
}
