import { useState } from 'react';
import { EnvelopeScreen } from './components/EnvelopeScreen';
import { CakeScreen } from './components/CakeScreen';
import { GiftGameScreen } from './components/GiftGameScreen';
import { MiniGamesScreen } from './components/MiniGamesScreen';
import { LetterScreen } from './components/LetterScreen';
import { CelebrationScreen } from './components/CelebrationScreen';
import { FloatingElements } from './components/FloatingElements';

type Screen = 'envelope' | 'cake' | 'game' | 'minigames' | 'letter' | 'celebration';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('envelope');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleNextScreen = (next: Screen) => {
    if (next === 'cake') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    setCurrentScreen(next);
  };

  const handleRestart = () => {
    setCurrentScreen('envelope');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 overflow-hidden relative">
      <FloatingElements />
      
      {currentScreen === 'envelope' && (
        <EnvelopeScreen onNext={() => handleNextScreen('cake')} />
      )}
      
      {currentScreen === 'cake' && (
        <CakeScreen 
          onNext={() => handleNextScreen('game')} 
          showConfetti={showConfetti}
        />
      )}
      
      {currentScreen === 'game' && (
        <GiftGameScreen onNext={() => handleNextScreen('minigames')} />
      )}
      
      {currentScreen === 'minigames' && (
        <MiniGamesScreen onNext={() => handleNextScreen('letter')} />
      )}
      
      {currentScreen === 'letter' && (
        <LetterScreen onNext={() => handleNextScreen('celebration')} />
      )}
      
      {currentScreen === 'celebration' && (
        <CelebrationScreen onRestart={handleRestart} />
      )}
    </div>
  );
}