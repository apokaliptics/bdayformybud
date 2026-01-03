import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

interface CelebrationScreenProps {
  onRestart: () => void;
}

export function CelebrationScreen({ onRestart }: CelebrationScreenProps) {
  const [showFireworks, setShowFireworks] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowFireworks(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play music when component mounts
  useEffect(() => {
    const playMusic = async () => {
      if (audioRef.current) {
        // Set to start at 2:18 (138 seconds)
        audioRef.current.currentTime = 138;
        try {
          await audioRef.current.play();
          setMusicEnabled(true);
        } catch (err) {
          console.log('Auto-play prevented, user interaction required');
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(playMusic, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicEnabled) {
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = 138; // Reset to 2:18
        audioRef.current.play();
      }
      setMusicEnabled(!musicEnabled);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fireworks effect - reduced */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${25 + (i * 5) % 50}%`,
                top: `${15 + (i * 8) % 70}%`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.5, 2],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: (i % 4) * 0.4,
                repeat: 1,
              }}
            >
              {['🎆', '✨', '⭐'][i % 3]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Single confetti layer - minimal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl opacity-60"
            style={{
              left: `${(i * 5) % 100}%`,
            }}
            initial={{ y: -50, opacity: 0.6, rotate: 0 }}
            animate={{
              y: '100vh',
              rotate: 360,
              opacity: [0.6, 0.6, 0],
            }}
            transition={{
              duration: 4 + (i % 3),
              delay: (i % 10) * 0.2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {['🎉', '🎊', '🎈'][i % 3]}
          </motion.div>
        ))}
      </div>

      {/* Main content - clean hierarchy */}
      <motion.div
        className="relative z-10 text-center max-w-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.3 }}
      >
        <motion.h1
          className="text-center mb-6 text-[#5D3A5E]"
          style={{ fontSize: '56px', fontWeight: 700 }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          happy birthday bro 🎂
        </motion.h1>

        <motion.p
          className="text-center mb-16 text-[#5D3A5E] max-w-xl mx-auto"
          style={{ fontSize: '26px', fontWeight: 500, lineHeight: 1.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          het roiiiiiiii
        </motion.p>

        {/* Single decorative cake - centered, large */}
        <motion.div
          className="flex justify-center mb-16"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="text-9xl">🎂</div>
        </motion.div>

        {/* Single clear CTA button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            className="px-10 py-5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-2xl"
            style={{ fontSize: '20px', fontWeight: 600 }}
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Open the gifts again 🎁
          </motion.button>

          <motion.button
            className={`w-14 h-14 rounded-full shadow-lg transition-all ${
              musicEnabled
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                : 'bg-white text-[#5D3A5E]'
            }`}
            style={{ fontSize: '24px' }}
            onClick={toggleMusic}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            {musicEnabled ? '🔊' : '🔇'}
          </motion.button>
        </div>
      </motion.div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/birthday-song.mp3"
        loop
        preload="metadata"
      />

      {/* Minimal bottom decoration - only 2 stars */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center gap-32 text-4xl opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          ⭐
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
          }}
        >
          ⭐
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
