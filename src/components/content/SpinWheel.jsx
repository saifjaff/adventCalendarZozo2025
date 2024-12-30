import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { saveToSheetDB } from '../../utils/sheetDB';

const GameContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
`;

const WheelContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  margin: 2rem auto;
  padding-top: 20px;
`;

const Wheel = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;
  position: relative;
  transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
  transform: ${props => `rotate(${props.$rotation}deg)`};
  box-shadow: 0 0 0 15px rgba(135, 206, 235, 0.3);
`;

const Marker = styled.div`
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  z-index: 5;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 25px solid #ff4444;
    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
  }
`;

const Slice = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  left: 50%;
  top: 50%;
  transform-origin: 0% 0%;
  transform: rotate(${props => props.$rotate}deg) skewY(${props => props.$skew}deg);
  background-color: ${props => props.$color};
  overflow: visible;

  &::after {
    content: '${props => props.$text}';
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%) rotate(${props => props.$textRotate}deg);
    white-space: nowrap;
    color: black;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }
`;

const CenterButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  font-weight: bold;
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);

  &:hover {
    background: #222;
  }
`;

const WinnerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  max-width: 90%;
  width: 400px;
  animation: popIn 0.3s ease-out;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);

  h2 {
    color: #2196F3;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    margin: 1.5rem 0;
    color: #333;
  }

  .flower-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin: 1rem 0;
  }

  button {
    margin-top: 2rem;
    padding: 1rem 2rem;
    background: #2196F3;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.2s ease;
    box-shadow: 0 2px 5px rgba(33, 150, 243, 0.3);

    &:hover {
      background: #1976D2;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(33, 150, 243, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const prizes = [
  { 
    name: "Virtual Flowers 💐", 
    color: "rgba(255, 182, 193, 0.5)",
    images: [
      "/flowers/bouquet1.jpg",
      "/flowers/bouquet2.jpg",
      "/flowers/bouquet3.jpg",
      "/flowers/bouquet4.jpg",
      "/flowers/bouquet5.jpg"
    ]
  },
  { name: "New Figs 🎁", color: "rgba(221, 160, 221, 0.5)" },
  { name: "100 Kisses 💋", color: "rgba(135, 206, 235, 0.5)" },
  { name: "Coffee ☕", color: "rgba(144, 238, 144, 0.5)" },
  { name: "Desserts 🍰", color: "rgba(255, 218, 185, 0.5)" },
  { name: "Stay Home Day 🏠", color: "rgba(255, 182, 193, 0.5)" }
];

const SpinStats = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  text-align: left;

  p {
    font-weight: bold;
    color: #2196F3;
    margin-bottom: 0.5rem;
  }
`;

const PrizeDistribution = styled.div`
  margin-top: 0.5rem;
  display: grid;
  gap: 0.5rem;
`;

const PrizeStat = styled.div`
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
  color: #666;
  font-size: 0.9rem;
`;

const SpinHistorySection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h3 {
    color: #2196F3;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.2rem;
  }
`;

const HistoryList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  display: grid;
  gap: 0.5rem;
`;

const HistoryItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #666;

  &:hover {
    background: #e3f2fd;
  }
`;

function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [spinHistory, setSpinHistory] = useState(() => {
    const saved = localStorage.getItem('spinHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);

    const newRotation = rotation + 1800 + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const winningIndex = Math.floor(Math.random() * prizes.length);
      const prize = prizes[winningIndex];
      setWinner(prize);

      saveToSheetDB(18, 'spin_wheel', {
        prize: prize.name,
        timestamp: new Date().toISOString()
      }).then(() => {
        console.log('Prize saved to database');
      }).catch(error => {
        console.error('Error saving to database:', error);
      });

      const newSpin = {
        timestamp: new Date().toISOString(),
        prize: prize.name,
        spinNumber: spinHistory.length + 1
      };

      const updatedHistory = [...spinHistory, newSpin];
      setSpinHistory(updatedHistory);
      localStorage.setItem('spinHistory', JSON.stringify(updatedHistory));
    }, 4000);
  };

  const getRandomFlower = () => {
    if (winner?.images) {
      const randomIndex = Math.floor(Math.random() * winner.images.length);
      return winner.images[randomIndex];
    }
    return null;
  };

  useEffect(() => {
    if (winner?.name === "Virtual Flowers 💐") {
      setSelectedFlower(getRandomFlower());
    } else {
      setSelectedFlower(null);
    }
  }, [winner]);

  return (
    <GameContainer>
      <WheelContainer>
        <Marker />
        <Wheel $rotation={rotation}>
          {prizes.map((prize, index) => {
            const angle = 360 / prizes.length;
            const rotate = angle * index;
            const skew = 60 - angle;
            const textRotate = -rotate - (angle / 2);
            
            return (
              <Slice
                key={index}
                $rotate={rotate}
                $skew={skew}
                $color={prize.color}
                $text={prize.name}
                $textRotate={textRotate}
              />
            );
          })}
        </Wheel>
        <CenterButton onClick={spinWheel} disabled={isSpinning}>
          {isSpinning ? '...' : 'Spin'}
        </CenterButton>
      </WheelContainer>
      
      {winner && (
        <WinnerModal onClick={() => setWinner(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2>🎉 Congratulations! 🎉</h2>
            <h3>You won:</h3>
            <h1>{winner.name}</h1>
            {winner.name === "Virtual Flowers 💐" && selectedFlower && (
              <img 
                src={selectedFlower} 
                alt="Virtual Flowers" 
                className="flower-image"
              />
            )}
            <button onClick={() => {
              setWinner(null);
              setSelectedFlower(null);
            }}>
              Spin Again!
            </button>
          </ModalContent>
        </WinnerModal>
      )}
    </GameContainer>
  );
}

export default SpinWheel; 