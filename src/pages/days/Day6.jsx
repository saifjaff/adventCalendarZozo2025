import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import MessageText from '../../components/content/MessageText';
import PuzzleGame from '../../components/content/PuzzleGame';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

function Day6() {
  return (
    <ContentLayout dayNumber={6}>
      <MessageText>
        Complete the Puzzle to Reveal a Special Memory! 🧩
      </MessageText>

      <VideoPlayer 
        videoId="UES1zl3CLDU"
        title="Puzzle Introduction"
      />
      
      <ActivityContainer>
        <PuzzleGame 
          imagePath="/images/day3/date2/IMG_0698.jpg"
          gridSize={3}
          width={600}
        />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day6; 