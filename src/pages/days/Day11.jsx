import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import ComplimentGenerator from '../../components/content/ComplimentGenerator';
import MessageText from '../../components/content/MessageText';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

function Day11() {
  return (
    <ContentLayout dayNumber={11}>
      <MessageText>
        Daily Dose of Love! 💝
      </MessageText>

      <VideoPlayer 
        videoId="yJ2tAOttQNE"
        title="Compliment Generator Introduction"
      />
      
      <ActivityContainer>
        <ComplimentGenerator />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day11; 