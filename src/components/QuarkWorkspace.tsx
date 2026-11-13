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

        <div className="app-gallery-stage">
          <div className="app-stage-emblem" aria-hidden="true">
            <QuarkLogo size={460} />
          </div>

          <div className="app-gallery-grid">
            {APP_SCREENS.map((screen, index) => {
              const isCenter = screen.id === 'menu';
              return (
                <motion.figure
                  key={screen.id}
                  className={`app-screen-card ${isCenter ? 'is-featured' : ''}`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.38,
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
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

                  <figcaption className="app-screen-caption">
                    <span className="app-screen-name">{screen.title}</span>
                    <span className="app-screen-desc">{screen.caption}</span>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>
        </div>

        <footer className="site-footer">
          <div className="footer-brand">
            <span className="footer-quark-badge" aria-hidden="true">
              <QuarkLogo size={16} />
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
