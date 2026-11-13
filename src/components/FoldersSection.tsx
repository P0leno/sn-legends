import { motion, useReducedMotion } from 'motion/react';
import GlassFolder, { type ArtRecipe, type FolderFile } from '@/components/ui/glass-folder-cards';
import { FEATURED_TRACK, PROJECTS, type ProjectItem } from '@/data/profile';
import './FoldersSection.css';

interface FoldersSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const PINE_STREAK_ART: ArtRecipe = {
  style: 'streak',
  colors: ['#040505', '#0e1e14', '#224c33', '#3eb472', '#13241a', '#98a89d'],
  scale: 0.72,
  warp: 1.5,
  angle: -0.45,
  gloss: 0.24,
  veins: 0,
};

const PROJECT_FILES: FolderFile[] = [
  {
    name: PROJECTS[0].title,
    meta: `${PROJECTS[0].year} · @quarkgiftbot`,
    image: './assets/quark/quark-bot.jpg',
  },
];

const LISTENING_FILES: FolderFile[] = [
  {
    name: `${FEATURED_TRACK.artist} — ${FEATURED_TRACK.title}`,
    meta: `${FEATURED_TRACK.sourceLabel} · ${FEATURED_TRACK.durationLabel}`,
    art: PINE_STREAK_ART,
    href: FEATURED_TRACK.soundcloudUrl,
  },
];

export function FoldersSection({ onSelectProject }: FoldersSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="folders" className="folders-section" aria-label="Интерактивные папки">
      <div className="container">
        <motion.div
          className="section-header"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="type-section section-title">Папки на столе.</h2>
          <p className="type-body section-lead">
            Проекты и музыка, которую слушаю. Наведи, чтобы приоткрыть стекло, или нажми для веера.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="folders-track"
        role="region"
        aria-label="Горизонтальный список папок"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="folders-row">
          <div className="folder-slot">
            <GlassFolder
              label="Проекты"
              tone="dark"
              art="verdant"
              seed={7}
              width={320}
              action="more"
              appearDelay={0}
              files={PROJECT_FILES}
              onFileSelect={(_, index) => {
                const target = PROJECTS[index];
                if (target) onSelectProject(target);
              }}
              menu={[
                {
                  label: 'Открыть QUARK',
                  onSelect: () => onSelectProject(PROJECTS[0]),
                },
              ]}
            />
          </div>

          <div className="folder-slot">
            <GlassFolder
              label="Сейчас слушаю"
              tone="dark"
              art={PINE_STREAK_ART}
              seed={14}
              width={320}
              action="add"
              appearDelay={120}
              files={LISTENING_FILES}
              onAdd={(current) => ({
                name: `Трек #${current.length + 1}`,
                meta: 'Добавлен сейчас',
                art: PINE_STREAK_ART,
              })}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
