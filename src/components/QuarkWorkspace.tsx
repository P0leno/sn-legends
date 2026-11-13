import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  SFArrowUpRightIcon,
  SFChevronLeftIcon,
  SFChevronRightIcon,
} from '@/components/ui/sf-icons';
import { QuarkLogo } from './QuarkLogo';
import { APP_SCREENS, PROFILE, TELEGRAM_LINKS } from '@/data/profile';
import './QuarkWorkspace.css';

const CURRENT_YEAR = new Date().getFullYear();

export function QuarkWorkspace() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState(APP_SCREENS[0].id);
  const screenRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeIdx = Math.max(
    0,
    APP_SCREENS.findIndex((s) => s.id === activeId)
  );
  const activeScreen = APP_SCREENS[activeIdx] ?? APP_SCREENS[0];

  const handleSelectScreen = (id: string) => {
    setActiveId(id);
    const el = screenRefs.current[id];
    if (el && window.matchMedia('(max-width: 680px)').matches) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const handleStep = (delta: -1 | 1) => {
    const nextIdx = (activeIdx + delta + APP_SCREENS.length) % APP_SCREENS.length;
    handleSelectScreen(APP_SCREENS[nextIdx].id);
  };

  const handleDeckKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleStep(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleStep(-1);
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
                const isActive = screen.id === activeScreen.id;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`app-mode-item tactile ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleSelectScreen(screen.id)}
                  >
                    {isActive &&
                      (shouldReduceMotion ? (
                        <span className="app-mode-active-bg" aria-hidden="true" />
                      ) : (
                        <motion.span
                          layoutId="quark-mode-highlight"
                          className="app-mode-active-bg"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          aria-hidden="true"
                        />
                      ))}
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
            className="app-stage-col"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.34, ease: [0.23, 1, 0.32, 1] }}
            onKeyDown={handleDeckKeyDown}
          >
            <div className="app-stage-emblem" aria-hidden="true">
              <QuarkLogo size={460} />
            </div>

            <div className="app-screens-row">
              {APP_SCREENS.map((screen, index) => {
                const len = APP_SCREENS.length;
                const rel = (index - activeIdx + len) % len;
                const slotClass =
                  rel === 0 ? 'is-center is-active' : rel === 1 ? 'is-right' : 'is-left';
                const isActive = rel === 0;

                return (
                  <button
                    key={screen.id}
                    ref={(el) => {
                      screenRefs.current[screen.id] = el;
                    }}
                    type="button"
                    className={`app-phone-frame tactile ${slotClass}`}
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
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="app-deck-controls" aria-label="Навигация по экранам">
              <button
                type="button"
                className="app-deck-arrow tactile"
                onClick={() => handleStep(-1)}
                aria-label="Предыдущий экран"
              >
                <SFChevronLeftIcon size={15} />
              </button>

              <div className="app-deck-dots" role="presentation">
                {APP_SCREENS.map((screen) => {
                  const isActive = screen.id === activeScreen.id;
                  return (
                    <button
                      key={screen.id}
                      type="button"
                      className={`app-deck-pill tactile ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleSelectScreen(screen.id)}
                      aria-label={screen.title}
                    >
                      {screen.title}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="app-deck-arrow tactile"
                onClick={() => handleStep(1)}
                aria-label="Следующий экран"
              >
                <SFChevronRightIcon size={15} />
              </button>
            </div>
          </motion.div>
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
