import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import ThisOrThat from '../../components/content/ThisOrThat';
import MessageText from '../../components/content/MessageText';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

function Day17() {
  return (
    <ContentLayout dayNumber={17}>
      <MessageText>
        This or That? Let's Choose Together! 🤔
      </MessageText>

      <VideoPlayer 
        videoId="99EKNawrYwQ"
        title="This or That Introduction"
      />
      
      <ActivityContainer>
        <ThisOrThat />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day17; 