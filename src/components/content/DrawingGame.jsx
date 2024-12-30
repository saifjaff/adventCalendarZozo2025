import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
`;

const PromptSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Prompt = styled.h2`
  color: #2196F3;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const DrawingSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CanvasContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 1rem;
`;

const CanvasTitle = styled.h3`
  text-align: center;
  margin-bottom: 1rem;
  color: #666;
`;

const Canvas = styled.canvas`
  width: 100%;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: crosshair;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: #1976D2;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ColorPicker = styled.input`
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`;

const prompts = [
  {
    word: "Our First Date 🌟",
    hint: "Draw your memory of our first date!"
  },
  {
    word: "Our Dream House 🏠",
    hint: "Draw how you imagine our future home!"
  },
  {
    word: "Our Perfect Day ☀️",
    hint: "Draw what your perfect day with me looks like!"
  }
];

function DrawingGame() {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const myCanvasRef = useRef(null);
  const partnerCanvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = myCanvasRef.current;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetWidth * 2;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    contextRef.current = ctx;

    // Same setup for partner canvas
    const partnerCanvas = partnerCanvasRef.current;
    partnerCanvas.width = partnerCanvas.offsetWidth * 2;
    partnerCanvas.height = partnerCanvas.offsetWidth * 2;
    const partnerCtx = partnerCanvas.getContext('2d');
    partnerCtx.scale(2, 2);
    partnerCtx.lineCap = 'round';
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = (canvasRef) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const nextPrompt = () => {
    if (currentPrompt < prompts.length - 1) {
      setCurrentPrompt(prev => prev + 1);
      clearCanvas(myCanvasRef);
      clearCanvas(partnerCanvasRef);
    }
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    contextRef.current.strokeStyle = e.target.value;
  };

  return (
    <GameContainer>
      <PromptSection>
        <Prompt>{prompts[currentPrompt].word}</Prompt>
        <p>{prompts[currentPrompt].hint}</p>
      </PromptSection>

      <DrawingSection>
        <CanvasContainer>
          <CanvasTitle>Your Drawing</CanvasTitle>
          <Canvas
            ref={myCanvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onMouseLeave={finishDrawing}
          />
          <Controls>
            <ColorPicker
              type="color"
              value={color}
              onChange={handleColorChange}
            />
            <Button onClick={() => clearCanvas(myCanvasRef)}>
              Clear
            </Button>
          </Controls>
        </CanvasContainer>

        <CanvasContainer>
          <CanvasTitle>Partner's Drawing</CanvasTitle>
          <Canvas ref={partnerCanvasRef} />
        </CanvasContainer>
      </DrawingSection>

      <Controls>
        {currentPrompt < prompts.length - 1 ? (
          <Button 
            onClick={nextPrompt}
            disabled={currentPrompt === prompts.length - 1}
          >
            Next Prompt
          </Button>
        ) : (
          <Button onClick={() => {}}>
            Save Final Drawing
          </Button>
        )}
      </Controls>
    </GameContainer>
  );
}

export default DrawingGame; 