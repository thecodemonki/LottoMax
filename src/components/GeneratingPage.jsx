import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stars from './Stars';
import { AILoader } from './ui/ai-loader';

const FACTS = [
  "🍣 Umi Sushi's pokebowl has never lost a battle. Neither has Maxwell.",
  "♟️ Maxwell deploys the Colle-Zukertort System as White. Slow build. Devastating finish.",
  "🍜 Tip: Maxwell's loyalty to Umi Sushi is stronger than any troop placement.",
  "🇨🇦 Maxwell has conquered every Canadian province. The territories are next.",
  "💙 Royal Blue is not just a colour. It is a lifestyle choice and a personal brand.",
  "🇬🇷 Maxwell's dream deployment location: Greece. ETA: unknown. Motivation: maximum.",
  "🍱 Warning: Do not discuss food near Maxwell unless you have 3-5 hours available."
];

export default function GeneratingPage({ onComplete }) {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % FACTS.length);
    }, 2500);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearInterval(factInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Stars />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 w-full px-4">
        <AILoader size={180} text="" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white text-lg tracking-wider font-semibold mt-8"
        >
          Sending you to Planet Max...
        </motion.div>
      </div>

      <div className="absolute bottom-16 left-0 right-0 z-20 flex justify-center px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl max-w-lg w-full text-center shadow-lg overflow-hidden h-[72px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={factIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-white text-sm md:text-base font-medium"
            >
              {FACTS[factIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
