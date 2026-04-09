import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Music2 } from 'lucide-react';

const TRACK = { title: 'Style', artist: 'Taylor Swift', src: '/Taylor Swift - Style.mp3' };

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayer() {
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const playing = !muted;

  const syncTime = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    setCurrentTime(el.currentTime);
    if (Number.isFinite(el.duration)) setDuration(el.duration);
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onLoaded = () => {
      setDuration(el.duration || 0);
    };
    el.addEventListener('loadedmetadata', onLoaded);
    el.addEventListener('timeupdate', syncTime);
    return () => {
      el.removeEventListener('loadedmetadata', onLoaded);
      el.removeEventListener('timeupdate', syncTime);
    };
  }, [syncTime]);

  useEffect(() => {
    if (audioRef.current && !muted) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => {
        setMuted(true);
      });
      let vol = 0;
      const interval = setInterval(() => {
        if (vol < 0.3) {
          vol += 0.05;
          if (audioRef.current) audioRef.current.volume = Math.min(vol, 0.3);
        } else {
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
    if (audioRef.current && muted) {
      audioRef.current.pause();
    }
  }, [muted]);

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const seek = (e) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    el.currentTime = (x / rect.width) * duration;
    syncTime();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[min(100vw-2rem,29rem)] select-none">
      <audio ref={audioRef} src={TRACK.src} loop preload="metadata" />

      <div
        className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#121212] px-4 pb-4 pt-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/5"
        role="region"
        aria-label="Music player"
      >
        <div
          className="relative h-14 w-14 shrink-0 self-center overflow-hidden rounded-md bg-gradient-to-br from-[#1db954]/30 via-[#191414] to-[#535353]"
          aria-hidden
        >
          <Music2 className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-white/90" strokeWidth={1.5} />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-1.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold leading-snug text-white">{TRACK.title}</p>
              <p className="truncate text-xs leading-snug text-[#b3b3b3]">{TRACK.artist}</p>
            </div>
            <button
              type="button"
              onClick={() => setMuted(!muted)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1db954] text-[#121212] shadow-md transition hover:scale-105 hover:bg-[#1ed760] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="group relative h-1 w-full cursor-pointer rounded-full bg-[#4d4d4d]"
              onClick={seek}
              aria-label="Seek track"
            >
              <span
                className="absolute left-0 top-0 h-full rounded-full bg-[#b3b3b3] transition-[width] group-hover:bg-[#1db954]"
                style={{ width: `${progressPct}%` }}
              />
            </button>
            <div className="flex justify-between px-2 font-mono text-[11px] tabular-nums leading-none text-[#727272]">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
