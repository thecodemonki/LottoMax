import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer() {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && !muted) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(e => {
        console.log("Audio play failed, requiring user gesture:", e);
        setMuted(true);
      });
      let vol = 0;
      const interval = setInterval(() => {
        if (vol < 0.3) {
          vol += 0.05;
          audioRef.current.volume = Math.min(vol, 0.3);
        } else {
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    } else if (audioRef.current && muted) {
        audioRef.current.pause();
    }
  }, [muted]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center bg-white/90 backdrop-blur-sm p-2 pr-4 rounded-full shadow-lg border border-slate-200 transition-all hover:scale-105">
      <audio ref={audioRef} src="/style.mp3" loop />
      
      <button 
        onClick={() => setMuted(!muted)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3498db] text-white shadow-md hover:bg-[#2980b9] transition-colors focus:outline-none"
        aria-label={muted ? "Play music" : "Pause music"}
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      
      <div className="ml-3 flex flex-col justify-center">
        <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
          <Music size={10} className={!muted ? "animate-pulse text-[#3498db]" : "text-slate-400"} />
          {!muted ? "Now Playing" : "Ready to Play"}
        </span>
        <span className="text-sm font-medium text-slate-600 truncate max-w-[140px]">
          Style - Taylor Swift
        </span>
      </div>
    </div>
  );
}
