import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import GlassFolder, { type ArtRecipe, type FolderFile } from '@/components/ui/glass-folder-cards';
import { SFArrowUpRightIcon } from '@/components/ui/sf-icons';
import { FEATURED_TRACK, PROFILE, TELEGRAM_LINKS } from '@/data/profile';
import './QuarkWorkspace.css';

const QUARK_BOT_ART: ArtRecipe = {
  style: 'marble',
  colors: ['#070b08', '#0d2316', '#1b472d', '#4ce08d', '#112519', '#9ab5a4'],
  scale: 0.78,
  warp: 1.6,
  angle: -0.35,
  gloss: 0.24,
  veins: 1,
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

const PINE_STREAK_ART: ArtRecipe = {
  style: 'streak',
  colors: ['#080c09', '#0e1e14', '#224c33', '#38c977', '#13241a', '#b6c4ba'],
  scale: 0.72,
  warp: 1.5,
  angle: -0.45,
  gloss: 0.22,
  veins: 0,
};

const DEEP_MOSS_ART: ArtRecipe = {
  style: 'streak',
  colors: ['#060a07', '#0f2718', '#1e5032', '#64ec9d', '#0f1b13', '#8ca495'],
  scale: 0.65,
  warp: 1.8,
  angle: 0.55,
  gloss: 0.18,
  veins: 1,
};

const SLATE_MIST_ART: ArtRecipe = {
  style: 'marble',
  colors: ['#090c0a', '#131f18', '#223b2c', '#3dc77a', '#101914', '#b6c4ba'],
  scale: 0.9,
  warp: 1.2,
  angle: -0.7,
  gloss: 0.16,
  veins: 0,
};

const QUARK_FILES: FolderFile[] = [
  {
    name: '@quarkgiftbot',
    meta: 'Бот и вход',
    art: QUARK_BOT_ART,
    href: PROFILE.quarkBot,
  },
  {
    name: '@quarkgift',
    meta: 'Канал',
    art: EMERALD_CANOPY_ART,
    href: PROFILE.quarkChannel,
  },
];

const QUARKAPP_FILES: FolderFile[] = [
  {
    name: 'Меню',
    meta: 'Режимы',
    art: PINE_STREAK_ART,
    href: PROFILE.quarkBot,
  },
  {
    name: 'Профиль',
    meta: 'Инвентарь',
    art: DEEP_MOSS_ART,
    href: PROFILE.quarkBot,
  },
  {
    name: 'Поддержка',
    meta: '24/7',
    art: SLATE_MIST_ART,
    href: PROFILE.quarkBot,
  },
];

const PLAYLIST_FILES: FolderFile[] = [
  {
    name: FEATURED_TRACK.title,
    meta: FEATURED_TRACK.durationLabel,
    image: FEATURED_TRACK.cover,
    art: PINE_STREAK_ART,
    href: FEATURED_TRACK.soundcloudUrl,
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function QuarkWorkspace() {
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
    viewportMode === 'mobile' ? 280 : viewportMode === 'tablet' ? 214 : 310;

  return (
    <section id="quark" className="workspace-section" aria-label="QUARK">
      <div className="container">
        <div className="workspace-top">
          <div className="workspace-intro">
            <h2 className="type-section workspace-title">QUARK</h2>
            <p className="type-body workspace-lead">Подарки и мини-апп в Telegram.</p>
          </div>

          <nav className="workspace-directory" aria-label="Ссылки Telegram">
            {TELEGRAM_LINKS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="workspace-link-row tactile"
              >
                <span className="workspace-link-handle">{item.handle}</span>
                <span className="workspace-link-note">{item.note}</span>
                <SFArrowUpRightIcon size={15} className="workspace-link-arrow" />
              </a>
            ))}
          </nav>
        </div>

        <motion.div
          className="workspace-folders"
          data-ui
          role="region"
          aria-label="Разделы QUARK"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="folders-row">
            <div className="folder-slot">
              <GlassFolder
                label="QUARK"
                meta="@quarkgiftbot · @quarkgift"
                tone="dark"
                art={QUARK_BOT_ART}
                seed={7}
                width={folderWidth}
                action="more"
                appearDelay={0}
                files={QUARK_FILES}
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
                meta="Меню · Профиль · 24/7"
                tone="dark"
                art={EMERALD_CANOPY_ART}
                seed={21}
                width={folderWidth}
                action="more"
                appearDelay={70}
                files={QUARKAPP_FILES}
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
                meta={FEATURED_TRACK.artist}
                tone="dark"
                art={PINE_STREAK_ART}
                seed={14}
                width={folderWidth}
                action="more"
                appearDelay={140}
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

        <footer className="site-footer">
          <span className="footer-copy tabular-nums">
            © {CURRENT_YEAR} {PROFILE.name}
          </span>
          <span className="footer-meta">QUARK</span>
        </footer>
      </div>
    </section>
  );
}
