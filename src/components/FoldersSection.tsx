import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import GlassFolder, { type ArtRecipe, type FolderFile } from '@/components/ui/glass-folder-cards';
import { FEATURED_TRACK, PROFILE } from '@/data/profile';
import './FoldersSection.css';

const PINE_STREAK_ART: ArtRecipe = {
  style: 'streak',
  colors: ['#080c09', '#0e1e14', '#224c33', '#38c977', '#13241a', '#b6c4ba'],
  scale: 0.72,
  warp: 1.5,
  angle: -0.45,
  gloss: 0.22,
  veins: 0,
};

const EMERALD_CANOPY_ART: ArtRecipe = {
  style: 'marble',
  colors: ['#080c09', '#0d2e1b', '#1c5433', '#5ef09b', '#123621', '#b6c4ba'],
  scale: 0.85,
  warp: 1.4,
  angle: 0.35,
  gloss: 0.2,
  veins: 2,
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

const QUARKAPP_FILES: FolderFile[] = [
  {
    name: 'Меню',
    meta: 'Игровые режимы · QuarkApp',
    image: './assets/quark/quark-menu.jpg',
    href: PROFILE.quarkBot,
  },
  {
    name: 'Профиль',
    meta: 'Telegram Gifts и баланс',
    image: './assets/quark/quark-profile.jpg',
    href: PROFILE.quarkBot,
  },
  {
    name: 'Поддержка',
    meta: 'Помощь 24/7',
    image: './assets/quark/quark-help.jpg',
    href: PROFILE.quarkBot,
  },
];

const PLAYLIST_FILES: FolderFile[] = [
  {
    name: `${FEATURED_TRACK.artist} — ${FEATURED_TRACK.title}`,
    meta: `${FEATURED_TRACK.sourceLabel} · ${FEATURED_TRACK.durationLabel}`,
    image: FEATURED_TRACK.cover,
    art: PINE_STREAK_ART,
    href: FEATURED_TRACK.soundcloudUrl,
  },
];

export function FoldersSection() {
  const shouldReduceMotion = useReducedMotion();
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 640px)');
    const tabletMq = window.matchMedia('(max-width: 1024px)');
    const update = () => {
      if (mobileMq.matches) {
        setViewportMode('mobile');
      } else if (tabletMq.matches) {
        setViewportMode('tablet');
      } else {
        setViewportMode('desktop');
      }
    };
    update();
    mobileMq.addEventListener('change', update);
    tabletMq.addEventListener('change', update);
    return () => {
      mobileMq.removeEventListener('change', update);
      tabletMq.removeEventListener('change', update);
    };
  }, []);

  const folderWidth =
    viewportMode === 'mobile' ? 280 : viewportMode === 'tablet' ? 214 : 316;

  return (
    <section id="folders" className="folders-section" aria-label="Папки">
      <div className="container">
        <div className="folders-header">
          <h2 className="type-section section-title">Папки</h2>
          <p className="type-body section-lead">
            Интерактивные разделы с быстрыми ссылками на QuarkApp, бота, канал и трек.
          </p>
        </div>
      </div>

      <motion.div
        className="folders-track"
        data-ui
        role="region"
        aria-label="Стеклянные папки"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
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
              label="QuarkApp"
              tone="dark"
              art={EMERALD_CANOPY_ART}
              seed={21}
              width={folderWidth}
              action="more"
              appearDelay={80}
              files={QUARKAPP_FILES}
              onFileSelect={(file) => {
                if (file.href) window.open(file.href, '_blank', 'noopener,noreferrer');
              }}
              menu={[
                {
                  label: 'Открыть QuarkApp',
                  onSelect: () => window.open(PROFILE.quarkBot, '_blank', 'noopener,noreferrer'),
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
              appearDelay={160}
              files={PLAYLIST_FILES}
              onFileSelect={(file) => {
                if (file.href) window.open(file.href, '_blank', 'noopener,noreferrer');
              }}
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
