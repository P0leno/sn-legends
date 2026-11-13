import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import GlassFolder, { type ArtRecipe, type FolderFile } from '@/components/ui/glass-folder-cards';
import { FEATURED_TRACK, PROFILE } from '@/data/profile';
import './FoldersSection.css';

const PINE_STREAK_ART: ArtRecipe = {
  style: 'streak',
  colors: ['#040505', '#0e1e14', '#224c33', '#3eb472', '#13241a', '#98a89d'],
  scale: 0.72,
  warp: 1.5,
  angle: -0.45,
  gloss: 0.24,
  veins: 0,
};

const QUARK_FILES: FolderFile[] = [
  {
    name: '@quarkgiftbot',
    meta: 'QuarkApp · Telegram Bot',
    image: './assets/quark/quark-bot.jpg',
    href: PROFILE.quarkBot,
  },
  {
    name: '@quarkgift',
    meta: 'Telegram Channel',
    image: './assets/quark/quark-channel.jpg',
    href: PROFILE.quarkChannel,
  },
];

const PLAYLIST_FILES: FolderFile[] = [
  {
    name: `${FEATURED_TRACK.artist} — ${FEATURED_TRACK.title}`,
    meta: `${FEATURED_TRACK.sourceLabel} · ${FEATURED_TRACK.durationLabel}`,
    art: PINE_STREAK_ART,
    href: FEATURED_TRACK.soundcloudUrl,
  },
];

export function FoldersSection() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 560px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const folderWidth = isMobile ? 276 : 320;

  return (
    <section id="folders" className="folders-section" aria-label="Архив">
      <div className="container">
        <motion.div
          className="section-header"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="type-section section-title">Архив</h2>
        </motion.div>
      </div>

      <motion.div
        className="folders-track"
        role="region"
        aria-label="Стеклянные папки"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="folders-row">
          <div className="folder-slot">
            <GlassFolder
              label="QUARK"
              tone="dark"
              art="verdant"
              seed={7}
              width={folderWidth}
              action="more"
              appearDelay={0}
              files={QUARK_FILES}
              onFileSelect={(file) => {
                if (file.href) window.open(file.href, '_blank', 'noopener,noreferrer');
              }}
              menu={[
                {
                  label: 'Открыть @quarkgiftbot',
                  onSelect: () => window.open(PROFILE.quarkBot, '_blank', 'noopener,noreferrer'),
                },
                {
                  label: 'Канал @quarkgift',
                  onSelect: () => window.open(PROFILE.quarkChannel, '_blank', 'noopener,noreferrer'),
                },
              ]}
            />
          </div>

          <div className="folder-slot">
            <GlassFolder
              label="Плейлист"
              tone="dark"
              art={PINE_STREAK_ART}
              seed={14}
              width={folderWidth}
              action="more"
              appearDelay={120}
              files={PLAYLIST_FILES}
              menu={[
                {
                  label: 'Открыть SoundCloud',
                  onSelect: () =>
                    window.open(FEATURED_TRACK.soundcloudUrl, '_blank', 'noopener,noreferrer'),
                },
              ]}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
