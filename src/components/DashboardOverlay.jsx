import React from 'react';
import '../styles/DashboardOverlay.css';

export default function DashboardOverlay({ type, onClose, onInteract }) {
  const isCabin = type === 'cabin';

  const cabinHotspots = [
    { id: 'projects', label: 'Projects (Computer)' },
    { id: 'about', label: 'About Me (Diary)' },
    { id: 'experience', label: 'Experience (Filing Cabinet)' },
    { id: 'skills', label: 'Skills (Bookshelf)' },
    { id: 'contact', label: 'Contact (Telephone)' }
  ];

  const shedHotspots = [
    { id: 'pool', label: 'Swimming (Trophy)' },
    { id: 'chess', label: 'Chess (Chessboard)' },
    { id: 'kitchen', label: 'Cooking (Kitchen Desk)' },
    { id: 'badminton', label: 'Badminton (Racquets)' },
    { id: 'trading', label: 'Trading (Multi-Monitor Setup)' }
  ];

  const hotspots = isCabin ? cabinHotspots : shedHotspots;

  return (
    <div className="dashboard-wrapper">
      <div className={`dashboard-room ${type}-theme`}>
        <button className="exit-btn" onClick={onClose}>⮐ Leave</button>
        
        <div className="room-walls" />
        <div className="room-floor" />
        
        {hotspots.map((spot) => (
          <div 
            key={spot.id}
            className={`hotspot item-${spot.id}`} 
            onClick={() => onInteract(spot.id)}
          >
            <div className="hotspot-label">{spot.label}</div>
          </div>
        ))}

        <div className="dashboard-hud">
          <p>🔍 Hover over objects in the room to inspect them!</p>
        </div>
      </div>
    </div>
  );
}
