import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, ChevronDown, Disc3 } from 'lucide-react';
import { GlassButton } from '@/components/ui/glass-button';
import { QuarkLogo } from './QuarkLogo';
import { PROFILE } from '../data/profile';
import './Hero.css';

interface GiftNode {
  id: string;
  name: string;
  src: string;
  shape: 'squircle' | 'orb';
  tint: string;
  desktopPos: { top: string; left?: string; right?: string };
  mobilePos?: { top?: string; bottom?: string; left?: string; right?: string };
  size: number;
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
    shape: 'squircle',
    tint: 'rgba(71, 184, 120, 0.24)',
    desktopPos: { top: '14%', left: '8%' },
    mobilePos: { top: '5%', left: '5%' },
    size: 98,
    floatVariant: 'a',
    floatDuration: 6.2,
    floatDelay: 0,
    depth: 18,
    rotate: -7,
    mobileVisible: true,
  },
  {
    id: 'durovs-cap',
    name: "Durov's Cap",
    src: "https://cdn.changes.tg/gifts/models/Durov's%20Cap/png/Original.png",
    shape: 'orb',
    tint: 'rgba(94, 168, 125, 0.22)',
    desktopPos: { top: '13%', right: '9%' },
    mobilePos: { top: '4%', right: '5%' },
    size: 90,
    floatVariant: 'b',
    floatDuration: 7.0,
    floatDelay: -1.6,
    depth: 14,
    rotate: 6,
    mobileVisible: true,
  },
  {
    id: 'magic-potion',
    name: 'Magic Potion',
    src: 'https://cdn.changes.tg/gifts/models/Magic%20Potion/png/Original.png',
    shape: 'orb',
    tint: 'rgba(117, 223, 163, 0.2)',
    desktopPos: { top: '45%', left: '4%' },
    size: 84,
    floatVariant: 'b',
    floatDuration: 6.8,
    floatDelay: -2.4,
    depth: 22,
    rotate: -4,
  },
  {
    id: 'kissed-frog',
    name: 'Kissed Frog',
    src: 'https://cdn.changes.tg/gifts/models/Kissed%20Frog/png/Original.png',
    shape: 'squircle',
    tint: 'rgba(64, 160, 108, 0.24)',
    desktopPos: { top: '46%', right: '5%' },
    size: 92,
    floatVariant: 'a',
    floatDuration: 7.4,
    floatDelay: -0.9,
    depth: 20,
    rotate: 8,
  },
  {
    id: 'signet-ring',
    name: 'Signet Ring',
    src: 'https://cdn.changes.tg/gifts/models/Signet%20Ring/png/Original.png',
    shape: 'squircle',
    tint: 'rgba(167, 132, 58, 0.22)',
    desktopPos: { top: '74%', left: '10%' },
    mobilePos: { bottom: '7%', left: '6%' },
    size: 86,
    floatVariant: 'b',
    floatDuration: 6.6,
    floatDelay: -3.1,
    depth: 16,
    rotate: 5,
    mobileVisible: true,
  },
  {
    id: 'scared-cat',
    name: 'Scared Cat',
    src: 'https://cdn.changes.tg/gifts/models/Scared%20Cat/png/Original.png',
    shape: 'orb',
    tint: 'rgba(132, 196, 158, 0.2)',
    desktopPos: { top: '73%', right: '10%' },
    mobilePos: { bottom: '6%', right: '6%' },
    size: 88,
    floatVariant: 'a',
    floatDuration: 6.1,
    floatDelay: -1.8,
    depth: 17,
    rotate: -6,
    mobileVisible: true,
  },
  {
    id: 'eternal-rose',
    name: 'Eternal Rose',
    src: 'https://cdn.changes.tg/gifts/models/Eternal%20Rose/png/Original.png',
    shape: 'orb',
    tint: 'rgba(84, 158, 122, 0.18)',
    desktopPos: { top: '24%', left: '21%' },
    size: 68,
    floatVariant: 'a',
    floatDuration: 7.9,
    floatDelay: -2.9,
    depth: 10,
    rotate: -5,
  },
  {
    id: 'precious-peach',
    name: 'Precious Peach',
    src: 'https://cdn.changes.tg/gifts/models/Precious%20Peach/png/Original.png',
    shape: 'squircle',
    tint: 'rgba(182, 146, 92, 0.18)',
    desktopPos: { top: '25%', right: '21%' },
    size: 70,
    floatVariant: 'b',
    floatDuration: 7.5,
    floatDelay: -4.2,
    depth: 11,
    rotate: 7,
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.14]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const giftsY = useTransform(scrollYProgress, [0, 1], [0, -48]);

  const headlineLines = PROFILE.heroTitle.split('\n');

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointer({ x: nx, y: ny });
  };

  const handlePointerLeave = () => {
    setPointer({ x: 0, y: 0 });
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
          backgroundImage: `url('./assets/quark/quark-coming-soon.jpg')`,
        }}
        aria-hidden="true"
      />
      <div className="hero-canopy-glow" aria-hidden="true" />
      <div className="hero-bg-vignette" aria-hidden="true" />

      {/* Floating Glass NFT Gifts Layer */}
      <motion.div
        className="hero-gifts-layer"
        style={shouldReduceMotion ? undefined : { opacity, scale, y: giftsY }}
        aria-hidden="true"
      >
        {FLOATING_GIFTS.map((gift, idx) => {
          const offsetX = shouldReduceMotion ? 0 : pointer.x * gift.depth;
          const offsetY = shouldReduceMotion ? 0 : pointer.y * gift.depth;

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
              key={gift.id}
              className={`gift-anchor ${gift.mobileVisible ? 'is-mobile-visible' : ''}`}
              style={anchorVars}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.7, filter: 'blur(8px)' }
              }
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 0.65,
                delay: shouldReduceMotion ? 0 : 0.1 + idx * 0.055,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div
                className="gift-parallax"
                style={{
                  transform: `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0)`,
                }}
              >
                <motion.div
                  className={`gift-card gift-${gift.shape} gift-float-${gift.floatVariant}`}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: 0 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  style={
                    {
                      width: gift.size,
                      height: gift.size,
                      '--gift-tint': gift.tint,
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
                  <span className="gift-label-pill">{gift.name}</span>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Centered Focal Content */}
      <motion.div
        className="container hero-content"
        style={shouldReduceMotion ? undefined : { scale, opacity, y }}
      >
        <motion.div
          className="hero-status-row"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          <a
            href={PROFILE.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-availability tactile"
          >
            <QuarkLogo size={15} />
            <span>{PROFILE.availability}</span>
          </a>
        </motion.div>

        <h1 className="type-hero hero-title">
          {headlineLines.map((line, i) => (
            <motion.span
              key={line}
              className="hero-title-line"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 22, filter: 'blur(10px)' }
              }
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.65,
                delay: shouldReduceMotion ? 0 : 0.08 + i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="type-body hero-subtitle"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: shouldReduceMotion ? 0 : 0.22,
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
            delay: shouldReduceMotion ? 0 : 0.3,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <GlassButton
            type="button"
            size="default"
            contentClassName="flex items-center gap-2"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Проект QUARK</span>
            <ArrowDownRight size={17} strokeWidth={2} />
          </GlassButton>

          <GlassButton
            type="button"
            size="default"
            contentClassName="flex items-center gap-2"
            onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Disc3 size={17} strokeWidth={1.8} />
            <span>Слушать трек</span>
          </GlassButton>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        className="hero-scroll-cue"
        aria-label="Прокрутить вниз"
        onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <ChevronDown size={18} strokeWidth={1.8} />
      </motion.button>
    </section>
  );
}
