import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useUnlock } from '../context/UnlockContext';
import CountdownTimer from '../components/CountdownTimer';
import { formatUnlockDate, isPageUnlocked, DAY_CONTENT } from '../utils/dateUtils';
import ItineraryPage from './ItineraryPage';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const WelcomeSection = styled.section`
  margin: 2rem 0;
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
`;

const DayCard = styled(Link)`
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  background: ${props => props.$unlocked ? '#fff' : '#f5f5f5'};
  opacity: ${props => props.$unlocked ? 1 : 0.7};
  
  &:hover {
    transform: ${props => props.$unlocked ? 'scale(1.02)' : 'none'};
    transition: transform 0.2s;
  }
`;

const DayCardContent = styled.div`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .day-number {
    font-size: 1rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  .unlock-date {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
  }
  
  .status {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    background: ${props => props.$unlocked ? '#e6ffe6' : '#fff3e6'};
    color: ${props => props.$unlocked ? '#006600' : '#cc6600'};
  }
`;

const ReturnCountdown = styled.div`
  text-align: center;
  margin: 2rem 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }

  h2 {
    color: #2196F3;
    margin-bottom: 1rem;
  }
`;

const TimeDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const TimeUnit = styled.div`
  background: #2196F3;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  
  .number {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: bold;
  }
  
  .label {
    font-size: clamp(0.7rem, 2vw, 0.8rem);
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const ItineraryButton = styled.button`
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.7 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    background: #1976D2;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ItineraryModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);

  &:hover {
    background: #ff6666;
  }
`;

const TravelStatus = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #e3f2fd;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  h3 {
    color: #1976D2;
    margin-bottom: 0.5rem;
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    color: #333;
  }

  .location-emoji {
    font-size: 1.5rem;
  }
`;

const getCurrentTravelStatus = () => {
  const now = new Date();
  
  const statusTimeline = [
    {
      start: new Date('2024-12-31T16:15:00-05:00'),
      end: new Date('2024-12-31T18:15:00-05:00'),
      status: "Ready to Leave Toronto",
      emoji: "🧳"
    },
    {
      start: new Date('2024-12-31T18:15:00-05:00'),
      end: new Date('2025-01-01T07:45:00-05:00'),
      status: "✈️ Flying to Jeddah",
      emoji: "✈️"
    },
    {
      start: new Date('2025-01-01T07:45:00-05:00'),
      end: new Date('2025-01-01T11:55:00-05:00'),
      status: "Layover in Jeddah",
      emoji: "⏳"
    },
    {
      start: new Date('2025-01-01T11:55:00-05:00'),
      end: new Date('2025-01-01T15:45:00-05:00'),
      status: "✈️ Flying to Karachi",
      emoji: "✈️"
    },
    {
      start: new Date('2025-01-01T15:45:00-05:00'),
      end: new Date('2025-01-12T19:45:00-05:00'),
      status: "In Karachi",
      emoji: "🇵🇰"
    },
    {
      start: new Date('2025-01-12T19:45:00-05:00'),
      end: new Date('2025-01-12T21:05:00-05:00'),
      status: "✈️ Flying to Abu Dhabi",
      emoji: "✈️"
    },
    {
      start: new Date('2025-01-12T21:05:00-05:00'),
      end: new Date('2025-01-12T23:45:00-05:00'),
      status: "Layover in Abu Dhabi",
      emoji: "⏳"
    },
    {
      start: new Date('2025-01-12T23:45:00-05:00'),
      end: new Date('2025-01-13T06:50:00-05:00'),
      status: "✈️ Flying to Kuala Lumpur",
      emoji: "✈️"
    },
    {
      start: new Date('2025-01-13T06:50:00-05:00'),
      end: new Date('2025-01-15T13:15:00-05:00'),
      status: "In Kuala Lumpur",
      emoji: "🇲🇾"
    },
    {
      start: new Date('2025-01-15T13:15:00-05:00'),
      end: new Date('2025-01-15T19:20:00-05:00'),
      status: "✈️ Flying to Jeddah",
      emoji: "✈️"
    },
    {
      start: new Date('2025-01-15T19:20:00-05:00'),
      end: new Date('2025-01-18T02:30:00-05:00'),
      status: "In Jeddah",
      emoji: "🇸🇦"
    },
    {
      start: new Date('2025-01-18T02:30:00-05:00'),
      end: new Date('2025-01-18T15:25:00-05:00'),
      status: "✈️ Flying Home to Toronto",
      emoji: "✈️"
    }
  ];

  for (const period of statusTimeline) {
    if (now >= period.start && now <= period.end) {
      return period;
    }
  }

  if (now < statusTimeline[0].start) {
    return { 
      status: "Preparing for Journey",
      emoji: "📅"
    };
  }
  
  return { 
    status: "Back Home in Toronto",
    emoji: "🏠"
  };
};

function Homepage() {
  const { unlockedPages, masterUnlock } = useUnlock();
  const currentDay = unlockedPages.length + 1;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showItinerary, setShowItinerary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(getCurrentTravelStatus());

  useEffect(() => {
    const returnDate = new Date('2025-01-18T15:25:00-05:00'); // EST timezone

    const timer = setInterval(() => {
      const now = new Date();
      const difference = returnDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setCurrentStatus(getCurrentTravelStatus());
    }, 60000); // Update every minute

    return () => clearInterval(statusTimer);
  }, []);

  const handleItineraryClick = () => {
    setIsLoading(true);
    setShowItinerary(true);
    setTimeout(() => setIsLoading(false), 500); // Add small delay for smooth transition
  };

  return (
    <HomeContainer>
      <ReturnCountdown>
        <h2>Time Until Return 🛬</h2>
        <TimeDisplay>
          <TimeUnit>
            <div className="number">{timeLeft.days}</div>
            <div className="label">Days</div>
          </TimeUnit>
          <TimeUnit>
            <div className="number">{timeLeft.hours}</div>
            <div className="label">Hours</div>
          </TimeUnit>
          <TimeUnit>
            <div className="number">{timeLeft.minutes}</div>
            <div className="label">Minutes</div>
          </TimeUnit>
          <TimeUnit>
            <div className="number">{timeLeft.seconds}</div>
            <div className="label">Seconds</div>
          </TimeUnit>
        </TimeDisplay>
        <TravelStatus>
          <h3>Current Status</h3>
          <div className="status">
            <span className="location-emoji">{currentStatus.emoji}</span>
            <span>{currentStatus.status}</span>
          </div>
        </TravelStatus>
        <ItineraryButton 
          onClick={handleItineraryClick} 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'View Itinerary 📋'}
        </ItineraryButton>
      </ReturnCountdown>

      {showItinerary && (
        <ItineraryModal>
          <CloseButton onClick={() => setShowItinerary(false)}>×</CloseButton>
          <ItineraryPage isModal={true} />
        </ItineraryModal>
      )}

      <WelcomeSection>
        <h1>Welcome to Your Adventure Calendar!</h1>
        {masterUnlock && (
          <div style={{ 
            background: '#e6ffe6', 
            padding: '0.5rem', 
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            🔓 Master Unlock Active
          </div>
        )}
        <p>
          While I am away on vacation, I'll be with you every step of the way. 
          Each day brings a new surprise to remind you how much I miss you and 
          to share in your journey from New Year's Eve to January 18th! 💝
        </p>
        
        {currentDay <= 19 && (
          <div>
            <h2>Next unlock in:</h2>
            <CountdownTimer dayNumber={currentDay} />
          </div>
        )}
      </WelcomeSection>

      <DayGrid>
        {[...Array(19)].map((_, index) => {
          const dayNum = index + 1;
          const unlocked = masterUnlock || isPageUnlocked(dayNum);
          const content = DAY_CONTENT[dayNum];
          
          return (
            <DayCard 
              key={dayNum}
              to={unlocked ? `/day-${dayNum}` : '#'}
              $unlocked={unlocked}
              onClick={(e) => {
                if (!unlocked) {
                  e.preventDefault();
                }
              }}
            >
              <DayCardContent $unlocked={unlocked}>
                <h3>
                  <span>{content.icon}</span>
                  <span>Day {dayNum}</span>
                </h3>
                <div className="unlock-date">
                  {formatUnlockDate(dayNum)}
                </div>
                <div className="status">
                  {unlocked ? '🎉 Unlock' : '🔒 Locked'}
                </div>
                {!unlocked && <CountdownTimer dayNumber={dayNum} />}
              </DayCardContent>
            </DayCard>
          );
        })}
      </DayGrid>

      {unlockedPages.length === 19 && (
        <Link to="/final-surprise">
          <h2>🎉 Journey Complete! 🎉</h2>
        </Link>
      )}
    </HomeContainer>
  );
}

export default Homepage; 