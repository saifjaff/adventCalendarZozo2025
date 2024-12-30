import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PuzzleContainer = styled.div`
  max-width: ${props => props.$width}px;
  margin: 0 auto;
  padding: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.$gridSize}, 1fr);
  gap: 2px;
  background: #2196F3;
  padding: 2px;
  border-radius: 8px;
  aspect-ratio: 1;
  max-width: 600px;
  margin: 0 auto;
`;

const Tile = styled.div`
  position: relative;
  aspect-ratio: 1;
  background-image: url(${props => props.$image});
  background-size: ${props => props.$gridSize * 100}% ${props => props.$gridSize * 100}%;
  background-position: ${props => props.$bgPosition};
  cursor: pointer;
  border-radius: 4px;
  transition: transform 0.2s;
  overflow: hidden;

  &:hover {
    transform: scale(0.98);
  }
`;

const WinMessage = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background: #4CAF50;
  color: white;
  border-radius: 8px;
  font-size: 1.2rem;
  animation: pop 0.3s ease-out;

  @keyframes pop {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

function PuzzleGame({ imagePath, gridSize = 3, width = 600 }) {
  const [tiles, setTiles] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize puzzle
  useEffect(() => {
    const initialTiles = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i);
    initialTiles.push(null); // Empty tile
    shuffleTiles(initialTiles);
    setTiles(initialTiles);
  }, [gridSize]);

  // Shuffle tiles
  const shuffleTiles = (tilesArray) => {
    for (let i = tilesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tilesArray[i], tilesArray[j]] = [tilesArray[j], tilesArray[i]];
    }
  };

  // Check if puzzle is solvable
  const isSolvable = (tilesArray) => {
    let inversions = 0;
    const flatTiles = tilesArray.filter(t => t !== null);
    
    for (let i = 0; i < flatTiles.length - 1; i++) {
      for (let j = i + 1; j < flatTiles.length; j++) {
        if (flatTiles[i] > flatTiles[j]) inversions++;
      }
    }
    
    return inversions % 2 === 0;
  };

  // Handle tile click
  const handleTileClick = (index) => {
    if (isComplete) return;

    const emptyIndex = tiles.indexOf(null);
    if (!isAdjacent(index, emptyIndex)) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    setTiles(newTiles);

    // Check if puzzle is complete
    const isWon = newTiles.every((tile, index) => 
      tile === null ? index === newTiles.length - 1 : tile === index
    );
    if (isWon) setIsComplete(true);
  };

  // Check if tiles are adjacent
  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / gridSize);
    const col1 = index1 % gridSize;
    const row2 = Math.floor(index2 / gridSize);
    const col2 = index2 % gridSize;
    
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  // Calculate background position for each tile
  const getBgPosition = (tileIndex) => {
    if (tileIndex === null) return 'center';
    const row = Math.floor(tileIndex / gridSize);
    const col = tileIndex % gridSize;
    return `-${col * 100}% -${row * 100}%`;
  };

  return (
    <PuzzleContainer $width={width}>
      <Grid $gridSize={gridSize}>
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            $image={tile !== null ? imagePath : ''}
            $gridSize={gridSize}
            $bgPosition={getBgPosition(tile)}
            onClick={() => handleTileClick(index)}
            style={{ visibility: tile === null ? 'hidden' : 'visible' }}
          />
        ))}
      </Grid>
      {isComplete && (
        <WinMessage>
          🎉 Congratulations! You completed the puzzle! 🎉
        </WinMessage>
      )}
    </PuzzleContainer>
  );
}

export default PuzzleGame; 