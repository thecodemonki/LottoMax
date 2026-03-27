import { useState, useEffect } from 'react';

export default function DialogueBox({ name, text, onClose }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30); // typewriter speed
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="dialogue-box-container" onClick={onClose}>
      <div className="dialogue-box" onClick={(e) => e.stopPropagation()}>
         <div className="dialogue-name">{name}</div>
         <div className="dialogue-text">{displayedText}</div>
         <p className="dialogue-instructions">Press SPACE or Click to close.</p>
      </div>
    </div>
  );
}
