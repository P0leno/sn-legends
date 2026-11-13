import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'motion/react';
import { ArrowUpRight, Code2, X } from 'lucide-react';
import type { ProjectItem } from '../data/profile';
import './ProjectSheet.css';

interface ProjectSheetProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectSheet({ project, onClose }: ProjectSheetProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.velocity.y > 420 || info.offset.y > 110) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="sheet-portal" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
          <motion.div
            className="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            onClick={onClose}
          />

          <div className="sheet-positioner">
            <motion.div
              className="sheet-surface"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 36, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 28, scale: 0.97 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.18 }
                  : { type: 'spring', duration: 0.4, bounce: 0 }
              }
              drag={shouldReduceMotion ? false : 'y'}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.12, bottom: 0.48 }}
              onDragEnd={handleDragEnd}
            >
              <div className="sheet-grabber-row" aria-hidden="true">
                <span className="sheet-grabber" />
              </div>

              <div className="sheet-header">
                <div className="sheet-meta">
                  <span className="sheet-category">{project.category}</span>
                  <span className="sheet-dot">·</span>
                  <span className="sheet-year tabular-nums">{project.year}</span>
                  <span className="sheet-dot">·</span>
                  <span className="sheet-role">{project.role}</span>
                </div>

                <button
                  type="button"
                  className="sheet-close tactile"
                  onClick={onClose}
                  aria-label="Закрыть детали проекта"
                >
                  <X size={18} strokeWidth={2} />
                </button>
              </div>

              <h3 id="sheet-title" className="sheet-title">
                {project.title}
              </h3>
              <p className="sheet-subtitle">{project.subtitle}</p>

              {project.banner && (
                <div className="sheet-banner-wrap">
                  <img
                    src={project.banner}
                    alt={`${project.title} баннер`}
                    className="sheet-banner-img"
                  />
                </div>
              )}

              {project.gallery && project.gallery.length > 0 && (
                <div className="sheet-gallery">
                  {project.gallery.map((imgSrc) => (
                    <img
                      key={imgSrc}
                      src={imgSrc}
                      alt={`${project.title} экран`}
                      className="sheet-gallery-img"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}

              <p className="sheet-description">{project.description}</p>

              <div className="sheet-section">
                <h4 className="sheet-section-label">Детали</h4>
                <ul className="sheet-highlights">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="sheet-section">
                <h4 className="sheet-section-label">Стек</h4>
                <div className="sheet-stack">
                  {project.stack.map((tech) => (
                    <span key={tech} className="stack-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(project.links.demo || project.links.channel || project.links.github) && (
                <div className="sheet-actions">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary tactile"
                    >
                      <span>Открыть @quarkgiftbot</span>
                      <ArrowUpRight size={17} strokeWidth={2} />
                    </a>
                  )}
                  {project.links.channel && (
                    <a
                      href={project.links.channel}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary tactile"
                    >
                      <span>Канал @quarkgift</span>
                      <ArrowUpRight size={17} strokeWidth={2} />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary tactile"
                    >
                      <Code2 size={17} strokeWidth={1.8} />
                      <span>Исходный код</span>
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
