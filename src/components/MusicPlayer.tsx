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
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(FEATURED_TRACK.durationSeconds);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrubRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [isMuted, volume]);

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
    setCurrentTime(next);
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
    e.currentTarget.setPointerCapture(e.pointerId);
    seekFromClientX(e.clientX);
  };

  const handleScrubPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    seekFromClientX(e.clientX);
  };

  const handleScrubPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleScrubKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (duration <= 0) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      seekToRatio((currentTime + 5) / duration);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      seekToRatio((currentTime - 5) / duration);
    } else if (e.key === 'Home') {
      e.preventDefault();
      seekToRatio(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      seekToRatio(1);
    }
  };

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const widget = (
    <motion.div
      className="music-widget"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
      animate={embedded ? { opacity: 1, y: 0, scale: 1 } : undefined}
      whileInView={embedded ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={embedded ? undefined : { once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay: embedded && !shouldReduceMotion ? 0.24 : 0, ease: [0.23, 1, 0.32, 1] }}
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
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
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

      {/* Row 2: Play/Pause + Smooth Scrubber with Thumb + Volume */}
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
            aria-valuenow={Math.round(currentTime)}
            onPointerDown={handleScrubPointerDown}
            onPointerMove={handleScrubPointerMove}
            onPointerUp={handleScrubPointerEnd}
            onPointerCancel={handleScrubPointerEnd}
            onKeyDown={handleScrubKeyDown}
          >
            <div className="music-progress-track">
              <div className="music-progress-fill" style={{ width: `${progress}%` }} />
              <span className="music-progress-thumb" style={{ left: `${progress}%` }} aria-hidden="true" />
            </div>
          </div>

          <div className="music-time-row tabular-nums">
            <span>{formatTime(currentTime)}</span>
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
