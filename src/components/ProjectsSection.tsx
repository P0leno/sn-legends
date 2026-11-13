import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PROJECTS, QUARK_MODULES, QUARK_NODES } from '../data/profile';
import { GlassButton } from '@/components/ui/glass-button';
import { QuarkLogo } from './QuarkLogo';
import './ProjectsSection.css';

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const project = PROJECTS[0];

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.45, 1]);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="type-section section-title">{project.title}</h2>
          <p className="type-body section-lead">{project.subtitle}</p>
        </motion.div>

        {/* Row 1: Featured Hero Bento Card */}
        <motion.article
          ref={cardRef}
          className="project-featured-card"
          style={shouldReduceMotion ? undefined : { scale, y, opacity }}
        >
          <div className="project-featured-grid">
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-banner-link tactile"
              aria-label="Открыть @quarkgiftbot в Telegram"
            >
              <div className="project-visual-banner">
                <img
                  src={project.banner}
                  alt="QUARK"
                  className="project-banner-img"
                  loading="lazy"
                />
              </div>
            </a>

            <div className="project-card-body">
              <div className="project-brand-row">
                <QuarkLogo size={24} />
                <span className="project-category">{project.category}</span>
              </div>

              <h3 className="type-card-title project-title">QuarkApp и @quarkgiftbot</h3>
              <p className="project-summary">{project.summary}</p>

              <ul className="project-highlights">
                {project.highlights.map((item) => (
                  <li key={item} className="project-highlight-item">
                    <CheckCircle2 size={16} className="project-highlight-icon" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="project-cta-row">
                {project.links.demo && (
                  <GlassButton
                    type="button"
                    size="sm"
                    contentClassName="flex items-center justify-center gap-2"
                    onClick={() => window.open(project.links.demo, '_blank', 'noopener,noreferrer')}
                  >
                    <span>Открыть @quarkgiftbot</span>
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </GlassButton>
                )}

                {project.links.channel && (
                  <GlassButton
                    type="button"
                    size="sm"
                    contentClassName="flex items-center justify-center gap-2"
                    onClick={() => window.open(project.links.channel, '_blank', 'noopener,noreferrer')}
                  >
                    <span>Канал @quarkgift</span>
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </GlassButton>
                )}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Row 2: QuarkApp Inside Modules (16:9 forest UI screens) */}
        <div id="quark-modules" className="quark-modules-block">
          <div className="quark-subhead">
            <h3 className="type-card-title quark-subhead-title">Внутри QuarkApp</h3>
            <span className="quark-subhead-note">Ключевые разделы мини-аппа</span>
          </div>

          <div className="quark-modules-grid">
            {QUARK_MODULES.map((mod, idx) => (
              <motion.a
                key={mod.id}
                href={mod.href}
                target="_blank"
                rel="noopener noreferrer"
                className="quark-module-card tactile"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : idx * 0.06,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <div className="quark-module-media">
                  <img
                    src={mod.image}
                    alt={mod.title}
                    className="quark-module-img"
                    loading="lazy"
                  />
                </div>
                <div className="quark-module-body">
                  <div className="quark-node-head">
                    <h4 className="quark-node-title">{mod.title}</h4>
                    <ArrowUpRight size={16} className="quark-node-arrow" />
                  </div>
                  <p className="quark-node-subtitle">{mod.subtitle}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Row 3: Square 1:1 Ecosystem Cards */}
        <div className="quark-nodes-track" role="region" aria-label="Компоненты экосистемы QUARK">
          <div className="quark-nodes-grid">
            {QUARK_NODES.map((node, idx) => (
              <motion.a
                key={node.id}
                href={node.href}
                target="_blank"
                rel="noopener noreferrer"
                className="quark-node-card tactile"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : idx * 0.06,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <div className="quark-node-media">
                  <img
                    src={node.image}
                    alt={node.title}
                    className="quark-node-img"
                    loading="lazy"
                  />
                </div>
                <div className="quark-node-body">
                  <span className="quark-node-badge">{node.badge}</span>
                  <div className="quark-node-head">
                    <h4 className="quark-node-title">{node.title}</h4>
                    <ArrowUpRight size={16} className="quark-node-arrow" />
                  </div>
                  <p className="quark-node-subtitle">{node.subtitle}</p>
                  <span className="quark-node-cta">
                    <span>{node.ctaLabel}</span>
                    <ArrowUpRight size={14} strokeWidth={2.2} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
