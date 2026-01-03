import { motion } from 'motion/react';
import { useState } from 'react';

interface EnvelopeScreenProps {
  onNext: () => void;
}

export function EnvelopeScreen({ onNext }: EnvelopeScreenProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onNext();
    }, 800);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="text-center mb-8 text-[#5D3A5E]"
        style={{ fontSize: '48px', fontWeight: 600 }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        A Gift for Thư
      </motion.h1>

      <motion.div
        className="relative cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        animate={{
          y: isOpening ? 0 : [0, -10, 0],
          rotate: isHovered && !isOpening ? 5 : 0,
          scale: isOpening ? 1.2 : 1,
        }}
        transition={{
          y: {
            duration: 2,
            repeat: isOpening ? 0 : Infinity,
            ease: 'easeInOut',
          },
          rotate: { duration: 0.3 },
          scale: { duration: 0.5 },
        }}
      >
        {/* Envelope body */}
        <div className="w-64 h-40 bg-gradient-to-br from-pink-200 to-pink-300 rounded-3xl shadow-lg relative overflow-hidden">
          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-pink-300 to-pink-400 origin-top"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            }}
            animate={{
              rotateX: isOpening ? 180 : 0,
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Sticker seal */}
            <motion.div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 text-4xl"
              animate={{
                scale: isOpening ? [1, 1.5, 0] : 1,
                opacity: isOpening ? 0 : 1,
              }}
            >
              🎁
            </motion.div>
          </motion.div>

          {/* Letter inside */}
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-32 bg-cream-100 rounded-2xl"
            animate={{
              y: isOpening ? -100 : 0,
              opacity: isOpening ? 0 : 1,
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        {/* Reduced sparkles - only 3 */}
        {[0, 2, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${20 + Math.cos((i * Math.PI) / 3) * 140}px`,
              top: `${70 + Math.sin((i * Math.PI) / 3) * 90}px`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ✨
          </motion.div>
        ))}

        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-yellow-200 rounded-3xl -z-10"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.4 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      <motion.p
        className="mt-8 text-center text-[#5D3A5E]"
        style={{ fontSize: '22px', fontWeight: 500 }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        open it!!! (click on it) 🎉
      </motion.p>
    </motion.div>
  );
}
