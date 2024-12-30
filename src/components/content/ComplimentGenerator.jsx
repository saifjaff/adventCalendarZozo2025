import React, { useState } from 'react';
import styled from 'styled-components';

const GeneratorContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const ComplimentDisplay = styled.div`
  margin: 2rem auto;
  padding: 2rem;
  background: ${props => props.$hasCompliment ? '#e8f5e9' : '#f8f9fa'};
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  max-width: 600px;
  
  h3 {
    color: #2e7d32;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #333;
  }
`;

const GenerateButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);

  &:hover {
    background: #1976D2;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Emoji = styled.div`
  font-size: 3rem;
  margin: 1rem 0;
`;

const compliments = [
  {
    text: "Your smile lights up my entire world and makes every day brighter! ✨",
    emoji: "😊"
  },
  {
    text: "Your kindness and compassion inspire me to be a better person every day.",
    emoji: "💝"
  },
  {
    text: "You're not just beautiful on the outside, your heart is pure gold!",
    emoji: "💖"
  },
  {
    text: "The way you care for others shows what an amazing soul you have.",
    emoji: "🌟"
  },
  {
    text: "Your strength and determination never cease to amaze me.",
    emoji: "💪"
  },
  {
    text: "You make every moment we spend together magical and special.",
    emoji: "✨"
  },
  {
    text: "Your laugh is my favorite sound in the whole world!",
    emoji: "😄"
  },
  {
    text: "You're the most thoughtful and caring person I've ever known.",
    emoji: "🥰"
  },
  {
    text: "Your intelligence and wit make every conversation exciting.",
    emoji: "🧠"
  },
  {
    text: "The way you follow your dreams inspires me every single day.",
    emoji: "⭐"
  },
  {
    text: "You make ordinary moments extraordinary just by being you.",
    emoji: "🌈"
  },
  {
    text: "Your love makes my life complete in every way possible.",
    emoji: "❤️"
  },
  {
    text: "You're the reason I believe in soulmates.",
    emoji: "💑"
  },
  {
    text: "Your cooking skills are absolutely amazing, just like you!",
    emoji: "👩‍🍳"
  },
  {
    text: "The way you care for our future shows what an incredible partner you are.",
    emoji: "🔮"
  }
];

function ComplimentGenerator() {
  const [currentCompliment, setCurrentCompliment] = useState(null);
  const [animation, setAnimation] = useState(false);

  const generateCompliment = () => {
    setAnimation(true);
    // Get a random compliment different from the current one
    let newCompliment;
    do {
      newCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    } while (newCompliment === currentCompliment && compliments.length > 1);
    
    setCurrentCompliment(newCompliment);
    setTimeout(() => setAnimation(false), 300);
  };

  return (
    <GeneratorContainer>
      <GenerateButton onClick={generateCompliment}>
        Generate a Compliment 💝
      </GenerateButton>

      <ComplimentDisplay 
        $hasCompliment={!!currentCompliment}
        style={{ 
          transform: animation ? 'scale(1.02)' : 'scale(1)',
          opacity: animation ? 0.8 : 1 
        }}
      >
        {currentCompliment ? (
          <>
            <Emoji>{currentCompliment.emoji}</Emoji>
            <p>{currentCompliment.text}</p>
          </>
        ) : (
          <p>Click the button to generate a sweet compliment! 💕</p>
        )}
      </ComplimentDisplay>
    </GeneratorContainer>
  );
}

export default ComplimentGenerator; 