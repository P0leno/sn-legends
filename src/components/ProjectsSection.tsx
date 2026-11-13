import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, QUARK_NODES } from '../data/profile';
import { GlassButton } from '@/components/ui/glass-button';
import { QuarkLogo } from './QuarkLogo';
import './ProjectsSection.css';

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();
  const project = PROJECTS[0];

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

        {/* Unboxed Featured Split Showcase */}
        <motion.article
          className="project-featured-split"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
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

            <div className="project-cta-row">
              {project.links.demo && (
                <GlassButton
                  type="button"
                  size="default"
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
                  size="default"
                  contentClassName="flex items-center justify-center gap-2"
                  onClick={() => window.open(project.links.channel, '_blank', 'noopener,noreferrer')}
                >
                  <span>Канал @quarkgift</span>
                  <ArrowUpRight size={16} strokeWidth={2} />
                </GlassButton>
              )}
            </div>
          </div>
        </motion.article>

        {/* Unboxed 3 Pillars: @quarkgiftbot, @quarkgift, Support */}
        <div className="quark-nodes-grid" role="region" aria-label="Компоненты экосистемы QUARK">
          {QUARK_NODES.map((node, idx) => (
            <motion.a
              key={node.id}
              href={node.href}
              target="_blank"
              rel="noopener noreferrer"
              className="quark-node-item tactile"
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
                <div className="quark-node-head">
                  <h4 className="quark-node-title">{node.title}</h4>
                  <ArrowUpRight size={16} className="quark-node-arrow" />
                </div>
                <p className="quark-node-subtitle">{node.subtitle}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
