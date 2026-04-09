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
import { outdoorMapDesc, TILE_SIZE, ZONES, TILE_TYPES, getLocationTitle } from '../data/mapData';
import '../styles/MansionGame.css';

function MansionGame() {
  const [activeModal, setActiveModal] = useState(null);
  const [activeDialogue, setActiveDialogue] = useState(null);
  const [activeDashboard, setActiveDashboard] = useState(null); 
  const [locationTitle, setLocationTitle] = useState('Home');
  const [showLocationTitle, setShowLocationTitle] = useState(false);
  const [fadeScreen, setFadeScreen] = useState(false);

  const mapDesc = outdoorMapDesc;
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
    const newLocation = getLocationTitle(x, y);
    if (newLocation !== lastLocationRef.current) {
        lastLocationRef.current = newLocation;
        setLocationTitle(newLocation);
        setShowLocationTitle(true);
        if (locationTitleTimer.current) clearTimeout(locationTitleTimer.current);
        locationTitleTimer.current = setTimeout(() => setShowLocationTitle(false), 3000);
    }
  };

  const handleInteract = (facingTile, standingTile, interactX, interactY) => {
    if (fadeScreen || activeModal || activeDialogue || activeDashboard) return;

    if (facingTile === TILE_TYPES.CABIN_DOOR_ENTER || standingTile === TILE_TYPES.CABIN_DOOR_ENTER) {
      setFadeScreen(true);
      setTimeout(() => {
        setActiveDashboard('cabin');
        setFadeScreen(false);
      }, 500);
      return;
    }
    
    if (facingTile === TILE_TYPES.SHED_DOOR_ENTER || standingTile === TILE_TYPES.SHED_DOOR_ENTER) {
      setFadeScreen(true);
      setTimeout(() => {
        setActiveDashboard('shed');
        setFadeScreen(false);
      }, 500);
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
            transform: `translate(calc(50vw - ${playerPos.x}px), calc(50vh - ${playerPos.y}px))`
          }}
        >
          <TileMap mapDesc={mapDesc} />

          <Player 
            mapDesc={mapDesc} 
            initialPosition={playerPos} 
            onInteract={handleInteract} 
            onPositionChange={handlePositionChange}
            canMove={!activeModal && !activeDialogue && !fadeScreen && !activeDashboard}
          />
          
          <div className="night-overlay" />
        </div>
      </div>

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