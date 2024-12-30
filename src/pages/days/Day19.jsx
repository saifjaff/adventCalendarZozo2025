import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import WordSearch from '../../components/content/WordSearch';
import MessageText from '../../components/content/MessageText';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

function Day19() {
  return (
    <ContentLayout dayNumber={19}>
      <MessageText>
        Find Our Special Words! 💝
      </MessageText>

      <VideoPlayer 
        videoId="6Mrj9e-LfME"
        title="Word Search Introduction"
      />
      
      <ActivityContainer>
        <WordSearch />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day19; 