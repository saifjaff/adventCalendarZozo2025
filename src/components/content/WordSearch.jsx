import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 35px);
  gap: 2px;
  background: #f0f0f0;
  padding: 15px;
  border-radius: 15px;
  margin: 2rem auto;
  width: fit-content;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Cell = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  cursor: pointer;
  user-select: none;
  font-weight: ${props => props.$selected || props.$found ? 'bold' : 'normal'};
  color: ${props => props.$found ? '#4CAF50' : props.$selected ? '#2196F3' : 'black'};
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 16px;

  &:hover {
    background: #e3f2fd;
  }
`;

const WordList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const Word = styled.div`
  padding: 0.8rem 1.2rem;
  background: ${props => props.$found ? '#E8F5E9' : 'white'};
  border-radius: 25px;
  text-align: center;
  border: 2px solid ${props => props.$found ? '#4CAF50' : '#e0e0e0'};
  color: ${props => props.$found ? '#4CAF50' : 'black'};
  font-weight: ${props => props.$found ? 'bold' : 'normal'};
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const words = [
  'ZOYABABY',
  'THUMBYA',
  'BABY',
  'ZOZO',
  'LOVEYOU',
  'SEXYBABY',
  'MYLOVE',
  'CHICAGO',
  'TORONTO',
  'DENTIST',
  'NERD',
  'TECH'
];

function WordSearch() {
  const [grid, setGrid] = useState([]);
  const [selection, setSelection] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const generateGrid = () => {
    const size = 15;
    const newGrid = Array(size).fill().map(() => Array(size).fill(''));
    const directions = [
      [0, 1],   // right
      [1, 0],   // down
      [1, 1],   // diagonal right down
      [-1, 1],  // diagonal right up
      [0, -1],  // left
      [-1, 0],  // up
      [-1, -1], // diagonal left up
      [1, -1]   // diagonal left down
    ];

    words.forEach(word => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const startX = Math.floor(Math.random() * size);
        const startY = Math.floor(Math.random() * size);

        if (canPlaceWord(word, startX, startY, direction, newGrid, size)) {
          placeWord(word, startX, startY, direction, newGrid);
          placed = true;
        }
        attempts++;
      }
    });

    // Fill empty spaces
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!newGrid[i][j]) {
          newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
  };

  const canPlaceWord = (word, startX, startY, direction, grid, size) => {
    const [dx, dy] = direction;
    const length = word.length;

    for (let i = 0; i < length; i++) {
      const x = startX + i * dx;
      const y = startY + i * dy;
      
      if (x < 0 || x >= size || y < 0 || y >= size) return false;
      if (grid[x][y] && grid[x][y] !== word[i]) return false;
    }
    return true;
  };

  const placeWord = (word, startX, startY, direction, grid) => {
    const [dx, dy] = direction;
    [...word].forEach((letter, i) => {
      grid[startX + i * dx][startY + i * dy] = letter;
    });
  };

  const handleMouseDown = (row, col) => {
    setIsDragging(true);
    setSelection([[row, col]]);
  };

  const handleMouseEnter = (row, col) => {
    if (isDragging) {
      const lastCell = selection[0];
      const newSelection = getLineBetweenCells(lastCell[0], lastCell[1], row, col);
      setSelection(newSelection);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    checkWord(selection);
    setSelection([]);
  };

  const getLineBetweenCells = (startRow, startCol, endRow, endCol) => {
    const cells = [];
    const dx = Math.sign(endRow - startRow);
    const dy = Math.sign(endCol - startCol);
    let x = startRow;
    let y = startCol;
    
    while (true) {
      cells.push([x, y]);
      if (x === endRow && y === endCol) break;
      x += dx;
      y += dy;
    }
    
    return cells;
  };

  const checkWord = (selectedCells) => {
    const word = selectedCells.map(([row, col]) => grid[row][col]).join('');
    const reverseWord = word.split('').reverse().join('');
    
    if (words.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
    } else if (words.includes(reverseWord) && !foundWords.includes(reverseWord)) {
      setFoundWords([...foundWords, reverseWord]);
    }
  };

  useEffect(() => {
    generateGrid();
  }, []);

  return (
    <GameContainer>
      <WordList>
        {words.map((word, index) => (
          <Word key={index} $found={foundWords.includes(word)}>
            {word}
          </Word>
        ))}
      </WordList>

      <Grid onMouseLeave={() => setIsDragging(false)}>
        {grid.map((row, i) => 
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              onMouseDown={() => handleMouseDown(i, j)}
              onMouseEnter={() => handleMouseEnter(i, j)}
              onMouseUp={handleMouseUp}
              $selected={selection.some(([row, col]) => row === i && col === j)}
              $found={foundWords.some(word => {
                const selectedWord = selection.map(([r, c]) => grid[r][c]).join('');
                return word === selectedWord;
              })}
            >
              {cell}
            </Cell>
          ))
        )}
      </Grid>
    </GameContainer>
  );
}

export default WordSearch; 