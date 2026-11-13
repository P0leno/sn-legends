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
import { ArrowDownRight, ChevronDown, Disc3, Send } from 'lucide-react';
import { GlassButton } from '@/components/ui/glass-button';
import { PROFILE } from '../data/profile';
import './Hero.css';

interface GiftNode {
  id: string;
  name: string;
  src: string;
  shape: 'squircle' | 'orb';
  layer: 'near' | 'mid' | 'far';
  tint: string;
  borderTint: string;
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
    layer: 'near',
    tint: 'rgba(212, 165, 58, 0.28)',
    borderTint: 'rgba(240, 200, 102, 0.44)',
    desktopPos: { top: '12%', left: '7%' },
    mobilePos: { top: 'max(18px, env(safe-area-inset-top, 18px))', left: '4%' },
    size: 108,
    floatVariant: 'a',
    floatDuration: 6.2,
    floatDelay: 0,
    depth: 22,
    rotate: -7,
    mobileVisible: true,
  },
  {
    id: 'durovs-cap',
    name: "Durov's Cap",
    src: "https://cdn.changes.tg/gifts/models/Durov's%20Cap/png/Original.png",
    shape: 'orb',
    layer: 'mid',
    tint: 'rgba(56, 168, 134, 0.26)',
    borderTint: 'rgba(98, 212, 178, 0.4)',
    desktopPos: { top: '12%', right: '8%' },
    mobilePos: { top: 'max(18px, env(safe-area-inset-top, 18px))', right: '4%' },
    size: 96,
    floatVariant: 'b',
    floatDuration: 7.0,
    floatDelay: -1.6,
    depth: 16,
    rotate: 6,
    mobileVisible: true,
  },
  {
    id: 'magic-potion',
    name: 'Magic Potion',
    src: 'https://cdn.changes.tg/gifts/models/Magic%20Potion/png/Original.png',
    shape: 'orb',
    layer: 'mid',
    tint: 'rgba(148, 98, 214, 0.26)',
    borderTint: 'rgba(186, 142, 246, 0.4)',
    desktopPos: { top: '45%', left: '4%' },
    size: 84,
    floatVariant: 'b',
    floatDuration: 6.8,
    floatDelay: -2.4,
    depth: 18,
    rotate: -4,
  },
  {
    id: 'kissed-frog',
    name: 'Kissed Frog',
    src: 'https://cdn.changes.tg/gifts/models/Kissed%20Frog/png/Original.png',
    shape: 'squircle',
    layer: 'near',
    tint: 'rgba(62, 196, 118, 0.28)',
    borderTint: 'rgba(108, 232, 158, 0.42)',
    desktopPos: { top: '46%', right: '5%' },
    size: 104,
    floatVariant: 'a',
    floatDuration: 7.4,
    floatDelay: -0.9,
    depth: 24,
    rotate: 8,
  },
  {
    id: 'signet-ring',
    name: 'Signet Ring',
    src: 'https://cdn.changes.tg/gifts/models/Signet%20Ring/png/Original.png',
    shape: 'squircle',
    layer: 'mid',
    tint: 'rgba(224, 168, 62, 0.26)',
    borderTint: 'rgba(246, 198, 104, 0.42)',
    desktopPos: { top: '74%', left: '10%' },
    mobilePos: { bottom: '68px', left: '5%' },
    size: 88,
    floatVariant: 'b',
    floatDuration: 6.6,
    floatDelay: -3.1,
    depth: 17,
    rotate: 5,
    mobileVisible: true,
  },
  {
    id: 'scared-cat',
    name: 'Scared Cat',
    src: 'https://cdn.changes.tg/gifts/models/Scared%20Cat/png/Original.png',
    shape: 'orb',
    layer: 'mid',
    tint: 'rgba(196, 88, 154, 0.24)',
    borderTint: 'rgba(232, 132, 194, 0.38)',
    desktopPos: { top: '73%', right: '10%' },
    mobilePos: { bottom: '68px', right: '5%' },
    size: 92,
    floatVariant: 'a',
    floatDuration: 6.1,
    floatDelay: -1.8,
    depth: 18,
    rotate: -6,
    mobileVisible: true,
  },
  {
    id: 'eternal-rose',
    name: 'Eternal Rose',
    src: 'https://cdn.changes.tg/gifts/models/Eternal%20Rose/png/Original.png',
    shape: 'orb',
    layer: 'far',
    tint: 'rgba(208, 92, 118, 0.22)',
    borderTint: 'rgba(236, 138, 160, 0.3)',
    desktopPos: { top: '24%', left: '21%' },
    size: 62,
    floatVariant: 'a',
    floatDuration: 7.9,
    floatDelay: -2.9,
    depth: 9,
    rotate: -5,
  },
  {
    id: 'precious-peach',
    name: 'Precious Peach',
    src: 'https://cdn.changes.tg/gifts/models/Precious%20Peach/png/Original.png',
    shape: 'squircle',
    layer: 'far',
    tint: 'rgba(232, 148, 86, 0.22)',
    borderTint: 'rgba(246, 178, 126, 0.3)',
    desktopPos: { top: '25%', right: '21%' },
    size: 64,
    floatVariant: 'b',
    floatDuration: 7.5,
    floatDelay: -4.2,
    depth: 10,
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
    '--mob-top': gift.mobilePos?.top ?? 'auto',
    '--mob-bottom': gift.mobilePos?.bottom ?? 'auto',
    '--mob-left': gift.mobilePos?.left ?? 'auto',
    '--mob-right': gift.mobilePos?.right ?? 'auto',
  } as React.CSSProperties;

  return (
    <motion.div
      className={`gift-anchor gift-layer-${gift.layer} ${gift.mobileVisible ? 'is-mobile-visible' : ''}`}
      style={anchorVars}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.78, filter: 'blur(8px)' }
      }
      animate={{
        opacity: gift.layer === 'far' ? 0.78 : 1,
        scale: 1,
        filter: 'blur(0px)',
      }}
      transition={{
        duration: 0.65,
        delay: shouldReduceMotion ? 0 : 0.08 + index * 0.05,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <motion.div className="gift-parallax" style={{ x, y }}>
        <motion.div
          className={`gift-card gift-${gift.shape} gift-float-${gift.floatVariant}`}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.1, rotate: 0 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 360, damping: 24 }}
          style={
            {
              width: gift.size,
              height: gift.size,
              '--gift-tint': gift.tint,
              '--gift-border': gift.borderTint,
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

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.16]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 52]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const giftsY = useTransform(scrollYProgress, [0, 1], [0, -44]);

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

      {/* Centered Focal Content (no eyebrow above h1) */}
      <motion.div
        className="container hero-content"
        style={shouldReduceMotion ? undefined : { scale, opacity, y }}
      >
        <motion.h1
          className="type-hero hero-title"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 20, filter: 'blur(8px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {PROFILE.heroTitle}
        </motion.h1>

        <motion.p
          className="type-body hero-subtitle"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: shouldReduceMotion ? 0 : 0.14,
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
            delay: shouldReduceMotion ? 0 : 0.22,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <GlassButton
            type="button"
            size="default"
            contentClassName="flex items-center gap-2"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Смотреть QUARK</span>
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

          <a
            href={PROFILE.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-handle-link tactile"
          >
            <Send size={14} strokeWidth={2} />
            <span>{PROFILE.handle}</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        className="hero-scroll-cue"
        aria-label="Прокрутить вниз"
        onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.72 }}
        transition={{ delay: 0.65, duration: 0.55 }}
      >
        <ChevronDown size={18} strokeWidth={1.8} />
      </motion.button>
    </section>
  );
}
