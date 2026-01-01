import { motion } from 'motion/react';
import { useState } from 'react';

interface CakeScreenProps {
  onNext: () => void;
  showConfetti: boolean;
}

export function CakeScreen({ onNext, showConfetti }: CakeScreenProps) {
  const [candlesLit, setCandlesLit] = useState([true, true]);
  const [clicked, setClicked] = useState(false);

  const handleCakeClick = () => {
    if (clicked) return;
    setClicked(true);

    // Extinguish candles one by one
    setTimeout(() => setCandlesLit([false, true]), 200);
    setTimeout(() => setCandlesLit([false, false]), 400);
    setTimeout(() => onNext(), 2200);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Confetti burst - reduced */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                fontSize: '20px',
              }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 800,
                y: (Math.random() - 0.5) * 800,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              {['🎉', '🎊', '✨'][Math.floor(Math.random() * 3)]}
            </motion.div>
          ))}
        </div>
      )}

      <motion.h1
        className="text-center mb-2 text-[#5D3A5E]"
        style={{ fontSize: '52px', fontWeight: 700 }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Happy Birthday, Thư!!! 🎉
      </motion.h1>

      <motion.p
        className="text-center mb-16 text-[#5D3A5E]"
        style={{ fontSize: '24px', fontWeight: 500 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Chúc bạn một năm mới thật vui và nhẹ nhàng ✨
      </motion.p>

      {/* Realistic Birthday Cake - All centered */}
      <motion.div
        className="relative cursor-pointer flex flex-col items-center"
        onClick={handleCakeClick}
        whileHover={{ scale: clicked ? 1 : 1.03 }}
        whileTap={{ scale: clicked ? 1 : 0.98 }}
      >
        {/* Number "19" candles shaped like the numbers with candycane pattern */}
        <div className="flex justify-center gap-3 mb-2">
          {/* Number "1" shaped candle */}
          <div className="relative flex flex-col items-center">
            {/* Flame on "1" */}
            <motion.div
              className="text-xl mb-1"
              animate={
                candlesLit[0]
                  ? {
                      scale: [1, 1.15, 1],
                      y: [0, -1, 0],
                    }
                  : {
                      scale: 0,
                      opacity: 0,
                    }
              }
              transition={{
                duration: 0.4,
                repeat: candlesLit[0] ? Infinity : 0,
              }}
            >
              🔥
            </motion.div>
            
            {/* "1" shaped candle body with candycane stripes */}
            <svg width="40" height="80" viewBox="0 0 40 80" className="drop-shadow-lg">
              <defs>
                <pattern id="candycane1" patternUnits="userSpaceOnUse" width="16" height="16" patternTransform="rotate(45)">
                  <rect width="8" height="16" fill="#EF4444"/>
                  <rect x="8" width="8" height="16" fill="#FFFFFF"/>
                </pattern>
              </defs>
              {/* Shape of number 1 */}
              <rect x="14" y="0" width="12" height="75" rx="6" fill="url(#candycane1)" stroke="#DC2626" strokeWidth="2"/>
              <rect x="8" y="0" width="14" height="15" rx="4" fill="url(#candycane1)" stroke="#DC2626" strokeWidth="2"/>
              {/* Wick holder */}
              <ellipse cx="20" cy="2" rx="8" ry="3" fill="#FBBF24"/>
            </svg>
          </div>

          {/* Number "9" shaped candle */}
          <div className="relative flex flex-col items-center">
            {/* Flame on "9" */}
            <motion.div
              className="text-xl mb-1"
              animate={
                candlesLit[1]
                  ? {
                      scale: [1, 1.15, 1],
                      y: [0, -1, 0],
                    }
                  : {
                      scale: 0,
                      opacity: 0,
                    }
              }
              transition={{
                duration: 0.4,
                repeat: candlesLit[1] ? Infinity : 0,
              }}
            >
              🔥
            </motion.div>
            
            {/* "9" shaped candle body with candycane stripes */}
            <svg width="45" height="80" viewBox="0 0 45 80" className="drop-shadow-lg">
              <defs>
                <pattern id="candycane9" patternUnits="userSpaceOnUse" width="16" height="16" patternTransform="rotate(45)">
                  <rect width="8" height="16" fill="#EF4444"/>
                  <rect x="8" width="8" height="16" fill="#FFFFFF"/>
                </pattern>
              </defs>
              {/* Shape of number 9 - top loop */}
              <ellipse cx="22" cy="20" rx="18" ry="18" fill="url(#candycane9)" stroke="#DC2626" strokeWidth="2"/>
              <ellipse cx="22" cy="20" rx="10" ry="10" fill="#FEF3C7"/>
              {/* Bottom curved tail */}
              <path d="M 32 20 Q 35 35, 32 50 Q 28 65, 18 72 Q 12 75, 8 72" 
                    fill="none" 
                    stroke="url(#candycane9)" 
                    strokeWidth="14" 
                    strokeLinecap="round"/>
              <path d="M 32 20 Q 35 35, 32 50 Q 28 65, 18 72 Q 12 75, 8 72" 
                    fill="none" 
                    stroke="#DC2626" 
                    strokeWidth="16" 
                    strokeLinecap="round"
                    opacity="0.3"/>
              {/* Wick holder */}
              <ellipse cx="22" cy="2" rx="8" ry="3" fill="#FBBF24"/>
            </svg>
          </div>
        </div>

        {/* Cake - 3 layers, perfectly centered */}
        <div className="flex flex-col items-center gap-1">
          {/* Top layer - frosting detail */}
          <div className="relative w-72 h-20 bg-gradient-to-b from-pink-300 to-pink-400 rounded-2xl shadow-xl overflow-hidden">
            {/* Cream dollops on top */}
            <div className="absolute -top-2 left-0 right-0 flex justify-around px-4">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-white rounded-full shadow-sm"
                  style={{
                    boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.1)',
                  }}
                />
              ))}
            </div>
            
            {/* Sprinkles */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 px-6 flex-wrap pt-4">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-3 rounded-full"
                  style={{
                    backgroundColor: ['#FF6B9D', '#FFC107', '#4CAF50', '#2196F3', '#9C27B0'][i % 5],
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Middle layer - chocolate */}
          <div className="relative w-80 h-24 bg-gradient-to-b from-purple-400 to-purple-500 rounded-2xl shadow-xl">
            {/* Frosting waves */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-white/20 rounded-t-2xl" />
            
            {/* Decorative dots */}
            <div className="absolute inset-0 flex items-center justify-around px-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 bg-pink-200 rounded-full shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* Bottom layer - vanilla base */}
          <div className="relative w-[360px] h-28 bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 rounded-3xl shadow-2xl">
            {/* Frosting drip effect */}
            <div className="absolute top-0 left-0 right-0 overflow-hidden">
              <div className="flex justify-around">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-4 bg-white/40 rounded-b-full"
                  />
                ))}
              </div>
            </div>
            
            {/* Base texture */}
            <div className="absolute bottom-2 left-0 right-0 h-1 bg-yellow-500/30 rounded-full mx-8" />
          </div>

          {/* Cake plate */}
          <div className="w-[400px] h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full shadow-lg" />
        </div>

        {/* Sparkles when clicked - reduced */}
        {clicked &&
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{
                scale: 1.5,
                opacity: 0,
                x: Math.cos((i * Math.PI * 2) / 5) * 120,
                y: Math.sin((i * Math.PI * 2) / 5) * 120,
              }}
              transition={{ duration: 1 }}
            >
              ✨
            </motion.div>
          ))}
      </motion.div>

      {!clicked && (
        <motion.p
          className="mt-16 text-center text-[#5D3A5E]"
          style={{ fontSize: '22px', fontWeight: 500 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Blow the candles 🎂 (Click the cake)
        </motion.p>
      )}
    </motion.div>
  );
}