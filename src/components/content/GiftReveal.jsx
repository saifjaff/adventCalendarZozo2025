import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const RevealContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  overflow: hidden;
  margin: 2rem auto;
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
  padding: 2rem;
  background: ${props => props.$revealed ? '#e8f5e9' : 'white'};
  text-align: center;
`;

const GiftTitle = styled.h2`
  color: #2e7d32;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const GiftDescription = styled.p`
  color: #333;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const GiftEmoji = styled.div`
  font-size: 4rem;
  margin: 1rem 0;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const Instructions = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const giftDetails = {
  title: "Special Gift Awaits! 🎁",
  description: `I've prepared something special for you! This gift includes:
  
  💝 A romantic dinner at your favorite restaurant
  🌹 A surprise gift I picked just for you
  ✨ And a special evening planned with lots of love`,
  emoji: "🎁",
  note: "I can't wait to share this special moment with you!"
};

function GiftReveal() {
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = '#CCCCCC';
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Add scratch instructions
      ctx.font = '24px Arial';
      ctx.fillStyle = '#666666';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Scratch here to reveal your gift! ✨', canvasRef.current.width/2, canvasRef.current.height/2);
    }
  }, []);

  const draw = (e) => {
    if (!isDrawing.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    // Check if enough has been scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] < 128) transparent++;
    }

    if (transparent > (pixels.length / 4) * 0.5) {
      setRevealed(true);
    }
  };

  return (
    <RevealContainer>
      <Instructions>
        Scratch the card below to reveal your special gift! 💝
      </Instructions>
      
      <Card>
        <CardContent $revealed={revealed}>
          <GiftEmoji>{giftDetails.emoji}</GiftEmoji>
          <GiftTitle>{giftDetails.title}</GiftTitle>
          <GiftDescription>
            {giftDetails.description.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </GiftDescription>
          <p style={{ color: '#666', fontStyle: 'italic' }}>{giftDetails.note}</p>
        </CardContent>
        {!revealed && (
          <Canvas
            ref={canvasRef}
            width={600}
            height={400}
            onMouseDown={() => isDrawing.current = true}
            onMouseMove={draw}
            onMouseUp={() => isDrawing.current = false}
            onMouseOut={() => isDrawing.current = false}
          />
        )}
      </Card>
    </RevealContainer>
  );
}

export default GiftReveal; 