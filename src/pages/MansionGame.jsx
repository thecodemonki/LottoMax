import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Player from '../components/Player';
import TileMap from '../components/TileMap';
import PortfolioModal from '../components/PortfolioModal';
import NPC from '../components/NPC';
import DialogueBox from '../components/DialogueBox';
import AudioPlayer from '../components/AudioPlayer';
import { outdoorMapDesc, indoorMapDesc, TILE_SIZE, ZONES, TILE_TYPES, getLocationTitle } from '../data/mapData';
import '../styles/MansionGame.css';

const npcs = [
  { id: 'alex', x: 23, y: 16, name: 'Alex', dialogue: "Hey Max! The village looks great today. Did you see the pool?", spriteClass: 'npc-alex' },
  { id: 'prof', x: 14, y: 12, name: 'Prof. Smith', dialogue: "Keep working hard on those projects. Your algorithms are getting sharper.", spriteClass: 'npc-prof' }
];

const interactiveItems = [
  { x: 5, y: 2, name: "Apple", dialogue: "Found in the garden. Gives +5 coding stamina." },
  { x: 4, y: 4, name: "Apple", dialogue: "You love eating these before badminton games! Quick energy!" },
  { x: 6, y: 3, name: "Orange", dialogue: "A citrus blast of Vitamin C. Essential for late-night hacking." },
  { x: 5, y: 5, name: "Orange", dialogue: "Did you know? You buy these by the crate." }
];

function MansionGame() {
  const [currentZone, setCurrentZone] = useState(ZONES.OUTDOOR);
  const [activeModal, setActiveModal] = useState(null);
  const [activeDialogue, setActiveDialogue] = useState(null);
  const [locationTitle, setLocationTitle] = useState('The Garden');
  const [showLocationTitle, setShowLocationTitle] = useState(false);
  const [fadeScreen, setFadeScreen] = useState(false);

  const mapDesc = currentZone === ZONES.OUTDOOR ? outdoorMapDesc : indoorMapDesc;
  const [playerPos, setPlayerPos] = useState({ x: mapDesc.spawnIn.x, y: mapDesc.spawnIn.y });
  
  const locationTitleTimer = useRef(null);
  const lastLocationRef = useRef('The Garden');

  useEffect(() => {
    // Initial title on load
    setShowLocationTitle(true);
    locationTitleTimer.current = setTimeout(() => setShowLocationTitle(false), 3000);
    return () => clearTimeout(locationTitleTimer.current);
  }, []);

  const handlePositionChange = (x, y) => {
    setPlayerPos({ x, y });
    const newLocation = getLocationTitle(x, y, currentZone);
    if (newLocation !== lastLocationRef.current) {
        lastLocationRef.current = newLocation;
        setLocationTitle(newLocation);
        setShowLocationTitle(true);
        if (locationTitleTimer.current) clearTimeout(locationTitleTimer.current);
        locationTitleTimer.current = setTimeout(() => setShowLocationTitle(false), 3000);
    }
  };

  const switchZone = (zone, spawnX, spawnY) => {
    setFadeScreen(true);
    setTimeout(() => {
      setCurrentZone(zone);
      const newMap = zone === ZONES.OUTDOOR ? outdoorMapDesc : indoorMapDesc;
      const x = spawnX !== undefined ? spawnX : newMap.spawnIn.x;
      const y = spawnY !== undefined ? spawnY : newMap.spawnIn.y;
      setPlayerPos({ x, y });
      
      const newLocation = getLocationTitle(x, y, zone);
      lastLocationRef.current = newLocation;
      setLocationTitle(newLocation);
      setShowLocationTitle(true);
      if (locationTitleTimer.current) clearTimeout(locationTitleTimer.current);
      locationTitleTimer.current = setTimeout(() => setShowLocationTitle(false), 3000);
      
      setTimeout(() => setFadeScreen(false), 500);
    }, 500);
  };

  const handleInteract = (facingTile, standingTile, interactX, interactY) => {
    if (fadeScreen || activeModal || activeDialogue) return;

    // Check Portals
    if (facingTile === TILE_TYPES.MANOR_DOOR_ENTER || standingTile === TILE_TYPES.MANOR_DOOR_ENTER) {
      switchZone(ZONES.INDOOR, indoorMapDesc.spawnIn.x, indoorMapDesc.spawnIn.y);
      return;
    }
    if (facingTile === TILE_TYPES.MANOR_DOOR_EXIT || standingTile === TILE_TYPES.MANOR_DOOR_EXIT) {
      switchZone(ZONES.OUTDOOR, outdoorMapDesc.spawnIn.x, outdoorMapDesc.spawnIn.y);
      return;
    }

    // Check Modals
    const checkTile = (val) => {
      if (val === TILE_TYPES.DOOR_PROJECTS) setActiveModal('projects');
      if (val === TILE_TYPES.DOOR_ABOUT) setActiveModal('about');
      if (val === TILE_TYPES.DOOR_CONTACT) setActiveModal('contact');
      if (val === TILE_TYPES.DOOR_EXPERIENCE) setActiveModal('experience');
      if (val === TILE_TYPES.DOOR_SKILLS) setActiveModal('skills');
    };
    checkTile(standingTile);
    checkTile(facingTile);

    // Check NPCs/Items
    const iCol = Math.floor(interactX / TILE_SIZE);
    const iRow = Math.floor(interactY / TILE_SIZE);

    if (currentZone === ZONES.OUTDOOR) {
      const npc = npcs.find(n => n.x === iCol && n.y === iRow);
      if (npc) {
        setActiveDialogue({ name: npc.name, text: npc.dialogue });
        return;
      }
      const item = interactiveItems.find(i => i.x === iCol && i.y === iRow);
      if (item) {
        setActiveDialogue({ name: item.name, text: item.dialogue });
        return;
      }
    }
  };

  return (
    <div className="mansion-wrapper">
      <Link to="/" className="back-button">← Back to Portfolio</Link>
      <AudioPlayer />
      
      {/* Dynamic Camera following the Player */}
      <div className="game-camera">
        <div 
          className="game-world"
          style={{ 
            width: mapDesc.width * TILE_SIZE, 
            height: mapDesc.height * TILE_SIZE,
            transform: `translate(calc(50vw - ${playerPos.x}px), calc(50vh - ${playerPos.y}px))`
          }}
        >
          <TileMap mapDesc={mapDesc} />
          
          {currentZone === ZONES.OUTDOOR && npcs.map(npc => (
             <NPC key={npc.id} name={npc.name} initialX={npc.x} initialY={npc.y} spriteClass={npc.spriteClass} />
          ))}

          <Player 
            mapDesc={mapDesc} 
            initialPosition={playerPos} 
            onInteract={handleInteract} 
            onPositionChange={handlePositionChange}
            canMove={!activeModal && !activeDialogue && !fadeScreen}
          />
          
          {/* Room Labels for Indoor */}
          {currentZone === ZONES.INDOOR && (
            <>
              <div className="room-label" style={{ top: 2.5 * TILE_SIZE, left: 3.5 * TILE_SIZE }}>Projects</div>
              <div className="room-label" style={{ top: 2.5 * TILE_SIZE, left: 10 * TILE_SIZE }}>About Me</div>
              <div className="room-label" style={{ top: 2.5 * TILE_SIZE, left: 16.5 * TILE_SIZE }}>Contact</div>
              <div className="room-label" style={{ top: 12.5 * TILE_SIZE, left: 3.5 * TILE_SIZE }}>Experience</div>
              <div className="room-label" style={{ top: 12.5 * TILE_SIZE, left: 10 * TILE_SIZE }}>Skills</div>
            </>
          )}

          {/* Night Time & Fog Aesthetics */}
          {currentZone === ZONES.OUTDOOR && <div className="night-overlay" />}
        </div>
      </div>

      {/* Fade Transition Overlay */}
      <div className={`fade-overlay ${fadeScreen ? 'visible' : ''}`} />

      {/* Location Title Card */}
      <div className={`location-title-card ${showLocationTitle ? 'visible' : ''}`}>
        {locationTitle}
      </div>

      <div className="controls-hud">
        <strong>Navigate:</strong> WASD / Arrows | <strong>Interact:</strong> SPACE / Enter
      </div>

      {activeDialogue && (
        <DialogueBox 
          name={activeDialogue.name} 
          text={activeDialogue.text} 
          onClose={() => setActiveDialogue(null)} 
        />
      )}

      {activeModal && (
        <PortfolioModal 
          type={activeModal} 
          onClose={() => setActiveModal(null)} 
        />
      )}
    </div>
  );
}

export default MansionGame;