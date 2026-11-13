import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { SFArrowDownIcon, SFArrowUpRightIcon } from '@/components/ui/sf-icons';
import { ForestSpores } from './ForestSpores';
import { MusicPlayer } from './MusicPlayer';
import { QuarkLogo } from './QuarkLogo';
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
  opacity?: number;
  mobileVisible?: boolean;
}

const FLOATING_GIFTS: GiftNode[] = [
  {
    id: 'plush-pepe',
    name: 'Plush Pepe',
    src: 'https://cdn.changes.tg/gifts/models/Plush%20Pepe/png/Original.png',
    desktopPos: { top: '12%', left: '9%' },
    mobilePos: { top: '14%', left: '3%' },
    size: 134,
    mobileSize: 56,
    floatVariant: 'a',
    floatDuration: 6.2,
    floatDelay: 0,
    depth: 26,
    rotate: -14,
    opacity: 0.98,
    mobileVisible: true,
  },
  {
    id: 'durovs-cap',
    name: "Durov's Cap",
    src: "https://cdn.changes.tg/gifts/models/Durov's%20Cap/png/Original.png",
    desktopPos: { top: '21%', right: '7%' },
    mobilePos: { top: '17%', right: '4%' },
    size: 108,
    mobileSize: 46,
    floatVariant: 'b',
    floatDuration: 7.0,
    floatDelay: -1.6,
    depth: 20,
    rotate: 12,
    opacity: 0.95,
    mobileVisible: true,
  },
  {
    id: 'magic-potion',
    name: 'Magic Potion',
    src: 'https://cdn.changes.tg/gifts/models/Magic%20Potion/png/Original.png',
    desktopPos: { top: '48%', left: '5%' },
    size: 96,
    floatVariant: 'b',
    floatDuration: 6.8,
    floatDelay: -2.4,
    depth: 16,
    rotate: -17,
    opacity: 0.84,
  },
  {
    id: 'kissed-frog',
    name: 'Kissed Frog',
    src: 'https://cdn.changes.tg/gifts/models/Kissed%20Frog/png/Original.png',
    desktopPos: { top: '56%', right: '11%' },
    mobilePos: { bottom: '15%', left: '4%' },
    size: 130,
    mobileSize: 56,
    floatVariant: 'a',
    floatDuration: 7.4,
    floatDelay: -0.9,
    depth: 26,
    rotate: 11,
    opacity: 0.98,
    mobileVisible: true,
  },
  {
    id: 'signet-ring',
    name: 'Signet Ring',
    src: 'https://cdn.changes.tg/gifts/models/Signet%20Ring/png/Original.png',
    desktopPos: { top: '76%', left: '14%' },
    size: 94,
    floatVariant: 'b',
    floatDuration: 6.6,
    floatDelay: -3.1,
    depth: 16,
    rotate: 15,
    opacity: 0.86,
  },
  {
    id: 'scared-cat',
    name: 'Scared Cat',
    src: 'https://cdn.changes.tg/gifts/models/Scared%20Cat/png/Original.png',
    desktopPos: { top: '11%', right: '20%' },
    mobilePos: { bottom: '6%', right: '5%' },
    size: 92,
    mobileSize: 52,
    floatVariant: 'a',
    floatDuration: 6.1,
    floatDelay: -1.8,
    depth: 16,
    rotate: -11,
    opacity: 0.85,
    mobileVisible: true,
  },
  {
    id: 'loot-bag',
    name: 'Loot Bag',
    src: 'https://cdn.changes.tg/gifts/models/Loot%20Bag/png/Original.png',
    desktopPos: { top: '31%', left: '20%' },
    mobilePos: { top: '24%', left: '14%' },
    size: 86,
    mobileSize: 34,
    floatVariant: 'a',
    floatDuration: 6.9,
    floatDelay: -1.2,
    depth: 12,
    rotate: 9,
    opacity: 0.8,
    mobileVisible: true,
  },
  {
    id: 'astral-shard',
    name: 'Astral Shard',
    src: 'https://cdn.changes.tg/gifts/models/Astral%20Shard/png/Original.png',
    desktopPos: { top: '78%', right: '6%' },
    mobilePos: { bottom: '18%', right: '8%' },
    size: 114,
    mobileSize: 40,
    floatVariant: 'b',
    floatDuration: 7.2,
    floatDelay: -2.1,
    depth: 18,
    rotate: -14,
    opacity: 0.94,
    mobileVisible: true,
  },
];

interface FloatingGiftItemProps {
  gift: GiftNode;
  index: number;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  enableParallax: boolean;
  shouldReduceMotion: boolean;
}

function FloatingGiftItem({
  gift,
  index,
  springX,
  springY,
  enableParallax,
  shouldReduceMotion,
}: FloatingGiftItemProps) {
  const x = useTransform(springX, (v) => (enableParallax ? v * gift.depth : 0));
  const y = useTransform(springY, (v) => (enableParallax ? v * gift.depth : 0));

  const anchorVars = {
    '--desk-top': gift.desktopPos.top,
    '--desk-left': gift.desktopPos.left ?? 'auto',
    '--desk-right': gift.desktopPos.right ?? 'auto',
    '--mob-top': gift.mobilePos?.top ?? 'auto',
    '--mob-bottom': gift.mobilePos?.bottom ?? 'auto',
    '--mob-left': gift.mobilePos?.left ?? 'auto',
    '--mob-right': gift.mobilePos?.right ?? 'auto',
    '--gift-opacity': String(gift.opacity ?? 1),
  } as React.CSSProperties;

  const sprite = (
    <div
      className={`gift-sprite gift-float-${gift.floatVariant}`}
      style={
        {
          width: gift.size,
          height: gift.size,
          '--mob-size': `${gift.mobileSize ?? 52}px`,
          animationDuration: `${gift.floatDuration}s`,
          animationDelay: `${gift.floatDelay}s`,
        } as React.CSSProperties
      }
    >
      <img
        src={gift.src}
        alt=""
        className="gift-img"
        style={{ transform: `rotate(${gift.rotate}deg)` }}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </div>
  );

  return (
    <motion.div
      className={`gift-anchor ${gift.mobileVisible ? 'is-mobile-visible' : ''}`}
      style={anchorVars}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.42,
        delay: shouldReduceMotion ? 0 : 0.03 + index * 0.025,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {enableParallax ? (
        <motion.div className="gift-parallax" style={{ x, y }}>
          {sprite}
        </motion.div>
      ) : (
        sprite
      )}
    </motion.div>
  );
}

export function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [canParallax, setCanParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanParallax(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const enableParallax = canParallax && !shouldReduceMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.7 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.7 });
  const pointerRef = useRef({ x: 0.5, y: 0.45, active: false });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!enableParallax || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    rawX.set(nx * 2 - 1);
    rawY.set(ny * 2 - 1);
    pointerRef.current.x = nx;
    pointerRef.current.y = ny;
    pointerRef.current.active = true;
  };

  const handlePointerLeave = () => {
    if (!enableParallax) return;
    rawX.set(0);
    rawY.set(0);
    pointerRef.current.active = false;
  };

  return (
    <section
      id="overview"
      className="hero-section"
      onPointerMove={enableParallax ? handlePointerMove : undefined}
      onPointerLeave={enableParallax ? handlePointerLeave : undefined}
    >
      <div
        className="hero-bg-forest"
        style={{ backgroundImage: `url('./assets/quark/forest-clean.jpg')` }}
        aria-hidden="true"
      />
      <div className="hero-bg-vignette" aria-hidden="true" />

      <ForestSpores reducedMotion={shouldReduceMotion} pointerRef={enableParallax ? pointerRef : undefined} />

      {/* Balanced Unboxed Top Bar */}
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
              decoding="async"
              draggable={false}
            />
          </a>

          <a
            href={PROFILE.quarkBot}
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-handle tactile"
          >
            <span>@quarkgiftbot</span>
            <SFArrowUpRightIcon size={13} />
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
            enableParallax={enableParallax}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>

      {/* Centered Focal Stack + Signature Crest Halo + Frosted Music Player */}
      <div className="container hero-content">
        <div className="hero-crest-halo" aria-hidden="true">
          <QuarkLogo size={360} className="hero-crest-svg" />
        </div>

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
            duration: 0.52,
            delay: shouldReduceMotion ? 0 : 0.1,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {PROFILE.heroSubtitle}
        </motion.p>

        <MusicPlayer embedded />

        <motion.div
          className="hero-actions"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.48,
            delay: shouldReduceMotion ? 0 : 0.18,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <a
            href={PROFILE.quarkBot}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary tactile"
          >
            <QuarkLogo size={15} />
            <span>Открыть QuarkApp</span>
            <SFArrowUpRightIcon size={14} />
          </a>

          <a href="#quark" className="hero-cta-scroll tactile">
            <span>Скриншоты</span>
            <SFArrowDownIcon size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
