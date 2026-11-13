import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { MusicPlayer } from './MusicPlayer';
import { PROFILE } from '../data/profile';
import './Hero.css';

interface GiftNode {
  id: string;
  name: string;
  src: string;
  desktopPos: { top: string; left?: string; right?: string };
  mobilePos?: { top?: string; bottom?: string; left?: string; right?: string };
  size: number;
  mobileSize?: number;
  floatVariant: 'a' | 'b';
  floatDuration: number;
  floatDelay: number;
  depth: number;
  rotate: number;
  mobileVisible?: boolean;
}

const FLOATING_GIFTS: GiftNode[] = [
  {
    id: 'plush-pepe',
    name: 'Plush Pepe',
    src: 'https://cdn.changes.tg/gifts/models/Plush%20Pepe/png/Original.png',
    desktopPos: { top: '11%', left: '11%' },
    mobilePos: { top: '10%', left: '6%' },
    size: 132,
    mobileSize: 64,
    floatVariant: 'a',
    floatDuration: 6.2,
    floatDelay: 0,
    depth: 24,
    rotate: -14,
    mobileVisible: true,
  },
  {
    id: 'durovs-cap',
    name: "Durov's Cap",
    src: "https://cdn.changes.tg/gifts/models/Durov's%20Cap/png/Original.png",
    desktopPos: { top: '22%', right: '7%' },
    mobilePos: { top: '21%', right: '4%' },
    size: 106,
    mobileSize: 48,
    floatVariant: 'b',
    floatDuration: 7.0,
    floatDelay: -1.6,
    depth: 18,
    rotate: 12,
    mobileVisible: true,
  },
  {
    id: 'magic-potion',
    name: 'Magic Potion',
    src: 'https://cdn.changes.tg/gifts/models/Magic%20Potion/png/Original.png',
    desktopPos: { top: '48%', left: '5%' },
    size: 98,
    floatVariant: 'b',
    floatDuration: 6.8,
    floatDelay: -2.4,
    depth: 20,
    rotate: -17,
  },
  {
    id: 'kissed-frog',
    name: 'Kissed Frog',
    src: 'https://cdn.changes.tg/gifts/models/Kissed%20Frog/png/Original.png',
    desktopPos: { top: '57%', right: '14%' },
    mobilePos: { bottom: '19%', left: '5%' },
    size: 128,
    mobileSize: 60,
    floatVariant: 'a',
    floatDuration: 7.4,
    floatDelay: -0.9,
    depth: 24,
    rotate: 11,
    mobileVisible: true,
  },
  {
    id: 'signet-ring',
    name: 'Signet Ring',
    src: 'https://cdn.changes.tg/gifts/models/Signet%20Ring/png/Original.png',
    desktopPos: { top: '76%', left: '16%' },
    size: 96,
    floatVariant: 'b',
    floatDuration: 6.6,
    floatDelay: -3.1,
    depth: 18,
    rotate: 15,
  },
  {
    id: 'scared-cat',
    name: 'Scared Cat',
    src: 'https://cdn.changes.tg/gifts/models/Scared%20Cat/png/Original.png',
    desktopPos: { top: '8%', right: '21%' },
    mobilePos: { bottom: '8%', right: '7%' },
    size: 94,
    mobileSize: 56,
    floatVariant: 'a',
    floatDuration: 6.1,
    floatDelay: -1.8,
    depth: 18,
    rotate: -11,
    mobileVisible: true,
  },
  {
    id: 'loot-bag',
    name: 'Loot Bag',
    src: 'https://cdn.changes.tg/gifts/models/Loot%20Bag/png/Original.png',
    desktopPos: { top: '31%', left: '21%' },
    mobilePos: { top: '20%', left: '16%' },
    size: 88,
    mobileSize: 38,
    floatVariant: 'a',
    floatDuration: 6.9,
    floatDelay: -1.2,
    depth: 14,
    rotate: 9,
    mobileVisible: true,
  },
  {
    id: 'astral-shard',
    name: 'Astral Shard',
    src: 'https://cdn.changes.tg/gifts/models/Astral%20Shard/png/Original.png',
    desktopPos: { top: '79%', right: '5%' },
    mobilePos: { bottom: '20%', right: '9%' },
    size: 112,
    mobileSize: 42,
    floatVariant: 'b',
    floatDuration: 7.2,
    floatDelay: -2.1,
    depth: 14,
    rotate: -14,
    mobileVisible: true,
  },
];

interface FloatingGiftItemProps {
  gift: GiftNode;
  index: number;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  shouldReduceMotion: boolean;
}

function FloatingGiftItem({
  gift,
  index,
  springX,
  springY,
  shouldReduceMotion,
}: FloatingGiftItemProps) {
  const x = useTransform(springX, (v) => (shouldReduceMotion ? 0 : v * gift.depth));
  const y = useTransform(springY, (v) => (shouldReduceMotion ? 0 : v * gift.depth));

  const anchorVars = {
    '--desk-top': gift.desktopPos.top,
    '--desk-left': gift.desktopPos.left ?? 'auto',
    '--desk-right': gift.desktopPos.right ?? 'auto',
    '--mob-top': gift.mobilePos?.top ?? 'auto',
    '--mob-bottom': gift.mobilePos?.bottom ?? 'auto',
    '--mob-left': gift.mobilePos?.left ?? 'auto',
    '--mob-right': gift.mobilePos?.right ?? 'auto',
  } as React.CSSProperties;

  return (
    <motion.div
      className={`gift-anchor ${gift.mobileVisible ? 'is-mobile-visible' : ''}`}
      style={anchorVars}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.78 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.65,
        delay: shouldReduceMotion ? 0 : 0.05 + index * 0.04,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <motion.div className="gift-parallax" style={{ x, y }}>
        <div
          className={`gift-sprite gift-float-${gift.floatVariant}`}
          style={
            {
              width: gift.size,
              height: gift.size,
              '--mob-size': `${gift.mobileSize ?? 52}px`,
              '--gift-rot': `${gift.rotate}deg`,
              '--float-dur': `${gift.floatDuration}s`,
              '--float-delay': `${gift.floatDelay}s`,
            } as React.CSSProperties
          }
        >
          <img
            src={gift.src}
            alt=""
            className="gift-img"
            loading="eager"
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 110, damping: 18, mass: 0.8 });
  const springY = useSpring(rawY, { stiffness: 110, damping: 18, mass: 0.8 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      id="overview"
      className="hero-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="hero-bg-forest"
        style={{ backgroundImage: `url('./assets/quark/forest-clean.jpg')` }}
        aria-hidden="true"
      />
      <div className="hero-bg-vignette" aria-hidden="true" />

      {/* Unboxed Top Bar */}
      <header className="container hero-topbar-wrap">
        <div className="hero-topbar">
          <a
            href={PROFILE.quarkChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-brand tactile"
            aria-label="Канал Quark в Telegram (@quarkgift)"
          >
            <img
              src="./assets/quark/quark-wordmark.png"
              alt="Quark"
              className="topbar-wordmark-img"
              draggable={false}
            />
          </a>
        </div>
      </header>

      {/* Free-Floating 3D Gifts (Non-interactive) */}
      <div className="hero-gifts-layer" aria-hidden="true">
        {FLOATING_GIFTS.map((gift, idx) => (
          <FloatingGiftItem
            key={gift.id}
            gift={gift}
            index={idx}
            springX={springX}
            springY={springY}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>

      {/* Centered Focal Stack + Rebuilt Music Player */}
      <div className="container hero-content">
        <motion.h1
          className="type-hero hero-title"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.04, ease: [0.23, 1, 0.32, 1] }}
        >
          {PROFILE.heroTitle}
        </motion.h1>

        <motion.p
          className="type-body hero-subtitle"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: shouldReduceMotion ? 0 : 0.12,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {PROFILE.heroSubtitle}
        </motion.p>

        <MusicPlayer embedded />
      </div>
    </section>
  );
}
