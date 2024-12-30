import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../components/layout/ContentLayout';

const ItineraryContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;

  h1 {
    font-size: clamp(1.5rem, 4vw, 2rem);
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const FlightSection = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const FlightCard = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #2196F3;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem 0;
  }

  &::before {
    content: '✈️';
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    padding: 5px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    @media (max-width: 480px) {
      left: -15px;
      font-size: 0.8rem;
    }
  }

  ${props => props.$active && `
    border-left: 4px solid #4CAF50;
    background: #E8F5E9;
  `}
`;

const FlightHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
  gap: 0.5rem;

  h3 {
    color: #2196F3;
    font-size: clamp(1rem, 3vw, 1.2rem);
  }

  .duration {
    background: #e3f2fd;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: clamp(0.8rem, 2.5vw, 0.9rem);
    color: #1976D2;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const TimeBlock = styled.div`
  h4 {
    color: #666;
    margin-bottom: 0.5rem;
  }

  .time {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  .date {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Layover = styled.div`
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background: #fff3e0;
  border-radius: 8px;
  color: #f57c00;
  font-size: 0.9rem;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  background: ${props => props.$active ? '#4CAF50' : '#9e9e9e'};
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const StayDuration = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: #e8f5e9;
  border-radius: 12px;
  border-left: 4px solid #4CAF50;
  text-align: center;
  font-size: 1.1rem;
  color: #2e7d32;
  font-weight: bold;
`;

const flights = [
  {
    id: 1,
    route: "Toronto → Jeddah",
    departure: {
      est: "31 December 2024, 6:15 PM",
      local: "31 December 2024, 6:15 PM",
      timestamp: "2024-12-31T18:15:00-05:00"
    },
    arrival: {
      est: "1 January 2025, 7:45 AM",
      local: "1 January 2025, 1:45 PM",
      timestamp: "2025-01-01T07:45:00-05:00"
    },
    duration: "11:30 hours",
    layover: "5 hours, 10 minutes in Jeddah"
  },
  {
    id: 2,
    route: "Jeddah → Karachi",
    departure: {
      est: "1 January 2025, 11:55 AM",
      local: "1 January 2025, 6:55 PM",
      timestamp: "2025-01-01T11:55:00-05:00"
    },
    arrival: {
      est: "1 January 2025, 3:45 PM",
      local: "2 January 2025, 12:45 AM",
      timestamp: "2025-01-01T15:45:00-05:00"
    },
    duration: "3:50 hours"
  },
  {
    id: 3,
    route: "Karachi → Abu Dhabi",
    departure: {
      est: "12 January 2025, 7:45 PM",
      local: "13 January 2025, 4:45 AM",
      timestamp: "2025-01-12T19:45:00-05:00"
    },
    arrival: {
      est: "12 January 2025, 9:05 PM",
      local: "13 January 2025, 6:05 AM",
      timestamp: "2025-01-12T21:05:00-05:00"
    },
    duration: "2:20 hours",
    layover: "2 hours, 40 minutes in Abu Dhabi"
  },
  {
    id: 4,
    route: "Abu Dhabi → Kuala Lumpur",
    departure: {
      est: "12 January 2025, 11:45 PM",
      local: "13 January 2025, 8:45 AM",
      timestamp: "2025-01-12T23:45:00-05:00"
    },
    arrival: {
      est: "13 January 2025, 6:50 AM",
      local: "13 January 2025, 7:50 PM",
      timestamp: "2025-01-13T06:50:00-05:00"
    },
    duration: "7:05 hours",
    layover: "6 hours, 25 minutes in Kuala Lumpur"
  },
  {
    id: 5,
    route: "Kuala Lumpur → Jeddah",
    departure: {
      est: "15 January 2025, 1:15 PM",
      local: "16 January 2025, 2:15 AM",
      timestamp: "2025-01-15T13:15:00-05:00"
    },
    arrival: {
      est: "15 January 2025, 7:20 PM",
      local: "16 January 2025, 6:20 AM",
      timestamp: "2025-01-15T19:20:00-05:00"
    },
    duration: "9:05 hours",
    layover: "27 hours, 10 minutes in Jeddah"
  },
  {
    id: 6,
    route: "Jeddah → Toronto",
    departure: {
      est: "18 January 2025, 2:30 AM",
      local: "18 January 2025, 9:30 AM",
      timestamp: "2025-01-18T02:30:00-05:00"
    },
    arrival: {
      est: "18 January 2025, 3:25 PM",
      local: "18 January 2025, 3:25 PM",
      timestamp: "2025-01-18T15:25:00-05:00"
    },
    duration: "13:55 hours"
  }
];

function ItineraryPage({ isModal }) {
  const getCurrentFlight = () => {
    const now = new Date();
    
    for (const flight of flights) {
      const departureTime = new Date(flight.departure.timestamp);
      const arrivalTime = new Date(flight.arrival.timestamp);
      
      if (now >= departureTime && now <= arrivalTime) {
        return flight.id;
      }
    }
    
    return null;
  };

  const getFlightStatus = (flight) => {
    const now = new Date();
    const departureTime = new Date(flight.departure.timestamp);
    const arrivalTime = new Date(flight.arrival.timestamp);

    if (now < departureTime) {
      return "Upcoming";
    } else if (now > arrivalTime) {
      return "Completed";
    } else {
      return "In Progress";
    }
  };

  const currentFlightId = getCurrentFlight();

  const renderFlightsWithStays = () => {
    return flights.map((flight, index) => {
      const elements = [];
      
      // Add flight card
      elements.push(
        <FlightCard 
          key={`flight-${flight.id}`} 
          $active={flight.id === currentFlightId}
        >
          <StatusBadge $active={flight.id === currentFlightId}>
            {getFlightStatus(flight)}
          </StatusBadge>
          <FlightHeader>
            <h3>{flight.route}</h3>
            <span className="duration">{flight.duration}</span>
          </FlightHeader>
          
          <TimeGrid>
            <TimeBlock>
              <h4>Departure</h4>
              <div className="time">EST: {flight.departure.est}</div>
              <div className="date">Local: {flight.departure.local}</div>
            </TimeBlock>
            <TimeBlock>
              <h4>Arrival</h4>
              <div className="time">EST: {flight.arrival.est}</div>
              <div className="date">Local: {flight.arrival.local}</div>
            </TimeBlock>
          </TimeGrid>
          
          {flight.layover && (
            <Layover>
              Layover: {flight.layover}
            </Layover>
          )}
        </FlightCard>
      );

      // Add stay duration after specific flights
      if (flight.route.includes('→ Karachi')) {
        elements.push(
          <StayDuration key="stay-karachi">
            Stay in Karachi: 11 days, 4 hours 🇵🇰
          </StayDuration>
        );
      } else if (flight.route.includes('→ Kuala Lumpur')) {
        elements.push(
          <StayDuration key="stay-kl">
            Stay in Kuala Lumpur: 2 days, 6 hours 🇲🇾
          </StayDuration>
        );
      } else if (flight.route.includes('→ Jeddah') && index === 4) {
        elements.push(
          <StayDuration key="stay-jeddah">
            Stay in Jeddah: 2 days, 20 hours 🇸🇦
          </StayDuration>
        );
      }

      return elements;
    });
  };

  return (
    isModal ? (
      <ItineraryContainer>
        <h1>Flight Itinerary ✈️</h1>
        <FlightSection>
          {renderFlightsWithStays()}
        </FlightSection>
      </ItineraryContainer>
    ) : (
      <ContentLayout>
        <ItineraryContainer>
          <h1>Flight Itinerary ✈️</h1>
          <FlightSection>
            {renderFlightsWithStays()}
          </FlightSection>
        </ItineraryContainer>
      </ContentLayout>
    )
  );
}

export default ItineraryPage; 