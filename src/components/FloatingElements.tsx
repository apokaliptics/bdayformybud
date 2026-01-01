import { motion } from 'motion/react';
import { useState } from 'react';

export function FloatingElements() {
  const [elements] = useState(() => {
    // Reduced to 8 elements (60% reduction from 20)
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      emoji: ['⭐', '✨', '🎈'][Math.floor(Math.random() * 3)], // Only stars and balloons
      left: `${15 + Math.random() * 70}%`, // Keep away from edges
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 5,
      size: 20 + Math.random() * 12,
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute opacity-30"
          style={{
            left: el.left,
            fontSize: `${el.size}px`,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
}
