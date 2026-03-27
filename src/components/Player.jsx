import { useState, useEffect, useRef } from 'react';
import { getTileValue, isSolid, MOVEMENT_SPEED, TILE_SIZE, TILE_TYPES } from '../data/mapData';

const HITBOX_WIDTH = 20;
const HITBOX_HEIGHT = 16;

export default function Player({ mapDesc, initialPosition, onInteract, canMove, onPositionChange }) {
  const [position, setPosition] = useState(initialPosition);
  const [direction, setDirection] = useState('down');
  const [isMoving, setIsMoving] = useState(false);
  
  const posRef = useRef(position);
  const dirRef = useRef(direction);
  
  // Resync if initialPosition changes (like changing maps)
  useEffect(() => {
    setPosition(initialPosition);
    posRef.current = initialPosition;
  }, [initialPosition]);

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const keys = {};
    let animationFrameId;
    let lastTime = performance.now();

    const handleKeyDown = (e) => {
      if(!canMove) return;
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }
      keys[e.key.toLowerCase()] = true;
      if (e.code === 'Space' || e.key === 'Enter') {
        const currentX = posRef.current.x;
        const currentY = posRef.current.y;
        
        let interactX = currentX;
        let interactY = currentY;
        
        if (dirRef.current === 'up') interactY -= TILE_SIZE;
        else if (dirRef.current === 'down') interactY += TILE_SIZE;
        else if (dirRef.current === 'left') interactX -= TILE_SIZE;
        else if (dirRef.current === 'right') interactX += TILE_SIZE;

        const tileVal = getTileValue(mapDesc.data, mapDesc.width, mapDesc.height, interactX, interactY);
        const standingTile = getTileValue(mapDesc.data, mapDesc.width, mapDesc.height, currentX, currentY);
        
        onInteract(tileVal, standingTile, interactX, interactY);
      }
    };
    
    const handleKeyUp = (e) => {
      keys[e.key.toLowerCase()] = false;
    };

    const update = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!canMove) {
        setIsMoving(false);
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      let dx = 0;
      let dy = 0;

      if (keys['w'] || keys['arrowup']) dy -= 1;
      if (keys['s'] || keys['arrowdown']) dy += 1;
      if (keys['a'] || keys['arrowleft']) dx -= 1;
      if (keys['d'] || keys['arrowright']) dx += 1;

      if (dx !== 0 && dy !== 0) {
        const length = Math.sqrt(dx * dx + dy * dy);
        dx /= length;
        dy /= length;
      }

      if (dx !== 0 || dy !== 0) {
        setIsMoving(true);
        if (Math.abs(dx) > Math.abs(dy)) {
          setDirection(dx > 0 ? 'right' : 'left');
        } else {
          setDirection(dy > 0 ? 'down' : 'up');
        }

        const moveDistance = MOVEMENT_SPEED * dt;
        let newX = posRef.current.x + dx * moveDistance;
        let newY = posRef.current.y + dy * moveDistance;

        const checkCollision = (cx, cy) => {
          const left = cx - HITBOX_WIDTH / 2;
          const right = cx + HITBOX_WIDTH / 2;
          const top = cy - HITBOX_HEIGHT;
          const bottom = cy;

          return (
            isSolid(getTileValue(mapDesc.data, mapDesc.width, mapDesc.height, left, top)) ||
            isSolid(getTileValue(mapDesc.data, mapDesc.width, mapDesc.height, right, top)) ||
            isSolid(getTileValue(mapDesc.data, mapDesc.width, mapDesc.height, left, bottom)) ||
            isSolid(getTileValue(mapDesc.data, mapDesc.width, mapDesc.height, right, bottom))
          );
        };

        if (!checkCollision(newX, posRef.current.y)) {
           // x is valid
        } else {
           newX = posRef.current.x; // collide x
        }
        
        if (!checkCollision(newX, newY)) {
           // y is valid
        } else {
           newY = posRef.current.y; // collide y
        }

        if (newX !== posRef.current.x || newY !== posRef.current.y) {
          setPosition({ x: newX, y: newY });
          posRef.current = { x: newX, y: newY };
          if (onPositionChange) onPositionChange(newX, newY);
        }
      } else {
        setIsMoving(false);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [mapDesc, onInteract, canMove]);

  return (
    <div 
      className={`player ${isMoving ? 'moving' : ''} dir-${direction}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `translate(-50%, -100%)` 
      }}
    >
      <div className="player-sprite" />
      <div className="player-shadow" />
    </div>
  );
}