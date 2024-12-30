import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTimeUntilUnlock } from '../utils/dateUtils';

const TimerContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  font-size: 1.2rem;
  margin: 1rem 0;
`;

function CountdownTimer({ dayNumber }) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilUnlock(dayNumber));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeUntilUnlock(dayNumber);
      setTimeLeft(newTimeLeft);
      
      if (!newTimeLeft) {
        clearInterval(timer);
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [dayNumber]);

  if (!timeLeft) return null;

  return (
    <TimerContainer>
      <span>{timeLeft.days}d</span>
      <span>{timeLeft.hours}h</span>
      <span>{timeLeft.minutes}m</span>
    </TimerContainer>
  );
}

export default CountdownTimer; 