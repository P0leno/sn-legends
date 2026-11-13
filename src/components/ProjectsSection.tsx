import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/profile';
import { GlassButton } from '@/components/ui/glass-button';
import { QuarkLogo } from './QuarkLogo';
import './ProjectsSection.css';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const project = PROJECTS[0];

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.25, 1]);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="type-section section-title">Главный проект.</h2>
          <p className="type-body section-lead">
            То, над чем работаю прямо сейчас. Нажми, чтобы посмотреть все экраны и детали.
          </p>
        </motion.div>

        <motion.article
          ref={cardRef}
          className="project-card is-featured"
          style={shouldReduceMotion ? undefined : { scale, y, opacity }}
        >
          <div className="project-featured-grid">
            <button
              type="button"
              className="project-banner-trigger tactile"
              onClick={() => onSelectProject(project)}
              aria-label={`Открыть галерею ${project.title}`}
            >
              <div className="project-visual project-visual-banner">
                <img
                  src={project.banner}
                  alt={`${project.title} — баннер`}
                  className="project-banner-img"
                  loading="lazy"
                />
              </div>
            </button>

            <div className="project-card-body">
              <div className="project-brand-row">
                <QuarkLogo size={22} />
                <span className="project-category">{project.category}</span>
                <span className="project-year tabular-nums">· {project.year}</span>
              </div>

              <h3 className="type-card-title project-title">{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-summary">{project.summary}</p>

              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span key={tech} className="stack-chip">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-cta-row">
                <GlassButton
                  type="button"
                  size="sm"
                  contentClassName="flex items-center gap-2"
                  onClick={() => onSelectProject(project)}
                >
                  <span>Открыть детали</span>
                  <ArrowUpRight size={16} strokeWidth={2} />
                </GlassButton>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
