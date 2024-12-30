import React, { createContext, useState, useContext, useEffect } from 'react';
import { isPageUnlocked } from '../utils/dateUtils';

const UnlockContext = createContext();

export function UnlockProvider({ children }) {
  const [unlockedPages, setUnlockedPages] = useState([]);
  const [masterUnlock, setMasterUnlock] = useState(false);

  useEffect(() => {
    // Check localStorage for master unlock status
    const savedMasterUnlock = localStorage.getItem('masterUnlock') === 'true';
    setMasterUnlock(savedMasterUnlock);

    // Check which pages should be unlocked based on current date
    const checkUnlockedPages = () => {
      const unlocked = [];
      for (let i = 1; i <= 19; i++) {
        if (masterUnlock || isPageUnlocked(i)) {
          unlocked.push(i);
        }
      }
      setUnlockedPages(unlocked);
    };

    checkUnlockedPages();
    // Check every minute for new unlocks
    const interval = setInterval(checkUnlockedPages, 60000);
    return () => clearInterval(interval);
  }, [masterUnlock]);

  // Function to toggle master unlock
  const toggleMasterUnlock = () => {
    const newMasterUnlock = !masterUnlock;
    setMasterUnlock(newMasterUnlock);
    localStorage.setItem('masterUnlock', newMasterUnlock.toString());
  };

  // Secret key combination for master unlock (press 'm' + 'u')
  useEffect(() => {
    let keys = [];
    const handleKeyPress = (e) => {
      keys.push(e.key.toLowerCase());
      if (keys.length > 2) keys.shift();
      if (keys.join('') === 'mu') {
        toggleMasterUnlock();
        keys = [];
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [masterUnlock]);

  return (
    <UnlockContext.Provider value={{ 
      unlockedPages, 
      masterUnlock,
      toggleMasterUnlock 
    }}>
      {children}
    </UnlockContext.Provider>
  );
}

export function useUnlock() {
  return useContext(UnlockContext);
} 