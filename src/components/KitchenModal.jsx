import { motion } from 'framer-motion';
import { mansionData } from '../data/content';

export default function KitchenModal({ onClose }) {
  const room = mansionData.kitchen;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal modal-kitchen"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
      >
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="modal-title" style={{ color: 'var(--accent-wood)' }}>
            {room.emoji} {room.title}
          </h2>
          
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', fontFamily: 'var(--font-body)' }}>
            {room.description}
          </p>

          <h3 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.4rem', 
            marginBottom: '1rem',
            color: 'var(--accent-wood)'
          }}>
            Kitchen Highlights
          </h3>

          <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            {room.details.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                style={{
                  padding: '1rem',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '12px',
                  borderLeft: '4px solid var(--accent-wood)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem'
                }}
              >
                {detail}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}