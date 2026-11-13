import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Send } from 'lucide-react';
import { GlassButton } from '@/components/ui/glass-button';
import { MusicPlayer } from './MusicPlayer';
import { QuarkLogo } from './QuarkLogo';
import { PROFILE } from '../data/profile';
import './Hero.css';

interface GiftNode {
  id: string;
  name: string;
  src: string;
  desktopPos: { top: string; left?: string; right?: string };
  size: number;
  floatVariant: 'a' | 'b';
  floatDuration: number;
  floatDelay: number;
  depth: number;
  rotate: number;
  mobileArcOffset?: number;
  mobileVisible?: boolean;
}

const FLOATING_GIFTS: GiftNode[] = [
  {
    id: 'plush-pepe',
    name: 'Plush Pepe',
    src: 'https://cdn.changes.tg/gifts/models/Plush%20Pepe/png/Original.png',
    desktopPos: { top: '14%', left: '8%' },
    size: 136,
    floatVariant: 'a',
    floatDuration: 6.2,
    floatDelay: 0,
    depth: 24,
    rotate: -9,
    mobileArcOffset: 10,
    mobileVisible: true,
  },
  {
    id: 'durovs-cap',
    name: "Durov's Cap",
    src: "https://cdn.changes.tg/gifts/models/Durov's%20Cap/png/Original.png",
    desktopPos: { top: '14%', right: '9%' },
    size: 114,
    floatVariant: 'b',
    floatDuration: 7.0,
    floatDelay: -1.6,
    depth: 18,
    rotate: 8,
    mobileArcOffset: 2,
    mobileVisible: true,
  },
  {
    id: 'magic-potion',
    name: 'Magic Potion',
    src: 'https://cdn.changes.tg/gifts/models/Magic%20Potion/png/Original.png',
    desktopPos: { top: '43%', left: '6%' },
    size: 110,
    floatVariant: 'b',
    floatDuration: 6.8,
    floatDelay: -2.4,
    depth: 20,
    rotate: -6,
  },
  {
    id: 'kissed-frog',
    name: 'Kissed Frog',
    src: 'https://cdn.changes.tg/gifts/models/Kissed%20Frog/png/Original.png',
    desktopPos: { top: '42%', right: '7%' },
    size: 132,
    floatVariant: 'a',
    floatDuration: 7.4,
    floatDelay: -0.9,
    depth: 24,
    rotate: 8,
    mobileArcOffset: -6,
    mobileVisible: true,
  },
  {
    id: 'signet-ring',
    name: 'Signet Ring',
    src: 'https://cdn.changes.tg/gifts/models/Signet%20Ring/png/Original.png',
    desktopPos: { top: '70%', left: '10%' },
    size: 108,
    floatVariant: 'b',
    floatDuration: 6.6,
    floatDelay: -3.1,
    depth: 18,
    rotate: 7,
  },
  {
    id: 'scared-cat',
    name: 'Scared Cat',
    src: 'https://cdn.changes.tg/gifts/models/Scared%20Cat/png/Original.png',
    desktopPos: { top: '69%', right: '11%' },
    size: 108,
    floatVariant: 'a',
    floatDuration: 6.1,
    floatDelay: -1.8,
    depth: 18,
    rotate: -6,
    mobileArcOffset: 2,
    mobileVisible: true,
  },
  {
    id: 'loot-bag',
    name: 'Loot Bag',
    src: 'https://cdn.changes.tg/gifts/models/Loot%20Bag/png/Original.png',
    desktopPos: { top: '53%', left: '19%' },
    size: 104,
    floatVariant: 'a',
    floatDuration: 6.9,
    floatDelay: -1.2,
    depth: 14,
    rotate: -7,
    mobileArcOffset: 10,
    mobileVisible: true,
  },
  {
    id: 'astral-shard',
    name: 'Astral Shard',
    src: 'https://cdn.changes.tg/gifts/models/Astral%20Shard/png/Original.png',
    desktopPos: { top: '52%', right: '19%' },
    size: 104,
    floatVariant: 'b',
    floatDuration: 7.2,
    floatDelay: -2.1,
    depth: 14,
    rotate: 7,
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
    '--mob-arc-y': `${gift.mobileArcOffset ?? 0}px`,
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
        <motion.div
          className={`gift-sprite gift-float-${gift.floatVariant}`}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: 0 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 360, damping: 24 }}
          style={
            {
              width: gift.size,
              height: gift.size,
              '--gift-rot': `${gift.rotate}deg`,
              '--float-dur': `${gift.floatDuration}s`,
              '--float-delay': `${gift.floatDelay}s`,
            } as React.CSSProperties
          }
        >
          <img
            src={gift.src}
            alt={gift.name}
            className="gift-img"
            loading="eager"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 110, damping: 18, mass: 0.8 });
  const springY = useSpring(rawY, { stiffness: 110, damping: 18, mass: 0.8 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const giftsY = useTransform(scrollYProgress, [0, 1], [0, -32]);

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
      ref={sectionRef}
      className="hero-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="hero-bg-forest"
        style={{
          ...(shouldReduceMotion ? {} : { y: bgY }),
          backgroundImage: `url('./assets/quark/forest-clean.jpg')`,
        }}
        aria-hidden="true"
      />
      <div className="hero-canopy-glow" aria-hidden="true" />
      <div className="hero-bg-vignette" aria-hidden="true" />

      {/* Unboxed Top Bar */}
      <header className="container hero-topbar-wrap">
        <div className="hero-topbar">
          <a href="#overview" className="topbar-brand tactile">
            <QuarkLogo size={24} />
            <span className="topbar-wordmark">{PROFILE.name}</span>
          </a>

          <nav className="topbar-nav" aria-label="Навигация по странице">
            <a href="#projects" className="topbar-link">QUARK</a>
            <a href="#contact" className="topbar-link">Telegram</a>
          </nav>

          <a
            href={PROFILE.quarkBot}
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-bot-cta tactile"
          >
            <span>@quarkgiftbot</span>
            <ArrowUpRight size={15} strokeWidth={2.2} />
          </a>
        </div>
      </header>

      {/* Free-Floating 3D Gifts (No backing boxes) */}
      <motion.div
        className="hero-gifts-layer"
        style={shouldReduceMotion ? undefined : { opacity, scale, y: giftsY }}
        aria-hidden="true"
      >
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
      </motion.div>

      {/* Centered Focal Stack + Rebuilt Music Player */}
      <motion.div
        className="container hero-content"
        style={shouldReduceMotion ? undefined : { scale, opacity, y }}
      >
        <motion.h1
          className="type-hero hero-title"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 18, filter: 'blur(8px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.05, ease: [0.23, 1, 0.32, 1] }}
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

        <motion.div
          className="hero-actions"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: shouldReduceMotion ? 0 : 0.18,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <GlassButton
            type="button"
            size="default"
            contentClassName="flex items-center justify-center gap-2"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Смотреть QUARK</span>
            <ArrowDownRight size={17} strokeWidth={2} />
          </GlassButton>

          <a
            href={PROFILE.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-handle-link tactile"
          >
            <Send size={15} strokeWidth={2} />
            <span>{PROFILE.handle}</span>
          </a>
        </motion.div>

        <MusicPlayer embedded />
      </motion.div>
    </section>
  );
}
