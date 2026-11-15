import { motion, useReducedMotion } from 'motion/react';
import { SFArrowUpRightIcon } from '@/components/ui/sf-icons';
import { QuarkLogo } from './QuarkLogo';
import { APP_SCREENS, PROFILE, TELEGRAM_LINKS } from '@/data/profile';
import './QuarkWorkspace.css';

const CURRENT_YEAR = new Date().getFullYear();

export function QuarkWorkspace() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section id="quark" className="workspace-section" aria-label="QuarkApp">
      <div className="container">
        <div className="app-header-row">
          <div className="app-heading-group">
            <h2 className="type-section app-title">QuarkApp</h2>
            <p className="type-body app-lead">
              Мини-апп в Telegram с крашем, кейсами и апгрейдом подарков.
            </p>
          </div>

          <div className="app-actions-row">
            <a
              href={PROFILE.quarkBot}
              target="_blank"
              rel="noopener noreferrer"
              className="app-btn app-btn--primary tactile"
            >
              <QuarkLogo size={15} />
              <span>Открыть QuarkApp</span>
              <SFArrowUpRightIcon size={15} />
            </a>

            <a
              href={PROFILE.quarkChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="app-btn app-btn--glass tactile"
            >
              <span>@quarkgift</span>
              <SFArrowUpRightIcon size={15} />
            </a>
          </div>
        </div>

        <motion.div
          className="app-fan-stage"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="app-stage-emblem" aria-hidden="true">
            <QuarkLogo size={480} />
          </div>

          {APP_SCREENS.map((screen, index) => {
            const slotClass =
              index === 0 ? 'is-fan-left' : index === 1 ? 'is-fan-center' : 'is-fan-right';

            return (
              <figure key={screen.id} className={`app-fan-card ${slotClass}`}>
                <div className="app-phone-frame">
                  <div className="app-phone-viewport">
                    <img
                      src={screen.src}
                      alt={`QuarkApp — ${screen.title}`}
                      className="app-phone-img"
                      loading="eager"
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                </div>
              </figure>
            );
          })}
        </motion.div>

        <footer className="site-footer">
          <div className="footer-brand">
            <span className="footer-quark-badge" aria-hidden="true">
              <QuarkLogo size={18} />
            </span>
            <span className="footer-copy tabular-nums">
              © {CURRENT_YEAR} {PROFILE.name}
            </span>
          </div>

          <nav className="footer-links" aria-label="Ссылки QUARK">
            {TELEGRAM_LINKS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-tg-link tactile"
              >
                <span>{item.handle}</span>
                <SFArrowUpRightIcon size={13} />
              </a>
            ))}
          </nav>
        </footer>
      </div>
    </section>
  );
}
