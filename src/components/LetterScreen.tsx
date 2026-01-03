import { motion } from 'motion/react';

interface LetterScreenProps {
  onNext: () => void;
}

export function LetterScreen({ onNext }: LetterScreenProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side string lights */}
      <div className="absolute left-0 top-0 h-full w-32 pointer-events-none overflow-hidden">
        <svg width="128" height="100%" className="absolute left-0 top-0">
          {/* String */}
          <path d="M 20 0 Q 10 50, 20 100 T 20 200 T 20 300 T 20 400 T 20 500 T 20 600 T 20 700 T 20 800" 
                stroke="#D1D5DB" 
                strokeWidth="2" 
                fill="none"/>
          {/* Lights along the string */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.circle
              key={i}
              cx="20"
              cy={i * 100 + 50}
              r="8"
              fill={['#FCD34D', '#FCA5A5', '#A5F3FC', '#C4B5FD', '#FDE047'][i % 5]}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Right side string lights */}
      <div className="absolute right-0 top-0 h-full w-32 pointer-events-none overflow-hidden">
        <svg width="128" height="100%" className="absolute right-0 top-0">
          {/* String */}
          <path d="M 108 0 Q 118 50, 108 100 T 108 200 T 108 300 T 108 400 T 108 500 T 108 600 T 108 700 T 108 800" 
                stroke="#D1D5DB" 
                strokeWidth="2" 
                fill="none"/>
          {/* Lights along the string */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.circle
              key={i}
              cx="108"
              cy={i * 100 + 50}
              r="8"
              fill={['#A5F3FC', '#FCA5A5', '#FDE047', '#FCD34D', '#C4B5FD'][i % 5]}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2 + 0.5,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Left side garland */}
      <div className="absolute left-8 top-0 h-full w-24 pointer-events-none overflow-hidden">
        <svg width="96" height="100%" className="absolute left-0 top-0">
          {/* Garland string */}
          <path d="M 48 -10 Q 30 40, 48 90 T 48 190 T 48 290 T 48 390 T 48 490 T 48 590 T 48 690 T 48 790" 
                stroke="#10B981" 
                strokeWidth="4" 
                fill="none"/>
          {/* Leaves */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <g key={i}>
              <ellipse 
                cx="48" 
                cy={i * 90 + 30}
                rx="12" 
                ry="8" 
                fill="#34D399" 
                opacity="0.8"
                transform={`rotate(${-30} 48 ${i * 90 + 30})`}
              />
              <ellipse 
                cx="48" 
                cy={i * 90 + 30}
                rx="12" 
                ry="8" 
                fill="#10B981" 
                opacity="0.9"
                transform={`rotate(${30} 48 ${i * 90 + 30})`}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Right side garland */}
      <div className="absolute right-8 top-0 h-full w-24 pointer-events-none overflow-hidden">
        <svg width="96" height="100%" className="absolute right-0 top-0">
          {/* Garland string */}
          <path d="M 48 -10 Q 66 40, 48 90 T 48 190 T 48 290 T 48 390 T 48 490 T 48 590 T 48 690 T 48 790" 
                stroke="#10B981" 
                strokeWidth="4" 
                fill="none"/>
          {/* Leaves */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <g key={i}>
              <ellipse 
                cx="48" 
                cy={i * 90 + 30}
                rx="12" 
                ry="8" 
                fill="#34D399" 
                opacity="0.8"
                transform={`rotate(${-30} 48 ${i * 90 + 30})`}
              />
              <ellipse 
                cx="48" 
                cy={i * 90 + 30}
                rx="12" 
                ry="8" 
                fill="#10B981" 
                opacity="0.9"
                transform={`rotate(${30} 48 ${i * 90 + 30})`}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Minimal floating stars - only 3 */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none opacity-20"
          style={{
            left: `${20 + i * 30}%`,
            top: `${15 + i * 20}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        >
          ⭐
        </motion.div>
      ))}

      <motion.div
        className="max-w-2xl w-full bg-gradient-to-br from-cream-50 to-pink-50 rounded-3xl shadow-2xl p-10 md:p-14 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        style={{
          background: 'linear-gradient(135deg, #FFFBF5 0%, #FFF5F0 100%)',
        }}
      >
        {/* Cute stickers scattered around the letter */}
        <motion.div
          className="absolute -top-4 -left-4 text-4xl"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: -15, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          🎂
        </motion.div>
        
        <motion.div
          className="absolute -top-3 -right-3 text-3xl"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 20, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          🎈
        </motion.div>
        
        <motion.div
          className="absolute top-1/4 -left-6 text-3xl"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: -10, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring' }}
        >
          ✨
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 -right-5 text-3xl"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 15, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
        >
          🎁
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 -left-5 text-3xl"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 10, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring' }}
        >
          🌟
        </motion.div>
        
        <motion.div
          className="absolute -bottom-4 -right-4 text-4xl"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: -20, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          🎉
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 -right-6 text-3xl"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 25, scale: 1 }}
          transition={{ delay: 1.1, type: 'spring' }}
        >
          🍰
        </motion.div>
        
        <motion.div
          className="absolute -bottom-3 -left-5 text-3xl"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: -25, scale: 1 }}
          transition={{ delay: 1.2, type: 'spring' }}
        >
          💝
        </motion.div>

        {/* Small envelope icon in corner */}
        <div className="absolute top-6 right-6 text-3xl opacity-20">💌</div>

        {/* Letter content */}
        <motion.div
          className="space-y-6 text-[#5D3A5E]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 
            className="text-center mb-10"
            style={{ fontSize: '36px', fontWeight: 600 }}
          >
            Hey Thư,
          </h2>

          <p 
            className="leading-relaxed"
            style={{ fontSize: '20px', fontWeight: 400 }}
          >
            we've been friends for a quite a while lol, congratulations on your birthday. 🎉
          </p>

          <p 
            className="leading-relaxed"
            style={{ fontSize: '20px', fontWeight: 400 }}
          >
            hopefully this year you'll receive everything you wish for, and well that's honestly it, idk what to say next.
          </p>

          <p 
            className="leading-relaxed"
            style={{ fontSize: '20px', fontWeight: 400 }}
          >
            Chúc bro một năm mới thật nhiều niềm vui, sức khỏe, và good vibes i guess haha.
          </p>

          <div 
            className="text-right mt-10 pt-8 border-t-2 border-pink-200"
            style={{ fontSize: '20px', fontWeight: 500 }}
          >
            <p>Kiet Minh (signed) 🎂</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        className="mt-12 px-10 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-xl"
        style={{ fontSize: '20px', fontWeight: 600 }}
        onClick={onNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        One last thing... ✨
      </motion.button>
    </motion.div>
  );
}