import { useState, useEffect } from 'react';
import { TILE_SIZE } from '../data/mapData';

export default function NPC({ initialX, initialY, spriteClass, name }) {
  const [direction, setDirection] = useState('down');

  useEffect(() => {
    const interval = setInterval(() => {
        const dirs = ['up', 'down', 'left', 'right'];
        setDirection(dirs[Math.floor(Math.random() * dirs.length)]);
    }, 4000 + Math.random() * 2000); // turn every 4-6s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`npc dir-${direction}`} style={{ left: initialX * TILE_SIZE + 20, top: initialY * TILE_SIZE + 20, transform: `translate(-50%, -100%)` }}>
       <div className={`npc-sprite ${spriteClass}`}></div>
       <div className="npc-shadow"></div>
       <div className="npc-name">{name}</div>
    </div>
  );
}
