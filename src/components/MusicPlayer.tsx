import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ExternalLink, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { FEATURED_TRACK } from '../data/profile';
import './MusicPlayer.css';

// Relative 40-bar envelope normalized from 8 миля RMS dynamics
const WAVEFORM_BARS = [
  0.34, 0.56, 0.42, 0.68, 0.48, 0.38, 0.52, 0.74, 0.88, 0.62,
  1.0, 0.54, 0.86, 0.46, 0.66, 0.58, 0.78, 0.64, 0.52, 0.92,
  0.48, 0.82, 0.36, 0.68, 0.42, 0.84, 0.94, 0.56, 0.96, 0.44,
  0.86, 0.4, 0.64, 0.5, 0.88, 0.82, 0.32, 0.58, 0.84, 0.96,
];

function formatTime(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function MusicPlayer({ embedded = false }: { embedded?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(FEATURED_TRACK.durationSeconds);
  const [liveEnergy, setLiveEnergy] = useState<number[]>(() => WAVEFORM_BARS.map(() => 0));

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrubRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (!isPlaying || shouldReduceMotion) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setLiveEnergy(WAVEFORM_BARS.map(() => 0));
      return;
    }

    const analyser = analyserRef.current;
    const freqData = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const tick = (now: number) => {
      if (analyser && freqData) {
        analyser.getByteFrequencyData(freqData);
        const usableBins = Math.max(1, Math.floor(freqData.length * 0.65));
        const next = WAVEFORM_BARS.map((_, i) => {
          const binIdx = Math.min(usableBins - 1, Math.floor((i / WAVEFORM_BARS.length) * usableBins));
          return freqData[binIdx] / 255;
        });
        setLiveEnergy(next);
      } else {
        const t = now * 0.0055;
        setLiveEnergy(
          WAVEFORM_BARS.map((_, i) => 0.35 + 0.35 * Math.sin(t + i * 0.55)),
        );
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const ensureAnalyser = () => {
    const audioEl = audioRef.current;
    if (!audioEl || sourceNodeRef.current) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const source = ctx.createMediaElementSource(audioEl);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.78;

      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceNodeRef.current = source;
    } catch {
      // Playback continues normally via native audio element
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

    ensureAnalyser();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume().catch(() => {});
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
      transition={{ duration: 0.5, delay: embedded && !shouldReduceMotion ? 0.28 : 0, ease: [0.23, 1, 0.32, 1] }}
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

      <div className="music-top-row">
        <div className="music-identity">
          <div className={`music-cover-wrap ${isPlaying ? 'is-playing' : ''}`}>
            <img
              src={FEATURED_TRACK.cover}
              alt={`${FEATURED_TRACK.artist} — ${FEATURED_TRACK.title}`}
              className="music-cover-img"
              loading="eager"
            />
          </div>

          <div className="music-meta">
            <div className="music-title-line">
              <h2 className="music-track-title">{FEATURED_TRACK.title}</h2>
              <span
                className={`music-live-eq ${isPlaying ? 'is-active' : ''}`}
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
              </span>
            </div>
            <p className="music-track-artist">{FEATURED_TRACK.artist}</p>
          </div>
        </div>

        <div className="music-actions">
          <button
            type="button"
            className="music-mute-btn tactile"
            onClick={() => setIsMuted((m) => !m)}
            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <a
            href={FEATURED_TRACK.soundcloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="music-sc-link tactile"
            aria-label="Открыть трек на SoundCloud"
          >
            <span className="music-sc-full">SoundCloud</span>
            <span className="music-sc-short" aria-hidden="true">SC</span>
            <ExternalLink size={14} strokeWidth={2} />
          </a>

          <button
            type="button"
            className="music-play-btn tactile"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="translate-x-[1px]" />
            )}
          </button>
        </div>
      </div>

      <div className="music-scrubber-row">
        <span className="music-time-label tabular-nums">{formatTime(currentTime)}</span>

        <div
          ref={scrubRef}
          className="music-waveform-hitbox"
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
          <div className="music-waveform" aria-hidden="true">
            {WAVEFORM_BARS.map((baseAmp, idx) => {
              const barPct = ((idx + 0.5) / WAVEFORM_BARS.length) * 100;
              const isPlayed = progress > 0 && barPct <= progress;
              const boost = isPlaying ? liveEnergy[idx] * 0.28 : 0;
              const heightPx = Math.round(Math.min(28, Math.max(6, (baseAmp + boost) * 26)));

              return (
                <span
                  key={idx}
                  className={`music-wave-bar ${isPlayed ? 'is-played' : ''}`}
                  style={{ height: `${heightPx}px` }}
                />
              );
            })}
          </div>
        </div>

        <span className="music-time-label music-time-end tabular-nums">{formatTime(duration)}</span>
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
