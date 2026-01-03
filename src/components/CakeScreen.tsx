import { motion } from 'motion/react';
import { useState } from 'react';

interface CakeScreenProps {
  onNext: () => void;
  showConfetti: boolean;
}

export function CakeScreen({ onNext, showConfetti }: CakeScreenProps) {
  const [candlesLit, setCandlesLit] = useState(Array(19).fill(true));
  const [clicked, setClicked] = useState(false);
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);
  const [rotation, setRotation] = useState({ x: -10, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleCakeClick = () => {
    if (clicked) return;
    setClicked(true);

    // Extinguish candles one by one with a cool wave effect
    const newCandlesLit = Array(19).fill(true);
    for (let i = 0; i < 19; i++) {
      setTimeout(() => {
        newCandlesLit[i] = false;
        setCandlesLit([...newCandlesLit]);
      }, i * 100);
    }
    setTimeout(() => onNext(), 2500);
  };

  // Generate candle positions in a circle around the top of the cake
  const getCandlePosition = (index: number) => {
    const radius = 110;
    const angle = (index / 19) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.6; // Ellipse effect for perspective
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (clicked) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || clicked) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotation({
      x: rotation.x + deltaY * 0.3,
      y: rotation.y + deltaX * 0.3,
    });
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
        well, blow the candles lol ✨
      </motion.p>

      {/* 3D Birthday Cake with 19 Candles */}
      <motion.div
        className="relative cursor-grab active:cursor-grabbing select-none"
        onClick={handleCakeClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ 
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          style={{
            rotateX: rotation.x,
            rotateY: rotation.y,
            transformStyle: 'preserve-3d',
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        >

        {/* Candles - 19 arranged in a circle */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-40">
          {[...Array(19)].map((_, index) => {
            const { x, y } = getCandlePosition(index);
            const isLit = candlesLit[index];

            return (
              <div
                key={index}
                className="absolute w-4 h-16 cursor-pointer group"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => !clicked && setHoveredCandle(index)}
                onMouseLeave={() => setHoveredCandle(null)}
              >
                {/* Flame */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-lg"
                  animate={
                    isLit
                      ? {
                          scale: [0.8, 1.2, 0.9],
                          y: [-2, -6, -2],
                          opacity: [0.8, 1, 0.8],
                        }
                      : {
                          scale: 0,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 0.6,
                    repeat: isLit ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                >
                  🔥
                </motion.div>

                {/* Candle stick with gradient */}
                <motion.div
                  className="w-full h-full rounded-full shadow-lg"
                  style={{
                    background: 'linear-gradient(90deg, #FF6B9D 0%, #FF8FB3 50%, #FF6B9D 100%)',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  }}
                  animate={
                    hoveredCandle === index && !clicked
                      ? {
                          scale: 1.15,
                          boxShadow: [
                            '0 0 8px rgba(255, 107, 157, 0.5)',
                            '0 0 16px rgba(255, 107, 157, 0.8)',
                            '0 0 8px rgba(255, 107, 157, 0.5)',
                          ],
                        }
                      : {
                          scale: 1,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }
                  }
                  transition={{ duration: 0.3 }}
                >
                  {/* Stripes on candle */}
                  <div className="w-full h-full relative overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
                  </div>
                </motion.div>

                {/* Glow effect when lit */}
                {isLit && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: '0 0 12px rgba(255, 107, 157, 0.6)',
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 12px rgba(255, 107, 157, 0.4)',
                        '0 0 20px rgba(255, 107, 157, 0.8)',
                        '0 0 12px rgba(255, 107, 157, 0.4)',
                      ],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        {/* 3D Cake - 3 layers, perfectly centered */}
        <motion.div
          className="flex flex-col items-center gap-1 mt-32"
          animate={clicked ? { scale: 0.95 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={!clicked ? { scale: 1.05 } : {}}
        >
          {/* Top layer - frosting detail with 3D depth */}
          <div 
            className="relative w-72 h-20 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
              borderRadius: '1rem',
              boxShadow: '0 20px 25px -5px rgba(219, 39, 119, 0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)',
              transform: 'translateZ(20px)',
            }}
          >
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

          {/* Middle layer - chocolate with 3D depth */}
          <div 
            className="relative w-80 h-24 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #7e22ce 100%)',
              borderRadius: '1rem',
              boxShadow: '0 25px 30px -10px rgba(147, 51, 234, 0.35), inset 0 1px 0 0 rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.1)',
              transform: 'translateZ(10px)',
            }}
          >
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

          {/* Bottom layer - vanilla base with 3D depth */}
          <div 
            className="relative w-[360px] h-28 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #fef08a 0%, #fcd34d 50%, #fbbf24 100%)',
              borderRadius: '1.5rem',
              boxShadow: '0 30px 40px -15px rgba(251, 191, 36, 0.4), inset 0 1px 0 0 rgba(255,255,255,0.3), inset 0 -4px 8px rgba(0,0,0,0.1)',
              transform: 'translateZ(0px)',
            }}
          >
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
        </motion.div>

        {/* Sparkles and confetti when clicked */}
        {clicked &&
          [...Array(8)].map((_, i) => (
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
                x: Math.cos((i * Math.PI * 2) / 8) * 150,
                y: Math.sin((i * Math.PI * 2) / 8) * 150,
              }}
              transition={{ duration: 1.2 }}
            >
              ✨
            </motion.div>
          ))}
        </motion.div>
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