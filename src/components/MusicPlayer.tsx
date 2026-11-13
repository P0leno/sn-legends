import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ExternalLink, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { FEATURED_TRACK } from '../data/profile';
import './MusicPlayer.css';

const BAR_HEIGHTS = [0.38, 0.72, 0.54, 0.92, 0.45, 0.81, 0.64, 0.96, 0.52, 0.78, 0.42, 0.88, 0.61, 0.74, 0.49, 0.85, 0.58, 0.4];

function formatTime(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function MusicPlayer() {
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(FEATURED_TRACK.durationSeconds);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const tickRef = useRef<number | null>(null);
  const scrubRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const hasAudioFile = Boolean(FEATURED_TRACK.audioSrc);

  useEffect(() => {
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
      if (synthCtxRef.current) {
        synthCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
    if (synthGainRef.current && synthCtxRef.current) {
      synthGainRef.current.gain.setTargetAtTime(
        isMuted ? 0 : 0.06,
        synthCtxRef.current.currentTime,
        0.04,
      );
    }
  }, [isMuted]);

  const stopSynth = () => {
    if (tickRef.current) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (synthGainRef.current && synthCtxRef.current) {
      synthGainRef.current.gain.setTargetAtTime(0, synthCtxRef.current.currentTime, 0.08);
    }
  };

  const startSynth = () => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!synthCtxRef.current) {
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.value = 0;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 420;

      const freqs = [73.42, 110.0, 174.61];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.value = f;
        osc.connect(filter);
        osc.start();
      });

      filter.connect(master);
      master.connect(ctx.destination);

      synthCtxRef.current = ctx;
      synthGainRef.current = master;
    }

    if (synthCtxRef.current.state === 'suspended') {
      synthCtxRef.current.resume().catch(() => {});
    }
    if (synthGainRef.current) {
      synthGainRef.current.gain.setTargetAtTime(
        isMuted ? 0 : 0.06,
        synthCtxRef.current.currentTime,
        0.12,
      );
    }

    if (tickRef.current) window.clearInterval(tickRef.current);
    tickRef.current = window.setInterval(() => {
      setCurrentTime((prev) => (prev + 1 >= duration ? 0 : prev + 1));
    }, 1000);
  };

  const togglePlay = async () => {
    if (hasAudioFile && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
      return;
    }

    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      startSynth();
      setIsPlaying(true);
    }
  };

  const seekFromClientX = (clientX: number) => {
    const el = scrubRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const next = ratio * duration;
    setCurrentTime(next);
    if (hasAudioFile && audioRef.current) {
      audioRef.current.currentTime = next;
    }
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

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <section id="music" className="music-section" aria-label="Аудиоплеер">
      <div className="container">
        <motion.div
          className="music-widget"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          {hasAudioFile && (
            <audio
              ref={audioRef}
              src={FEATURED_TRACK.audioSrc}
              preload="metadata"
              onLoadedMetadata={() => {
                if (audioRef.current && Number.isFinite(audioRef.current.duration)) {
                  setDuration(audioRef.current.duration);
                }
              }}
              onTimeUpdate={() => {
                if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
              }}
              onEnded={() => setIsPlaying(false)}
            />
          )}

          <div className="music-top-row">
            <div className="music-identity">
              <div className={`music-cover-wrap ${isPlaying ? 'is-playing' : ''}`}>
                <img
                  src={FEATURED_TRACK.cover}
                  alt={`${FEATURED_TRACK.artist} — ${FEATURED_TRACK.title}`}
                  className="music-cover-img"
                  loading="lazy"
                />
              </div>

              <div className="music-meta">
                <h2 className="music-track-title">{FEATURED_TRACK.title}</h2>
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

              <a
                href={FEATURED_TRACK.soundcloudUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="music-sc-link tactile"
                aria-label="Открыть трек на SoundCloud"
              >
                <span>SoundCloud</span>
                <ExternalLink size={13} strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="music-bottom-row">
            <div className="music-visualizer" aria-hidden="true">
              {BAR_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className={`music-bar ${isPlaying ? 'is-active' : ''}`}
                  style={
                    {
                      '--bar-h': `${Math.round(h * 100)}%`,
                      '--bar-delay': `${(i * 0.06).toFixed(2)}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            <div
              ref={scrubRef}
              className="music-progress-hitbox"
              role="slider"
              tabIndex={0}
              aria-label="Позиция трека"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(currentTime)}
              onPointerDown={handleScrubPointerDown}
              onPointerMove={handleScrubPointerMove}
              onPointerUp={handleScrubPointerEnd}
              onPointerCancel={handleScrubPointerEnd}
            >
              <div className="music-progress-track">
                <div className="music-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="music-time-row tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
