import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;
const Card = styled.div`
  position: relative;
  width: 250px;
  height: 150px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const CardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background: ${props => props.$revealed ? '#e8f5e9' : 'white'};
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #2e7d32;
  }
  
  p {
    font-size: 1rem;
    color: #666;
  }
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const RevealedMessage = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #2e7d32;
  font-weight: bold;
`;

const defaultRewards = [
  {
    title: "Hugs & Kisses",
    description: "Redeem for 5 Hugs & Kisses 💝",
    emoji: "💝"
  },
  {
    title: "Allowance Boost",
    description: "$100 Allowance Increase (1 Month) 💰",
    emoji: "💰"
  },
  {
    title: "Special Request",
    description: "Come to Me Card (One-Time Use) ✨",
    emoji: "✨"
  }
];

function ScratchCard({ rewards = defaultRewards }) {
  const [revealedCards, setRevealedCards] = useState([]);
  const canvasRefs = useRef([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    canvasRefs.current.forEach((canvas, index) => {
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#CCCCCC';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '20px Arial';
        ctx.fillStyle = '#666666';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Scratch here!', canvas.width/2, canvas.height/2);
      }
    });
  }, []);

  const draw = (index, e) => {
    if (!isDrawing.current) return;
    
    const canvas = canvasRefs.current[index];
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Check if enough has been scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] < 128) transparent++;
    }

    if (transparent > (pixels.length / 4) * 0.5) {
      setRevealedCards(prev => [...new Set([...prev, index])]);
    }
  };

  return (
    <CardContainer>
      {rewards.map((reward, index) => (
        <Card key={index}>
          <CardContent $revealed={revealedCards.includes(index)}>
            <h3>{reward.title}</h3>
            <p>{reward.description}</p>
            <div style={{ fontSize: '2rem' }}>{reward.emoji}</div>
          </CardContent>
          {!revealedCards.includes(index) && (
            <Canvas
              ref={el => canvasRefs.current[index] = el}
              width={250}
              height={150}
              onMouseDown={() => isDrawing.current = true}
              onMouseMove={(e) => draw(index, e)}
              onMouseUp={() => isDrawing.current = false}
              onMouseOut={() => isDrawing.current = false}
            />
          )}
        </Card>
      ))}
      {revealedCards.length > 0 && (
        <RevealedMessage>
          🎉 You've revealed {revealedCards.length} reward{revealedCards.length !== 1 ? 's' : ''}!
        </RevealedMessage>
      )}
    </CardContainer>
  );
}

export default ScratchCard; 