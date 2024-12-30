import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ReasonsContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

const ReasonsList = styled.div`
  height: 500px;
  overflow-y: auto;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #2196F3;
    border-radius: 4px;
  }
`;

const ReasonItem = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.5s ease;
  border-left: 4px solid #2196F3;
  animation: fadeIn 1s ease;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateX(${props => props.$visible ? '0' : '-20px'});

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const Counter = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: #2196F3;
  font-weight: bold;
`;

const allReasons = [
  "Your beautiful smile lights up my entire world 💖",  
"The way you laugh at my silly jokes 😊",  
"How you always know exactly what to say to make me feel better 💕",  
"Your incredible determination and drive 🎯",  
"The way you care so deeply about your family 👨‍👩‍👧‍👦",  
"Your amazing sense of style and fashion 👗",  
"How you make every moment feel special 🌟",  
"The way you dance when you're happy 💃",  
"Your infectious enthusiasm for life 🌈",  
"The way you support all my dreams and goals 🌠",  
"Your kindness to everyone you meet 🤗",  
"How you always see the best in people 👥",  
"The way you scrunch your nose when you laugh 😄",  
"Your passion for helping others 🤝",  
"How you make ordinary days extraordinary ✨",  
"The way your eyes light up when you're excited 😍",  
"Your strength in tough times inspires me 💪",  
"How you always know how to make me feel at home 🏡",  
"The way you believe in me even when I doubt myself 🌈",  
"Your unique perspective on life 🌎",  
"The way you raise the roof with your dance moves 🕺",  
"Your love for little moments that matter most 🕰️",  
"The way your voice soothes my heart 🎶",  
"Your natural ability to brighten someone's day ☀️",  
"The sparkle in your eyes when you talk about your passions ✨",  
"The way you turn challenges into opportunities 🌱",  
"Your thoughtfulness in every little thing you do 🥰",  
"How you never stop chasing your dreams 🚀",  
"The way you appreciate the beauty in everything 🌸",  
"Your love for adventure and trying new things 🌍",  
"How you always bring joy into every situation 🎉",  
"Your laughter that feels like music to my soul 🎵",  
"The way you light up every room you walk into 💡",  
"Your kindness and warmth that feel like home ❤️",  
"The way you never give up, no matter what 💪",  
"Your endless curiosity about the world 🌌",  
"The way you listen with your whole heart ❤️",  
"Your gentle and compassionate spirit 🕊️",  
"The way you remember the smallest details about us 📝",  
"Your ability to find magic in the mundane ✨",  
"The way you cheer me on when I need it most 📣",  
"Your love for sunsets and quiet moments 🌅",  
"How you turn my worries into laughter 😂",  
"Your comforting hugs that feel like heaven 🤗",  
"The way you hold my hand and make me feel safe 👐",  
"Your confidence that inspires everyone around you 💃",  
"The way you make me proud to call you mine 💖",  
"Your beautiful soul that shines through in everything you do 🌟",  
"The way you surprise me with your thoughtfulness 🎁",  
"Your ability to make even the hardest days better 🌈",  
"How you inspire me to be the best version of myself 💪",  
"The way you embrace life with so much energy and love ⚡",  
"Your honesty and sincerity that I admire so much 🕊️",  
"Your radiant positivity that keeps me going 🌞",  
"The way you make my heart skip a beat every single day 💓",  
"Your unwavering support that means the world to me 🌍",  
"The way you make everything in life feel like an adventure 🚴",  
"Your creativity and imagination that amaze me every time 🎨",  
"Your quirky sense of humor that always makes me laugh 😂",  
"How you can turn any moment into something unforgettable 🥳",  
"The way you remind me that love is the most powerful thing ❤️",  
"Your intelligence and wit that keep me on my toes 🤓",  
"The way you make ordinary things feel extraordinary 🌟",  
"Your courage to face the unknown with grace and confidence 🛡️",  
"The way you care for others with so much love and kindness 💕",  
"Your incredible ability to see beauty where others might miss it 🌸",  
"The way you make me feel like the luckiest person alive 🍀",  
"The way your laughter echoes in my heart 🎶",  
"Your endless optimism that keeps us both going 🌈",  
"The way you love with your whole heart and soul ❤️",  
"The way you make me believe in fairytales 🏰",  
"The way you effortlessly light up every moment ✨",  
"Your gentle heart that makes the world a better place 🌏",  
"The way you teach me to find joy in the little things 🌻",  
"The way you embrace me as I am and make me feel perfect 💖",  
"Your warm and understanding nature that I treasure so much 🕊️",  
"The way you make life feel like a dream come true 🌌",  
"Your confidence that inspires me to take on the world 🌍",  
"The way you always see the glass as half full 🌅",  
"Your playful spirit that keeps our love exciting and fresh 🧩",  
"The way you remind me that love conquers all 💕",  
"Your patience with me even when I’m at my worst 💗",  
"The way you turn my weaknesses into strengths 🌱",  
"Your unwavering belief in us that fills me with hope 🌠",  
"The way you dance like nobody’s watching 💃",  
"Your radiant glow that fills my days with light ☀️",  
"The way you inspire me to see the best in myself 🌟",  
"The way you bring out the best in everyone around you 🌈",  
"Your strength and resilience that I admire endlessly 💪",  
"The way you never let me forget how loved I am ❤️",  
"Your silly antics that always make me laugh out loud 😂",  
"The way you challenge me to grow and learn every day 📚",  
"Your passion for life that fuels my own 🌍",  
"The way you bring peace to my chaotic world 🕊️",  
"Your beautiful energy that makes everything better ⚡",  
"Your endless determination that never ceases to amaze me 🎯",  
"How you hold me with so much love and care 🤗",  
"Your incredible way of making me feel understood and accepted 💕",  
"The way you bring sunshine into my rainy days ☀️",  
"Your giggles that are music to my ears 🎵",  
"How you remind me to laugh at myself and not take life too seriously 😂",  
"Your love that makes me feel invincible ❤️",  
"Your courage to stand tall even in tough times 🛡️",  
"The way you make me feel like the center of your universe 🌌",  
"Your generosity and selflessness that I deeply admire 💖",  
"How you turn the simplest things into the most special memories ✨",  
"The way you always have my back, no matter what 🌈",  
"Your beautiful way of loving me just as I am ❤️"
];

function LoveReasons() {
  const [visibleReasons, setVisibleReasons] = useState([]);

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < allReasons.length) {
        setVisibleReasons(prev => [...prev, allReasons[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000); // Changed to 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const element = document.getElementById('reasons-list');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [visibleReasons]);

  return (
    <ReasonsContainer>
      <Counter>
        {visibleReasons.length} Reasons Why I Love You 💝
      </Counter>
      
      <ReasonsList id="reasons-list">
        {visibleReasons.map((reason, index) => (
          <ReasonItem 
            key={index}
            $visible={true}
          >
            {index + 1}. {reason}
          </ReasonItem>
        ))}
      </ReasonsList>
    </ReasonsContainer>
  );
}

export default LoveReasons; 