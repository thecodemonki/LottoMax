import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Music2 } from 'lucide-react';

const TRACK = { title: 'Style', artist: 'Taylor Swift', src: '/Taylor Swift - Style.mp3' };

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ isVisible = false }) {
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end select-none transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
      <audio ref={audioRef} src={TRACK.src} loop preload="metadata" />

      {/* Expanded Widget */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out origin-bottom-right ${isExpanded ? 'w-[min(100vw-2rem,29rem)] opacity-100 scale-100 mb-0' : 'w-14 opacity-0 scale-50 pointer-events-none absolute bottom-0 right-0'}`}
      >
        <div
          className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#121212] px-4 pb-4 pt-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/5 w-full relative"
          role="region"
          aria-label="Music player"
        >
          {/* Collapse Button (Chevron or X) */}
          <button 
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-3 text-[#b3b3b3] hover:text-white transition-colors"
            aria-label="Collapse player"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div
            className="relative h-14 w-14 shrink-0 self-center overflow-hidden rounded-md bg-gradient-to-br from-[#1db954]/30 via-[#191414] to-[#535353] cursor-pointer"
            onClick={() => setIsExpanded(false)}
            aria-label="Collapse player"
          >
            <Music2 className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-white/90" strokeWidth={1.5} />
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-1.5 mt-1">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold leading-snug text-white">{TRACK.title}</p>
                <p className="truncate text-xs leading-snug text-[#b3b3b3]">{TRACK.artist}</p>
              </div>
              <button
                type="button"
                onClick={() => setMuted(!muted)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1db954] text-[#121212] shadow-md transition hover:scale-105 hover:bg-[#1ed760] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 mr-4"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
              </button>
            </div>

            <div className="flex flex-col gap-1 pr-4">
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

      {/* Collapsed Button */}
      <button
        onClick={() => setIsExpanded(true)}
        className={`h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-[#1db954]/30 via-[#191414] to-[#535353] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all duration-500 ease-out hover:scale-105 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 ${!isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-50 absolute bottom-0 right-0 pointer-events-none'}`}
        aria-label="Expand player"
      >
        <Music2 className={`h-6 w-6 text-white/90 ${playing ? 'animate-pulse text-[#1db954]' : ''}`} strokeWidth={1.5} />
      </button>
    </div>
  );
}
