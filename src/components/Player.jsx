import { useState, useEffect } from 'react';

export default function Player({ onZoneEnter }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  
  const moveSpeed = 3;

  useEffect(() => {
    const keys = {};
    
    const handleKeyDown = (e) => {
      keys[e.key] = true;
      
      if (e.key === ' ' || e.key === 'Enter') {
        onZoneEnter(position);
      }
    };
    
    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };

    const gameLoop = () => {
      setPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (keys['ArrowUp'] || keys['w'] || keys['W']) {
          newY = Math.max(5, prev.y - moveSpeed);
        }
        if (keys['ArrowDown'] || keys['s'] || keys['S']) {
          newY = Math.min(95, prev.y + moveSpeed);
        }
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
          newX = Math.max(5, prev.x - moveSpeed);
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
          newX = Math.min(95, prev.x + moveSpeed);
        }

        return { x: newX, y: newY };
      });
    };

    const intervalId = setInterval(gameLoop, 16);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onZoneEnter, position]);

  return (
    <div 
      className="player" 
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="player-sprite" />
    </div>
  );
}