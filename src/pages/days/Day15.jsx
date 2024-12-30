import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import LoveReasons from '../../components/content/LoveReasons';
import MessageText from '../../components/content/MessageText';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

function Day15() {
  return (
    <ContentLayout dayNumber={15}>
      <MessageText>
        Infinite Reasons Why I Love You 💝
      </MessageText>

      <VideoPlayer 
        videoId="xpV9-pYITE4"
        title="Love Reasons Introduction"
      />
      
      <ActivityContainer>
        <LoveReasons />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day15; 