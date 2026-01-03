import { motion } from 'motion/react';
import { useState } from 'react';

interface GiftGameScreenProps {
  onNext: () => void;
}

const gifts = [
  {
    id: 1,
    message: "Chúc bạn may mắn lần sau 🍀",
    emoji: "🍀",
    color: "bg-gradient-to-br from-green-300 to-green-400",
  },
  {
    id: 2,
    message: "Happy Birthday!!! 🎉",
    emoji: "🎉",
    color: "bg-gradient-to-br from-pink-300 to-pink-400",
  },
  {
    id: 3,
    message: "+5k VND 💸",
    emoji: "💸",
    color: "bg-gradient-to-br from-yellow-300 to-yellow-400",
  },
];

export function GiftGameScreen({ onNext }: GiftGameScreenProps) {
  const [revealed, setRevealed] = useState<number | null>(null);

  const handleGiftClick = (id: number) => {
    if (revealed !== null) return; // Can only reveal one
    setRevealed(id);
  };

  const oneRevealed = revealed !== null;

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-center mb-16 text-[#5D3A5E]"
        style={{ fontSize: '48px', fontWeight: 600 }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Pick a gift 🎁
      </motion.h2>

      <div className="flex justify-center gap-8 mb-16 max-w-5xl flex-wrap">
        {gifts.map((gift, index) => {
          const isRevealed = revealed === gift.id;
          
          return (
            <motion.div
              key={gift.id}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15 }}
            >
              <motion.div
                className={`w-64 h-72 ${gift.color} rounded-3xl shadow-2xl cursor-pointer flex items-center justify-center overflow-hidden ${
                  revealed !== null && !isRevealed ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handleGiftClick(gift.id)}
                whileHover={revealed === null ? { y: -8, scale: 1.02 } : {}}
                whileTap={revealed === null ? { scale: 0.98 } : {}}
              >
                {!isRevealed ? (
                  // Front of card - unopened gift
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                    <div className="text-8xl mb-6 relative z-10">🎁</div>
                    <div className="text-6xl text-white relative z-10">?</div>
                    
                    {/* Ribbon decorations */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-full bg-white/25" />
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-6 bg-white/25" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/35 rounded-full" />
                  </div>
                ) : (
                  // Back of card - revealed message
                  <motion.div
                    className="flex flex-col items-center justify-center p-8 text-center w-full h-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-7xl mb-6">{gift.emoji}</div>
                    <p 
                      className="text-white drop-shadow-lg"
                      style={{ fontSize: '24px', fontWeight: 700, lineHeight: 1.4 }}
                    >
                      {gift.message}
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Small sparkle effect when revealed */}
              {isRevealed && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute text-xl pointer-events-none"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 0,
                        x: Math.cos((i * Math.PI * 2) / 3) * 60,
                        y: Math.sin((i * Math.PI * 2) / 3) * 60,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {oneRevealed && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            className="px-10 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-xl"
            style={{ fontSize: '20px', fontWeight: 600 }}
            onClick={onNext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue ✨
          </motion.button>

          <motion.button
            className="px-8 py-4 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full shadow-lg"
            style={{ fontSize: '18px', fontWeight: 600 }}
            onClick={onNext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Skip
          </motion.button>
        </div>
      )}

      {!oneRevealed && (
        <motion.p
          className="text-center text-[#5D3A5E]"
          style={{ fontSize: '22px', fontWeight: 500 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Pick one gift to reveal your surprise!
        </motion.p>
      )}
    </motion.div>
  );
}
