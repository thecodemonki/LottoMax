import { useState, useRef, useEffect } from 'react';

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
    <button className={`audio-toggle ${muted ? 'muted' : ''}`} onClick={() => setMuted(!muted)}>
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3" />
      {muted ? '🔈 Music Off' : '🔊 Music On'}
    </button>
  );
}
