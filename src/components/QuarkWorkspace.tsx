import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SFArrowUpRightIcon } from '@/components/ui/sf-icons';
import { APP_SCREENS, PROFILE, TELEGRAM_LINKS } from '@/data/profile';
import './QuarkWorkspace.css';

const CURRENT_YEAR = new Date().getFullYear();

export function QuarkWorkspace() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState(APP_SCREENS[0].id);
  const screenRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeScreen = APP_SCREENS.find((s) => s.id === activeId) ?? APP_SCREENS[0];

  const handleSelectScreen = (id: string) => {
    setActiveId(id);
    const el = screenRefs.current[id];
    if (el && window.matchMedia('(max-width: 640px)').matches) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <section id="quark" className="workspace-section" aria-label="QuarkApp">
      <div className="container">
        <div className="app-showcase-grid">
          <div className="app-info-col">
            <h2 className="type-section app-title">QuarkApp</h2>
            <p className="type-body app-lead">
              Мини-апп в Telegram с крашем, кейсами и апгрейдом подарков.
            </p>

            <div className="app-mode-list" role="tablist" aria-label="Экраны приложения QuarkApp">
              {APP_SCREENS.map((screen) => {
                const isActive = screen.id === activeId;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`app-mode-item tactile ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleSelectScreen(screen.id)}
                  >
                    <span className="app-mode-title">{screen.title}</span>
                    <span className="app-mode-caption">{screen.caption}</span>
                  </button>
                );
              })}
            </div>

            <div className="app-actions-row">
              <a
                href={PROFILE.quarkBot}
                target="_blank"
                rel="noopener noreferrer"
                className="app-btn app-btn--primary tactile"
              >
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
            className="app-stage-col"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="app-screens-row">
              {APP_SCREENS.map((screen) => {
                const isActive = screen.id === activeScreen.id;
                return (
                  <button
                    key={screen.id}
                    ref={(el) => {
                      screenRefs.current[screen.id] = el;
                    }}
                    type="button"
                    className={`app-phone-frame tactile ${isActive ? 'is-active' : ''}`}
                    aria-label={`Показать экран: ${screen.title}`}
                    aria-pressed={isActive}
                    onClick={() => handleSelectScreen(screen.id)}
                  >
                    <div className="app-phone-viewport">
                      <img
                        src={screen.src}
                        alt={`QuarkApp — ${screen.title}`}
                        className="app-phone-img"
                        loading="eager"
                        draggable={false}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        <footer className="site-footer">
          <span className="footer-copy tabular-nums">
            © {CURRENT_YEAR} {PROFILE.name}
          </span>

          <nav className="footer-links" aria-label="Ссылки Telegram">
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
