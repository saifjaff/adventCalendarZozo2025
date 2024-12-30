import React from 'react';
import styled from 'styled-components';
import { useUnlock } from '../context/UnlockContext';
import CountdownTimer from '../components/CountdownTimer';
import { getUnlockDate, isPageUnlocked } from '../utils/dateUtils';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const LockedMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin: 2rem 0;
`;

function DayPage({ dayNumber }) {
  const { unlockedPages } = useUnlock();
  const isUnlocked = isPageUnlocked(dayNumber);

  if (!isUnlocked) {
    const unlockDate = getUnlockDate(dayNumber);
    return (
      <PageContainer>
        <LockedMessage>
          <h2>This page is locked</h2>
          <p>This content will unlock on {unlockDate.toLocaleDateString()}</p>
          <CountdownTimer dayNumber={dayNumber} />
        </LockedMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1>Day {dayNumber}</h1>
      
      {/* Video Section */}
      <div className="video-section">
        <h2>Today's Video</h2>
        <div className="video-placeholder">
          {/* Video embed will go here */}
        </div>
      </div>

      {/* Interactive Content Section */}
      <div className="interactive-section">
        <h2>Interactive Content</h2>
        {/* Placeholder for quiz, images, or other content */}
      </div>
    </PageContainer>
  );
}

export default DayPage; 