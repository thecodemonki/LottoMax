import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Player from '../components/Player';
import Zone from '../components/Zone';
import PoolModal from '../components/PoolModal';
import BadmintonModal from '../components/BadmintonModal';
import ChessModal from '../components/ChessModal';
import KitchenModal from '../components/KitchenModal';
import TradingModal from '../components/TradingModal';
import ProjectsModal from '../components/ProjectsModal';
import Stars from '../components/Stars';
import '../styles/MansionGame.css';

function MansionGame() {
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const checkZoneCollision = (playerPos) => {
    const zones = {
      pool: { x: 8, y: 15, width: 12, height: 12 },
      badminton: { x: 82, y: 15, width: 12, height: 12 },
      chess: { x: 8, y: 50, width: 12, height: 12 },
      kitchen: { x: 82, y: 50, width: 12, height: 12 },
      trading: { x: 50, y: 78, width: 12, height: 12 }
    };

    Object.entries(zones).forEach(([key, zone]) => {
      if (
        Math.abs(playerPos.x - zone.x) < zone.width &&
        Math.abs(playerPos.y - zone.y) < zone.height
      ) {
        setActiveModal(key);
      }
    });
  };

  const closeModal = () => setActiveModal(null);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-text">WELCOME</div>
        <div className="loading-bar">
          <div className="loading-progress" />
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      {/* Back to Portfolio Button */}
      <Link to="/" className="back-button">
        ← Back to Portfolio
      </Link>

      <Stars />
      <div className="world-grid" />
      
      <Zone
        title="THE POOL"
        hint="🏊‍♂️ Swimming & Fitness"
        className="zone-pool"
        onClick={() => setActiveModal('pool')}
        position={0}
      />
      
      <Zone
        title="BADMINTON COURT"
        hint="🏸 Strategy & Speed"
        className="zone-badminton"
        onClick={() => setActiveModal('badminton')}
        position={1}
      />

      <Zone
        title="CHESS ROOM"
        hint="♟️ Tactical Thinking"
        className="zone-chess"
        onClick={() => setActiveModal('chess')}
        position={2}
      />

      <Zone
        title="KITCHEN"
        hint="👨‍🍳 Culinary Arts"
        className="zone-kitchen"
        onClick={() => setActiveModal('kitchen')}
        position={3}
      />

      <Zone
        title="TRADING OFFICE"
        hint="📈 Financial Markets"
        className="zone-trading"
        onClick={() => setActiveModal('trading')}
        position={4}
      />

      <Player onZoneEnter={checkZoneCollision} />

      <div className="controls-hud">
        <strong>Navigate:</strong> Arrow Keys or WASD | <strong>Interact:</strong> SPACE or Click
      </div>

      <AnimatePresence>
        {activeModal === 'pool' && <PoolModal onClose={closeModal} />}
        {activeModal === 'badminton' && <BadmintonModal onClose={closeModal} />}
        {activeModal === 'chess' && <ChessModal onClose={closeModal} />}
        {activeModal === 'kitchen' && <KitchenModal onClose={closeModal} />}
        {activeModal === 'trading' && <TradingModal onClose={closeModal} />}
        {activeModal === 'projects' && <ProjectsModal onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}

export default MansionGame;