import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const DayCell = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background: ${props => props.$isSpecialDate ? '#e3f2fd' : 'white'};
  border: 2px solid ${props => props.$isSpecialDate ? '#2196F3' : '#eee'};
  cursor: pointer;
  text-align: center;
  
  &:hover {
    background: ${props => props.$isSpecialDate ? '#bbdefb' : '#f5f5f5'};
  }

  .date {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .event {
    font-size: 0.8rem;
    color: #666;
  }
`;

const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MonthButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: #2196F3;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #1976D2;
  }
`;

const specialDates = [
  {
    date: '2024-07-05',
    event: 'First Message 💌'
  },
  {
    date: '2024-10-27',
    event: 'First Visit 🌟'
  },
  // Add more special dates
];

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date('2024-07-01'));

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSpecialDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return specialDates.find(sd => sd.date === dateString);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<DayCell key={`empty-${i}`} />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const specialDate = isSpecialDate(date);
      
      days.push(
        <DayCell 
          key={day} 
          $isSpecialDate={!!specialDate}
          onClick={() => specialDate && alert(specialDate.event)}
        >
          <div className="date">{day}</div>
          {specialDate && <div className="event">{specialDate.event}</div>}
        </DayCell>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  return (
    <CalendarContainer>
      <MonthHeader>
        <MonthButton onClick={prevMonth}>Previous</MonthButton>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <MonthButton onClick={nextMonth}>Next</MonthButton>
      </MonthHeader>
      <CalendarGrid>
        <DayCell>Sun</DayCell>
        <DayCell>Mon</DayCell>
        <DayCell>Tue</DayCell>
        <DayCell>Wed</DayCell>
        <DayCell>Thu</DayCell>
        <DayCell>Fri</DayCell>
        <DayCell>Sat</DayCell>
        {renderCalendar()}
      </CalendarGrid>
    </CalendarContainer>
  );
}

export default Calendar; 