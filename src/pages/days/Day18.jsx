import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import SpinWheel from '../../components/content/SpinWheel';
import MessageText from '../../components/content/MessageText';
import { saveToSheetDB } from '../../utils/sheetDB';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

// Spin wheel results
const handleSpinResult = async (prize) => {
  await saveToSheetDB(18, 'spin_wheel', {
    prize
  });
};

function Day18() {
  return (
    <ContentLayout dayNumber={18}>
      <MessageText>
        Spin the Wheel of Love! 🎡
      </MessageText>

      <VideoPlayer 
        videoId="RXuKxsYkrxY"
        title="Spin Wheel Introduction"
      />
      
      <ActivityContainer>
        <SpinWheel />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day18; 