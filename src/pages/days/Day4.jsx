import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';

const MessageText = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  color: #333;
`;

function Day4() {
  return (
    <ContentLayout dayNumber={4}>
      <MessageText>
        A Love Letter For You 💌
      </MessageText>
      
      <VideoPlayer 
        videoId="-3arLQUhKPI"
        title="Love Letter Video"
      />
    </ContentLayout>
  );
}

export default Day4; 