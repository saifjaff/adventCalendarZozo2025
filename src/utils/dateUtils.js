// Set specific start and end dates
const START_DATE = new Date('2024-12-31T00:00:00');
const END_DATE = new Date('2025-01-19T00:00:00');

export function isPageUnlocked(dayNumber) {
  const currentDate = new Date();
  const unlockDate = getUnlockDate(dayNumber);
  
  // Check if current date is past or equal to unlock date
  return currentDate >= unlockDate;
}

export function getUnlockDate(dayNumber) {
  const unlockDate = new Date(START_DATE);
  unlockDate.setDate(START_DATE.getDate() + (dayNumber - 1));
  return unlockDate;
}

export function getTimeUntilUnlock(dayNumber) {
  const now = new Date();
  const unlockDate = getUnlockDate(dayNumber);
  const timeLeft = unlockDate - now;
  
  if (timeLeft <= 0) return null;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
}

// Helper function to format date to local string
export function formatUnlockDate(dayNumber) {
  const date = getUnlockDate(dayNumber);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Add a helper to get day content details
export const DAY_CONTENT = {
  1: { title: 'Welcome & Intro', icon: '👋', type: 'video' },
  2: { title: 'Fun Quiz', icon: '❓', type: 'quiz' },
  3: { title: 'Memory Lane', icon: '📸', type: 'gallery' },
  4: { title: 'Love Letter', icon: '💌', type: 'video' },
  5: { title: 'Our Playlist', icon: '🎵', type: 'playlist' },
  6: { title: 'Picture Puzzle', icon: '🧩', type: 'puzzle' },
  7: { title: 'Virtual Date', icon: '💑', type: 'activity' },
  8: { title: 'Future Goals', icon: '🎯', type: 'list' },
  9: { title: 'Karaoke Time', icon: '🎤', type: 'video' },
  10: { title: 'Trivia Game', icon: '🎮', type: 'quiz' },
  11: { title: 'DIY Recipe', icon: '👨‍🍳', type: 'video' },
  12: { title: 'Couple\'s Crossword', icon: '📝', type: 'puzzle' },
  13: { title: 'Throwback Thursday', icon: '⏰', type: 'memory' },
  14: { title: 'Virtual Gift', icon: '🎁', type: 'gift' },
  15: { title: 'Appreciation Day', icon: '❤️', type: 'video' },
  16: { title: 'Photo Collage', icon: '🖼️', type: 'gallery' },
  17: { title: 'Countdown', icon: '⏳', type: 'countdown' },
  18: { title: 'Grand Surprise', icon: '🎉', type: 'surprise' },
  19: { title: 'Final Message', icon: '💝', type: 'finale' }
}; 