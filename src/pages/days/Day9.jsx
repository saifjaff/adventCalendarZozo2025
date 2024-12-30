import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import ScratchCard from '../../components/content/ScratchCard';
import MessageText from '../../components/content/MessageText';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

function Day9() {
  return (
    <ContentLayout dayNumber={9}>
      <MessageText>
        Scratch & Win Special Rewards! 🎁
      </MessageText>

      <VideoPlayer 
        videoId="fkTz3B8FcC4"
        title="Scratch Card Introduction"
      />
      
      <ActivityContainer>
        <ScratchCard />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day9; 