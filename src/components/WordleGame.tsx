import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const TARGET_WORD = 'HAPPY';
const MAX_ATTEMPTS = 5;

type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'current';

interface WordleGameProps {
  onComplete?: () => void;
}

export function WordleGame({ onComplete }: WordleGameProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (guesses.length === 2 && gameState === 'playing') {
      setShowHint(true);
    }
  }, [guesses.length, gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (e.key.match(/^[a-zA-Z]$/) && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameState]);

  const handleSubmit = () => {
    if (currentGuess.length !== 5) return;

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (currentGuess === TARGET_WORD) {
      setGameState('won');
      setTimeout(() => onComplete?.(), 2000);
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      setGameState('lost');
    }

    setCurrentGuess('');
  };

  const getTileState = (letter: string, index: number, word: string): TileState => {
    if (word[index] === TARGET_WORD[index]) return 'correct';
    if (TARGET_WORD.includes(letter)) return 'present';
    return 'absent';
  };

  const handleLetterClick = (letter: string) => {
    if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + letter);
    }
  };

  const handleBackspace = () => {
    setCurrentGuess(prev => prev.slice(0, -1));
  };

  const keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
  ];

  return (
    <div className="flex flex-col items-center p-3 bg-white rounded-3xl shadow-xl w-full max-w-md">
      <h3 
        className="text-[#5D3A5E] mb-2"
        style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}
      >
        Birthday Wordle
      </h3>

      {/* Hint bubble */}
      <AnimatePresence>
        {showHint && gameState === 'playing' && (
          <motion.div
            className="mb-2 px-3 py-2 bg-cream-50 border-2 rounded-2xl shadow-md relative"
            style={{ borderColor: '#EDE2FF' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => setShowHint(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-pink-400 text-white rounded-full flex items-center justify-center text-xs"
            >
              ✕
            </button>
            <p 
              className="text-[#5D3A5E]"
              style={{ fontSize: '13px', fontWeight: 500, fontFamily: 'Nunito, sans-serif' }}
            >
              Hint: ____ Birthday!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="flex flex-col gap-1 mb-2">
        {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
          const guess = guesses[rowIndex];
          const isCurrentRow = rowIndex === guesses.length && gameState === 'playing';
          const displayWord = isCurrentRow ? currentGuess.padEnd(5, ' ') : (guess || '     ');

          return (
            <div key={rowIndex} className="flex gap-1">
              {Array.from({ length: 5 }).map((_, colIndex) => {
                const letter = displayWord[colIndex];
                const state = guess
                  ? getTileState(letter, colIndex, guess)
                  : isCurrentRow && letter !== ' '
                  ? 'current'
                  : 'empty';

                const bgColor =
                  state === 'correct'
                    ? 'bg-green-500'
                    : state === 'present'
                    ? 'bg-yellow-500'
                    : state === 'absent'
                    ? 'bg-gray-400'
                    : state === 'current'
                    ? 'bg-pink-100 border-pink-400'
                    : 'bg-gray-100 border-gray-300';

                return (
                  <motion.div
                    key={colIndex}
                    className={`w-9 h-9 border-2 rounded-lg flex items-center justify-center ${bgColor}`}
                    initial={guess ? { rotateX: 0 } : false}
                    animate={guess ? { rotateX: [0, 90, 0] } : {}}
                    transition={guess ? { duration: 0.5, delay: colIndex * 0.1 } : {}}
                  >
                    <span
                      className={`${
                        state === 'correct' || state === 'present' || state === 'absent'
                          ? 'text-white'
                          : 'text-[#5D3A5E]'
                      }`}
                      style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}
                    >
                      {letter !== ' ' ? letter : ''}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Win/Loss message */}
      <AnimatePresence>
        {gameState === 'won' && (
          <motion.div
            className="mb-2 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <p 
              className="text-green-600 mb-1"
              style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}
            >
              Correct! You got it! 🎉
            </p>
            <p 
              className="text-[#5D3A5E]"
              style={{ fontSize: '14px', fontWeight: 500, fontFamily: 'Nunito, sans-serif' }}
            >
              +10 Birthday Luck ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard */}
      {gameState === 'playing' && (
        <div className="flex flex-col gap-0.5 w-full">
          {keyboard.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-0.5 justify-center">
              {row.map((key) => {
                const isSpecial = key === 'ENTER' || key === '⌫';
                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (key === 'ENTER') handleSubmit();
                      else if (key === '⌫') handleBackspace();
                      else handleLetterClick(key);
                    }}
                    className={`${
                      isSpecial ? 'px-2' : 'w-6'
                    } h-8 bg-gray-200 hover:bg-gray-300 rounded text-[#5D3A5E] transition-colors`}
                    style={{ fontSize: isSpecial ? '11px' : '13px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}