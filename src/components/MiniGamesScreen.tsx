import { motion } from 'motion/react';
import { WordleGame } from './WordleGame';
import { SnakeGame } from './SnakeGame';

interface MiniGamesScreenProps {
  onNext: () => void;
}

export function MiniGamesScreen({ onNext }: MiniGamesScreenProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Reduced floating elements during gameplay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${30 + i * 40}%`,
              top: `${20 + i * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 2,
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mb-2 relative z-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 
          className="text-[#5D3A5E] mb-1"
          style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}
        >
          Mini Games
        </h2>
        <p 
          className="text-[#5D3A5E]"
          style={{ fontSize: '14px', fontWeight: 500, fontFamily: 'Nunito, sans-serif' }}
        >
          Just for fun—no pressure. Skip anytime.
        </p>
      </motion.div>

      {/* Games container */}
      <motion.div
        className="flex flex-col lg:flex-row gap-4 mb-3 relative z-10 max-w-6xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <WordleGame />
        <SnakeGame onComplete={onNext} />
      </motion.div>

      {/* Skip button */}
      <motion.button
        className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-xl relative z-10"
        style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}
        onClick={onNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Skip to celebration ✨
      </motion.button>
    </motion.div>
  );
}