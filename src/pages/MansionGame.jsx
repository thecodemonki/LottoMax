import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Player from '../components/Player';
import TileMap from '../components/TileMap';
import PortfolioModal from '../components/PortfolioModal';
import ChessModal from '../components/ChessModal';
import PoolModal from '../components/PoolModal';
import KitchenModal from '../components/KitchenModal';
import BadmintonModal from '../components/BadmintonModal';
import TradingModal from '../components/TradingModal';
import DialogueBox from '../components/DialogueBox';
import DashboardOverlay from '../components/DashboardOverlay';
import NPC from '../components/NPC';
import Fireflies from '../components/Fireflies';
import { outdoorMapDesc, mansionMapDesc, TILE_SIZE, ZONES, TILE_TYPES, getLocationTitle } from '../data/mapData';
import '../styles/MansionGame.css';

function MansionGame() {
  const [activeModal, setActiveModal] = useState(null);
  const [activeDialogue, setActiveDialogue] = useState(null);
  const [activeDashboard, setActiveDashboard] = useState(null); 
  const [locationTitle, setLocationTitle] = useState('Home');
  const [showLocationTitle, setShowLocationTitle] = useState(false);
  const [fadeScreen, setFadeScreen] = useState(false);
  
  const [currentZone, setCurrentZone] = useState(ZONES.OUTDOOR);
  const mapDesc = currentZone === ZONES.OUTDOOR ? outdoorMapDesc : mansionMapDesc;
  
  const [playerPos, setPlayerPos] = useState({ x: mapDesc.spawnIn.x, y: mapDesc.spawnIn.y });
  
  const locationTitleTimer = useRef(null);
  const lastLocationRef = useRef('Home');

  useEffect(() => {
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

  const npcs = currentZone === ZONES.OUTDOOR ? [
    { id: 1, x: 32, y: 15, name: 'Elderly Man', spriteClass: 'npc-elderly', text: "Welcome to the village, young one. It's peaceful here." },
    { id: 2, x: 26, y: 7, name: 'Young Woman', spriteClass: 'npc-woman', text: "The pool looks so refreshing today, doesn't it?" },
    { id: 3, x: 17, y: 5, name: 'Child', spriteClass: 'npc-child', text: "I'm looking for bugs in the garden!" }
  ] : [];

  const handleInteract = (facingTile, standingTile, interactX, interactY) => {
    if (fadeScreen || activeModal || activeDialogue || activeDashboard) return;

    // Check NPC interaction
    const col = Math.floor(interactX / TILE_SIZE);
    const row = Math.floor(interactY / TILE_SIZE);
    const npc = npcs.find(n => Math.abs(n.x - col) <= 1 && Math.abs(n.y - row) <= 1);
    if (npc) {
      setActiveDialogue({ name: npc.name, text: npc.text });
      return;
    }

    if (facingTile === TILE_TYPES.CABIN_DOOR_ENTER || standingTile === TILE_TYPES.CABIN_DOOR_ENTER) {
      setFadeScreen(true);
      setTimeout(() => {
        setCurrentZone(ZONES.MANSION);
        setPlayerPos({ x: mansionMapDesc.spawnIn.x, y: mansionMapDesc.spawnIn.y });
        handlePositionChange(mansionMapDesc.spawnIn.x, mansionMapDesc.spawnIn.y);
        setFadeScreen(false);
      }, 500);
      return;
    }
    
    if (facingTile === TILE_TYPES.MANSION_IN_EXIT || standingTile === TILE_TYPES.MANSION_IN_EXIT) {
      setFadeScreen(true);
      setTimeout(() => {
        setCurrentZone(ZONES.OUTDOOR);
        setPlayerPos({ x: 4 * TILE_SIZE + TILE_SIZE / 2, y: 8 * TILE_SIZE + TILE_SIZE / 2 });
        handlePositionChange(4 * TILE_SIZE + TILE_SIZE / 2, 8 * TILE_SIZE + TILE_SIZE / 2);
        setFadeScreen(false);
      }, 500);
      return;
    }

    if (facingTile === TILE_TYPES.FRUIT_TREE) {
      setActiveDialogue({ name: 'Fruit Tree', text: 'Fun fact: I love eating fresh mangoes while coding!' });
      return;
    }
    
    if (facingTile === TILE_TYPES.CROP_PUMPKIN) {
      setActiveDialogue({ name: 'Pumpkin Patch', text: 'This patch reminds me of the hard work required to grow a startup.' });
      return;
    }
  };

  const handleDashboardInteract = (itemId) => {
    setActiveModal(itemId);
  };

  const closeDashboard = () => {
    setFadeScreen(true);
    setTimeout(() => {
      setActiveDashboard(null);
      setFadeScreen(false);
    }, 500);
  };

  const renderModal = () => {
    if (!activeModal) return null;
    const closeModal = () => setActiveModal(null);
    switch (activeModal) {
      case 'projects':
      case 'about':
      case 'experience':
      case 'contact':
        return <PortfolioModal type={activeModal} onClose={closeModal} />;
      case 'pool':
        return <PoolModal onClose={closeModal} />;
      case 'chess':
        return <ChessModal onClose={closeModal} />;
      case 'kitchen':
        return <KitchenModal onClose={closeModal} />;
      case 'badminton':
        return <BadmintonModal onClose={closeModal} />;
      case 'trading':
        return <TradingModal onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <div className="mansion-wrapper">
      <Link to="/" className="back-button">← Back to Portfolio</Link>
      <div className="game-camera">
        <div 
          className="game-world"
          style={{ 
            width: mapDesc.width * TILE_SIZE, 
            height: mapDesc.height * TILE_SIZE,
            transform: `translate(calc(50vw - ${playerPos.x + 20}px), calc(50vh - ${playerPos.y + 20}px))`
          }}
        >
          <TileMap mapDesc={mapDesc} />

          {npcs.map(npc => (
            <NPC key={npc.id} initialX={npc.x} initialY={npc.y} name={npc.name} spriteClass={npc.spriteClass} />
          ))}

          <Player 
            mapDesc={mapDesc} 
            initialPosition={playerPos} 
            onInteract={handleInteract} 
            onPositionChange={handlePositionChange}
            canMove={!activeModal && !activeDialogue && !fadeScreen && !activeDashboard}
          />
          
          {currentZone === ZONES.OUTDOOR && <div className="night-overlay" />}
        </div>
      </div>
      
      {currentZone === ZONES.OUTDOOR && <Fireflies />}

      <div className={`fade-overlay ${fadeScreen ? 'visible' : ''}`} />

      {activeDashboard && !fadeScreen && (
        <DashboardOverlay 
          type={activeDashboard} 
          onClose={closeDashboard} 
          onInteract={handleDashboardInteract} 
        />
      )}

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

      {renderModal()}
    </div>
  );
}

export default MansionGame;