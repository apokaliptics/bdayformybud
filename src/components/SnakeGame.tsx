import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 15;
const CELL_SIZE = 18;
const GAME_DURATION = 20000; // 20 seconds

interface SnakeGameProps {
  onComplete?: () => void;
}

export function SnakeGame({ onComplete }: SnakeGameProps) {
  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [bonus, setBonus] = useState<Position | null>(null);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'ended'>('ready');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const directionRef = useRef<Direction>('RIGHT');

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Spawn bonus randomly
  useEffect(() => {
    if (gameState !== 'playing') return;

    const bonusInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        const newBonus = generateFood();
        setBonus(newBonus);
        setTimeout(() => setBonus(null), 3000);
      }
    }, 5000);

    return () => clearInterval(bonusInterval);
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead: Position;

        switch (directionRef.current) {
          case 'UP':
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case 'DOWN':
            newHead = { x: head.x, y: head.y + 1 };
            break;
          case 'LEFT':
            newHead = { x: head.x - 1, y: head.y };
            break;
          case 'RIGHT':
            newHead = { x: head.x + 1, y: head.y };
            break;
        }

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameState('ended');
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameState('ended');
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => prev + 1);
          setFood(generateFood());
        } else if (bonus && newHead.x === bonus.x && newHead.y === bonus.y) {
          setScore((prev) => prev + 2);
          setBonus(null);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameLoop);
  }, [gameState, food, bonus]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      const newDirection =
        e.key === 'ArrowUp' && directionRef.current !== 'DOWN'
          ? 'UP'
          : e.key === 'ArrowDown' && directionRef.current !== 'UP'
          ? 'DOWN'
          : e.key === 'ArrowLeft' && directionRef.current !== 'RIGHT'
          ? 'LEFT'
          : e.key === 'ArrowRight' && directionRef.current !== 'LEFT'
          ? 'RIGHT'
          : null;

      if (newDirection) {
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const generateFood = (): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  const handleDirectionClick = (newDirection: Direction) => {
    if (
      (newDirection === 'UP' && directionRef.current !== 'DOWN') ||
      (newDirection === 'DOWN' && directionRef.current !== 'UP') ||
      (newDirection === 'LEFT' && directionRef.current !== 'RIGHT') ||
      (newDirection === 'RIGHT' && directionRef.current !== 'LEFT')
    ) {
      setDirection(newDirection);
    }
  };

  const handleRestart = () => {
    setSnake([{ x: 7, y: 7 }]);
    setFood({ x: 10, y: 10 });
    setBonus(null);
    setDirection('RIGHT');
    setGameState('playing');
    setScore(0);
    setTimeLeft(20);
  };

  return (
    <div className="flex flex-col items-center p-3 bg-white rounded-3xl shadow-xl w-full max-w-md">
      <h3 
        className="text-[#5D3A5E] mb-2"
        style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}
      >
        Cake Snake
      </h3>

      {/* Score and Timer */}
      <div className="flex justify-between w-full mb-2 px-2">
        <p 
          className="text-[#5D3A5E]"
          style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}
        >
          Score: {score} → +{score * 10} VND
        </p>
        <p 
          className="text-[#5D3A5E]"
          style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}
        >
          ⏱️ {timeLeft}s
        </p>
      </div>

      {/* Game Board */}
      <div
        className="relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-inner mb-2"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 grid opacity-10" style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <div key={i} className="border border-gray-300" />
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, index) => (
          <motion.div
            key={index}
            className={`absolute ${
              index === 0 ? 'bg-gradient-to-br from-pink-500 to-pink-600' : 'bg-pink-400'
            } rounded-lg`}
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: segment.x * CELL_SIZE + 1,
              top: segment.y * CELL_SIZE + 1,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
          >
            {index === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-xs">
                👀
              </div>
            )}
          </motion.div>
        ))}

        {/* Food (cake) */}
        <motion.div
          className="absolute text-center"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            fontSize: '16px',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          🍰
        </motion.div>

        {/* Bonus (star) */}
        {bonus && (
          <motion.div
            className="absolute text-center"
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: bonus.x * CELL_SIZE,
              top: bonus.y * CELL_SIZE,
              fontSize: '16px',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1], rotate: [0, 360] }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            ⭐
          </motion.div>
        )}

        {/* Game Over Overlay */}
        <AnimatePresence>
          {gameState === 'ready' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-pink-100/90 to-purple-100/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p 
                className="text-[#5D3A5E] mb-6 text-center px-4"
                style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}
              >
                Ready to catch some cake? 🍰
              </p>
              <button
                onClick={() => setGameState('playing')}
                className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}
              >
                Start Game 🎮
              </button>
            </motion.div>
          )}
          
          {gameState === 'ended' && (
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p 
                className="text-white mb-2"
                style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}
              >
                Game Over!
              </p>
              <p 
                className="text-white mb-3"
                style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}
              >
                Final score: {score} → +{score * 10} VND
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                  style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}
                >
                  Play again
                </button>
                <button
                  onClick={onComplete}
                  className="px-4 py-2 bg-white text-[#5D3A5E] rounded-full shadow-lg hover:scale-105 transition-transform"
                  style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}
                >
                  Back to celebration
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Controls */}
      <div className="grid grid-cols-3 gap-2 w-48">
        <div />
        <button
          onClick={() => handleDirectionClick('UP')}
          className="w-14 h-14 bg-gradient-to-br from-purple-300 to-purple-400 rounded-lg text-white shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
          style={{ fontSize: '24px' }}
        >
          ⬆️
        </button>
        <div />
        <button
          onClick={() => handleDirectionClick('LEFT')}
          className="w-14 h-14 bg-gradient-to-br from-purple-300 to-purple-400 rounded-lg text-white shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
          style={{ fontSize: '24px' }}
        >
          ⬅️
        </button>
        <div />
        <button
          onClick={() => handleDirectionClick('RIGHT')}
          className="w-14 h-14 bg-gradient-to-br from-purple-300 to-purple-400 rounded-lg text-white shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
          style={{ fontSize: '24px' }}
        >
          ➡️
        </button>
        <div />
        <button
          onClick={() => handleDirectionClick('DOWN')}
          className="w-14 h-14 bg-gradient-to-br from-purple-300 to-purple-400 rounded-lg text-white shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
          style={{ fontSize: '24px' }}
        >
          ⬇️
        </button>
        <div />
      </div>

      <p 
        className="text-[#5D3A5E] text-center mt-4"
        style={{ fontSize: '14px', fontWeight: 500 }}
      >
        Use arrow keys or buttons to move
      </p>
    </div>
  );
}