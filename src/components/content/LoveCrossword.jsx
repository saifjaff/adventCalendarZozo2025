import React, { useState } from 'react';
import styled from 'styled-components';

const CrosswordContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(30px, 1fr));
  gap: 1px;
  margin: 2rem auto;
  background: #333;
  padding: 1px;
  border-radius: 8px;
  max-width: 600px;
  aspect-ratio: 1;
`;

const CellContainer = styled.div`
  position: relative;
`;

const CellNumber = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  font-size: 0.7rem;
  color: #666;
  z-index: 1;
`;

const Cell = styled.input`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  border: none;
  text-align: center;
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  text-transform: uppercase;
  background: ${props => props.$isActive ? '#e3f2fd' : '#f5f5f5'};
  cursor: ${props => props.$isActive ? 'text' : 'default'};
  padding: 0;
  margin: 0;
  position: relative;

  &:focus {
    outline: 2px solid #2196F3;
    background: #e3f2fd;
  }

  &:disabled {
    background: #ddd;
  }
`;

const CluesList = styled.div`
  margin: 2rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 800px;
  padding: 0 1rem;
`;

const ClueSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  h3 {
    color: #2196F3;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e3f2fd;
  }
`;

const Clue = styled.div`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  
  &:hover {
    background: #f5f5f5;
    border-left-color: #2196F3;
  }

  span.number {
    font-weight: bold;
    color: #2196F3;
    margin-right: 0.5rem;
  }
`;

const CheckButton = styled.button`
  padding: 1rem 2rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  margin: 2rem auto;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(33, 150, 243, 0.3);

  &:hover {
    background: #1976D2;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(33, 150, 243, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const crosswordData = {
  width: 12,
  height: 12,
  across: {
    1: {
      clue: "Our first date location",
      answer: "DETROIT",
      row: 0,
      col: 2
    },
    2: {
      clue: "Your favorite pet name for me",
      answer: "SAIFYPOO",
      row: 2,
      col: 0
    },
    3: {
      clue: "Month we first met",
      answer: "OCTOBER",
      row: 4,
      col: 3
    },
    4: {
      clue: "Our shared dream destination",
      answer: "ITALY",
      row: 6,
      col: 1
    }
  },
  down: {
    1: {
      clue: "Number of kids we want (in letters)",
      answer: "THREE",
      row: 0,
      col: 3
    },
    2: {
      clue: "Your favorite food I cook",
      answer: "STEAK",
      row: 1,
      col: 5
    },
    3: {
      clue: "Our favorite movie genre",
      answer: "BOLLYWOOD",
      row: 2,
      col: 7
    },
    4: {
      clue: "What you call me when you're happy",
      answer: "BABY",
      row: 3,
      col: 1
    }
  }
};

function LoveCrossword() {
  const [grid, setGrid] = useState(Array(12).fill().map(() => Array(12).fill('')));
  const [completed, setCompleted] = useState(false);

  const isActiveCellAt = (row, col) => {
    for (const direction of ['across', 'down']) {
      for (const word of Object.values(crosswordData[direction])) {
        if (direction === 'across') {
          if (row === word.row && col >= word.col && col < word.col + word.answer.length) {
            return true;
          }
        } else {
          if (col === word.col && row >= word.row && row < word.row + word.answer.length) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const handleChange = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col] = value.toUpperCase();
    setGrid(newGrid);
  };

  const checkAnswers = () => {
    let correct = true;
    
    for (const direction of ['across', 'down']) {
      for (const word of Object.values(crosswordData[direction])) {
        const answer = word.answer.split('');
        if (direction === 'across') {
          for (let i = 0; i < answer.length; i++) {
            if (grid[word.row][word.col + i] !== answer[i]) {
              correct = false;
            }
          }
        } else {
          for (let i = 0; i < answer.length; i++) {
            if (grid[word.row + i][word.col] !== answer[i]) {
              correct = false;
            }
          }
        }
      }
    }

    setCompleted(correct);
  };

  function getCellNumber(row, col) {
    for (const direction of ['across', 'down']) {
      for (const [number, word] of Object.entries(crosswordData[direction])) {
        if (word.row === row && word.col === col) {
          return number;
        }
      }
    }
    return null;
  }

  return (
    <CrosswordContainer>
      <Grid>
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            const cellNumber = getCellNumber(rowIndex, colIndex);
            const isActive = isActiveCellAt(rowIndex, colIndex);
            
            return (
              <CellContainer key={`${rowIndex}-${colIndex}`}>
                {cellNumber && <CellNumber>{cellNumber}</CellNumber>}
                <Cell
                  maxLength={1}
                  value={cell}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  disabled={!isActive}
                  $isActive={isActive}
                />
              </CellContainer>
            );
          })
        ))}
      </Grid>

      <CluesList>
        <ClueSection>
          <h3>Across</h3>
          {Object.entries(crosswordData.across).map(([number, clue]) => (
            <Clue key={number}>
              <span className="number">{number}</span>
              {clue.clue}
            </Clue>
          ))}
        </ClueSection>

        <ClueSection>
          <h3>Down</h3>
          {Object.entries(crosswordData.down).map(([number, clue]) => (
            <Clue key={number}>
              <span className="number">{number}</span>
              {clue.clue}
            </Clue>
          ))}
        </ClueSection>
      </CluesList>

      <CheckButton onClick={checkAnswers}>
        Check Answers
      </CheckButton>

      {completed && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          padding: '1rem',
          background: '#e8f5e9',
          borderRadius: '8px',
          color: '#2e7d32'
        }}>
          🎉 Congratulations! You've completed the crossword! 🎉
        </div>
      )}
    </CrosswordContainer>
  );
}

export default LoveCrossword; 