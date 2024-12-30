import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import MessageText from '../../components/content/MessageText';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

const FactsContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FactCard = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #2196F3;
  
  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    color: #2196F3;
    margin-bottom: 0.5rem;
  }
`;

const funFacts = [
  {
    title: "First Message",
    fact: "You slid into my DMs 3 times before I responded! 😅"
  },
  {
    title: "First Date",
    fact: "We met in person on October 27th, 2024 ❤️"
  },
  {
    title: "Future Plans",
    fact: "We're planning to have 3 kids! 👶👶👶"
  },
  {
    title: "Our Beginning",
    fact: "Our story started on July 5th, 2024 💝"
  },
  {
    title: "Hockey Days",
    fact: "I played hockey until grade nine! 🏒"
  },
  {
    title: "Tech Lover",
    fact: "I absolutely love tech! 💻"
  },
  {
    title: "World Traveler",
    fact: "I've been to 27 countries! 🌍"
  },
  {
    title: "Braces Era",
    fact: "I had braces for 6 years! 😬"
  },
  {
    title: "Love",
    fact: "I love you! 💕"
  }
];

function Day7() {
  return (
    <ContentLayout dayNumber={7}>
      <MessageText>
        Fun Facts About Us! 📝
      </MessageText>

      <VideoPlayer 
        videoId="TtSQAkKtNMM"
        title="Fun Facts Introduction"
      />
      
      <ActivityContainer>
        <FactsContainer>
          {funFacts.map((fact, index) => (
            <FactCard key={index}>
              <h3>{fact.title}</h3>
              <p>{fact.fact}</p>
            </FactCard>
          ))}
        </FactsContainer>
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day7; 