import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import GiftReveal from '../../components/content/GiftReveal';
import MessageText from '../../components/content/MessageText';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

function Day14() {
  return (
    <ContentLayout dayNumber={14}>
      <MessageText>
        A Special Gift For You! 🎁
      </MessageText>

      <VideoPlayer 
        videoId="omF298VAiPA"
        title="Gift Introduction"
      />
      
      <ActivityContainer>
        <GiftReveal />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day14; 