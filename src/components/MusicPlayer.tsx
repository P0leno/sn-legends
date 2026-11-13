import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  SFArrowUpRightIcon,
  SFPauseIcon,
  SFPlayIcon,
  SFSpeakerSlashIcon,
  SFSpeakerWaveIcon,
} from '@/components/ui/sf-icons';
import { FEATURED_TRACK } from '../data/profile';
import './MusicPlayer.css';

function formatTime(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${s < 10 ? `0${s}` : s}`;
}

export function MusicPlayer({ embedded = false }: { embedded?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [duration, setDuration] = useState(FEATURED_TRACK.durationSeconds);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrubRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const thumbRailRef = useRef<HTMLDivElement | null>(null);
  const timeTextRef = useRef<HTMLSpanElement | null>(null);
  const currentTimeRef = useRef(0);
  const lastRenderedSecRef = useRef(-1);
  const draggingRef = useRef(false);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [isMuted, volume]);

  const applyVisualProgress = (sec: number, totalDuration: number) => {
    currentTimeRef.current = sec;
    const ratio = totalDuration > 0 ? Math.min(1, Math.max(0, sec / totalDuration)) : 0;

    if (fillRef.current) {
      fillRef.current.style.transform = `scaleX(${ratio})`;
    }
    if (thumbRailRef.current) {
      thumbRailRef.current.style.transform = `translate3d(${ratio * 100}%, 0, 0)`;
    }

    const wholeSec = Math.max(0, Math.floor(sec));
    if (wholeSec !== lastRenderedSecRef.current) {
      lastRenderedSecRef.current = wholeSec;
      if (timeTextRef.current) {
        timeTextRef.current.textContent = formatTime(wholeSec);
      }
      if (scrubRef.current) {
        scrubRef.current.setAttribute('aria-valuenow', String(wholeSec));
      }
    }
  };

  const togglePlay = async () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (isPlaying) {
      audioEl.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioEl.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const seekToRatio = (ratio: number) => {
    const clamped = Math.min(1, Math.max(0, ratio));
    const next = clamped * duration;
    applyVisualProgress(next, duration);
    if (audioRef.current) {
      audioRef.current.currentTime = next;
    }
  };

  const seekFromClientX = (clientX: number) => {
    const el = scrubRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    seekToRatio((clientX - rect.left) / rect.width);
  };

  const handleScrubPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    seekFromClientX(e.clientX);
  };

  const handleScrubPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    seekFromClientX(e.clientX);
  };

  const handleScrubPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleScrubKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (duration <= 0) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      seekToRatio((currentTimeRef.current + 5) / duration);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      seekToRatio((currentTimeRef.current - 5) / duration);
    } else if (e.key === 'Home') {
      e.preventDefault();
      seekToRatio(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      seekToRatio(1);
    }
  };

  const widget = (
    <motion.div
      className={`music-widget ${isDragging ? 'is-dragging' : ''}`}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={embedded ? { opacity: 1, y: 0 } : undefined}
      whileInView={embedded ? undefined : { opacity: 1, y: 0 }}
      viewport={embedded ? undefined : { once: true, amount: 0.2 }}
      transition={{ duration: 0.36, delay: embedded && !shouldReduceMotion ? 0.14 : 0, ease: [0.23, 1, 0.32, 1] }}
    >
      <audio
        ref={audioRef}
        src={FEATURED_TRACK.audioSrc}
        preload="metadata"
        onLoadedMetadata={() => {
          if (audioRef.current && Number.isFinite(audioRef.current.duration) && audioRef.current.duration > 0) {
            setDuration(audioRef.current.duration);
          }
        }}
        onTimeUpdate={() => {
          if (audioRef.current && !draggingRef.current) {
            applyVisualProgress(audioRef.current.currentTime, duration);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          applyVisualProgress(0, duration);
        }}
      />

      {/* Row 1: Cover + Full Track Identity + SoundCloud link */}
      <div className="music-identity-row">
        <div className={`music-cover-wrap ${isPlaying ? 'is-playing' : ''}`}>
          <img
            src={FEATURED_TRACK.cover}
            alt={`${FEATURED_TRACK.artist} — ${FEATURED_TRACK.title}`}
            className="music-cover-img"
            loading="eager"
            decoding="async"
          />
          <span className={`music-cover-eq ${isPlaying ? 'is-active' : ''}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </div>

        <div className="music-meta">
          <h2 className="music-track-title">{FEATURED_TRACK.title}</h2>
          <p className="music-track-artist">{FEATURED_TRACK.artist}</p>
        </div>

        <a
          href={FEATURED_TRACK.soundcloudUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="music-sc-link tactile"
          aria-label="Открыть трек на SoundCloud"
        >
          <span>SoundCloud</span>
          <SFArrowUpRightIcon size={14} />
        </a>
      </div>

      {/* Row 2: Play/Pause + Composite-Only Scrubber + Volume */}
      <div className="music-transport-row">
        <button
          type="button"
          className="music-play-btn tactile"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
        >
          {isPlaying ? (
            <SFPauseIcon size={18} />
          ) : (
            <SFPlayIcon size={18} className="translate-x-[1px]" />
          )}
        </button>

        <div className="music-progress-block">
          <div
            ref={scrubRef}
            className="music-progress-hitbox"
            role="slider"
            tabIndex={0}
            aria-label="Перемотка трека"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={0}
            onPointerDown={handleScrubPointerDown}
            onPointerMove={handleScrubPointerMove}
            onPointerUp={handleScrubPointerEnd}
            onPointerCancel={handleScrubPointerEnd}
            onKeyDown={handleScrubKeyDown}
          >
            <div className="music-progress-track">
              <div className="music-progress-clip">
                <div
                  ref={fillRef}
                  className="music-progress-fill"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
              <div
                ref={thumbRailRef}
                className="music-progress-thumb-rail"
                style={{ transform: 'translate3d(0%, 0, 0)' }}
                aria-hidden="true"
              >
                <span className="music-progress-thumb" />
              </div>
            </div>
          </div>

          <div className="music-time-row tabular-nums">
            <span ref={timeTextRef}>0:00</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="music-volume-group">
          <button
            type="button"
            className="music-mute-btn tactile"
            onClick={() => setIsMuted((m) => !m)}
            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
          >
            {isMuted || volume === 0 ? <SFSpeakerSlashIcon size={16} /> : <SFSpeakerWaveIcon size={16} />}
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              const nextVol = Number(e.target.value);
              setVolume(nextVol);
              if (nextVol > 0 && isMuted) setIsMuted(false);
            }}
            className="music-volume-slider"
            aria-label="Громкость"
          />
        </div>
      </div>
    </motion.div>
  );

  if (embedded) {
    return (
      <div id="music" className="music-embedded-wrap" aria-label="Аудиоплеер">
        {widget}
      </div>
    );
  }

  return (
    <section id="music" className="music-section" aria-label="Аудиоплеер">
      <div className="container">{widget}</div>
    </section>
  );
}
