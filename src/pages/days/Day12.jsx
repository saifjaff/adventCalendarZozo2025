import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import LoveCrossword from '../../components/content/LoveCrossword';
import MessageText from '../../components/content/MessageText';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

function Day12() {
  return (
    <ContentLayout dayNumber={12}>
      <MessageText>
        Our Love Story Crossword! 🎯
      </MessageText>

      <VideoPlayer 
        videoId="A_kdaseVhVs"
        title="Crossword Introduction"
      />
      
      <ActivityContainer>
        <LoveCrossword />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day12; 