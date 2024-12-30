import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import DrawingGame from '../../components/content/DrawingGame';
import MessageText from '../../components/content/MessageText';
import { saveToSheetDB } from '../../utils/sheetDB';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

function Day16() {
  // Drawing
  const handleDrawingComplete = async (imageData) => {
    await saveToSheetDB(16, 'drawing', {
      imageUrl: imageData // base64 image data
    });
  };

  return (
    <ContentLayout dayNumber={16}>
      <MessageText>
        Let's Draw Together! 🎨
      </MessageText>

      <VideoPlayer 
        videoId="gDw7BMpShq4"
        title="Drawing Game Introduction"
      />
      
      <ActivityContainer>
        <DrawingGame />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day16; 