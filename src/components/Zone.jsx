import { motion } from 'framer-motion';

export default function Zone({ title, hint, className, onClick, position }) {
  return (
    <motion.div
      className={`zone ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: position * 0.2 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="zone-title">{title}</div>
      <div className="zone-hint">{hint}</div>
    </motion.div>
  );
}