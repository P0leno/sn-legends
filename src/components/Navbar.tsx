import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { PROFILE } from '../data/profile';
import { QuarkLogo } from './QuarkLogo';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'overview', label: 'Обзор' },
  { id: 'projects', label: 'QUARK' },
  { id: 'folders', label: 'Папки' },
  { id: 'contact', label: 'Контакты' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('overview');
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 34, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <header className={`navbar-wrap ${scrolled ? 'is-scrolled' : ''}`}>
      {!shouldReduceMotion && (
        <motion.div
          className="scroll-progress-bar"
          style={{ scaleX }}
          aria-hidden="true"
        />
      )}

      <div className="container navbar-inner">
        <a
          href="#overview"
          onClick={(e) => handleNavClick(e, 'overview')}
          className="navbar-brand tactile"
        >
          <span className="brand-logo-wrap" aria-hidden="true">
            <QuarkLogo size={18} />
          </span>
          <span className="brand-name">{PROFILE.name}</span>
        </a>

        <nav className="navbar-pill" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`nav-link tactile ${isActive ? 'is-active' : ''}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="nav-active-bg"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.15 }
                        : { type: 'spring', duration: 0.35, bounce: 0 }
                    }
                  />
                )}
                <span className="nav-link-text">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <a
          href={PROFILE.telegram}
          target="_blank"
          rel="noreferrer"
          className="navbar-cta tactile"
        >
          Telegram
        </a>
      </div>
    </header>
  );
}
