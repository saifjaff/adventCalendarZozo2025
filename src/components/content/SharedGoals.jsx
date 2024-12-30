import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { saveToSheetDB } from '../../utils/sheetDB';

const GoalsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const GoalSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const GoalCard = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border-left: 4px solid ${props => props.$type === 'yours' ? '#4CAF50' : '#2196F3'};
  
  h3 {
    color: ${props => props.$type === 'yours' ? '#4CAF50' : '#2196F3'};
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const AddGoalForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    border-color: #2196F3;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #1976D2;
  }
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

// Preset goals
const presetGoals = [
  {
    title: "Travel Together",
    description: "Visit the every countries together"
  },

  {
    title: "Travel Goal",
    description: "Visit the 5 countries in our first year married"
  },

  {
    title: "Build a Home",
    description: "Create our dream custom house"
  },
  {
    title: "Family Goals",
    description: "Have 3 beautiful children and raise them with love"
  },
  {
    title: "Adventure Time",
    description: "Try one new activity together every month"
  },
  {
    title: "Financial Goals",
    description: "Be financially free by 35"
  },
  {
    title: "Health Goals",
    description: "Best super strong and healthy for our future family"
  } 
];

function SharedGoals() {
  const [userGoals, setUserGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  // Load saved goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('userGoals');
    if (savedGoals) {
      setUserGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to localStorage when updated
  useEffect(() => {
    localStorage.setItem('userGoals', JSON.stringify(userGoals));
  }, [userGoals]);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (newGoal.trim()) {
      const updatedGoals = [...userGoals, { 
        title: "Your Goal", 
        description: newGoal,
        timestamp: new Date().toISOString()
      }];
      
      setUserGoals(updatedGoals);
      setNewGoal('');

      // Save to SheetDB whenever a goal is added
      try {
        await saveToSheetDB(8, 'goals', {
          goals: updatedGoals,
          latestGoal: newGoal,
          addedAt: new Date().toISOString()
        });
        console.log('Goal saved successfully');
      } catch (error) {
        console.error('Error saving goal:', error);
      }
    }
  };

  return (
    <GoalsContainer>
      <GoalSection>
        <SectionTitle>Our Shared Dreams 💫</SectionTitle>
        {presetGoals.map((goal, index) => (
          <GoalCard key={index} $type="mine">
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
          </GoalCard>
        ))}
      </GoalSection>

      <GoalSection>
        <SectionTitle>Your Added Goals 🌟</SectionTitle>
        {userGoals.map((goal, index) => (
          <GoalCard key={index} $type="yours">
            <h3>
              {goal.title}
              <span style={{ fontSize: '0.8em', color: '#666' }}>Added by you</span>
            </h3>
            <p>{goal.description}</p>
          </GoalCard>
        ))}
        
        <AddGoalForm onSubmit={handleAddGoal}>
          <Input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add your own goal..."
          />
          <Button type="submit">Add Goal</Button>
        </AddGoalForm>
      </GoalSection>
    </GoalsContainer>
  );
}

export default SharedGoals; 