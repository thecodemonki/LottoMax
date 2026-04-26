import React from 'react';
import { motion } from 'framer-motion';
import Stars from '../components/Stars';
import { AI_Prompt } from './ui/animated-ai-input';
import { LiquidButton } from './ui/liquid-glass-button';

export default function EntryPage({ onEnter }) {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Stars />
      </div>

      {/* Apple Intelligence Breathing Glow Border */}
      <div className="absolute inset-0 z-10 pointer-events-none p-4 md:p-6">
        <motion.div 
          className="w-full h-full rounded-[2rem] border-[3px] border-transparent"
          animate={{
            boxShadow: [
              "0 0 0px rgba(59,130,246,0), inset 0 0 0px rgba(59,130,246,0)",
              "0 0 30px rgba(79,70,229,0.5), inset 0 0 30px rgba(79,70,229,0.5)",
              "0 0 60px rgba(147,51,234,0.6), inset 0 0 60px rgba(147,51,234,0.6)",
              "0 0 30px rgba(79,70,229,0.5), inset 0 0 30px rgba(79,70,229,0.5)",
              "0 0 0px rgba(59,130,246,0), inset 0 0 0px rgba(59,130,246,0)",
            ],
            borderColor: [
              "rgba(59,130,246,0.1)",
              "rgba(79,70,229,0.6)",
              "rgba(147,51,234,0.9)",
              "rgba(79,70,229,0.6)",
              "rgba(59,130,246,0.1)",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-12 w-full max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="pointer-events-none"
        >
          <LiquidButton size="xl" className="text-white text-lg font-medium tracking-wide">
            Where would you like to go?
          </LiquidButton>
        </motion.div>

        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <AI_Prompt onSend={onEnter} />
        </motion.div>
      </div>
    </motion.div>
  );
}
