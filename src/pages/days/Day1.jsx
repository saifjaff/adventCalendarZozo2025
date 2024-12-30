import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import MessageText from '../../components/content/MessageText';

const WelcomeText = styled.div`
  text-align: center;
  margin: 2rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
`;

function Day1() {
  return (
    <ContentLayout dayNumber={1}>
      <MessageText>
        Welcome to Your Adventure! 🎉
      </MessageText>
      
      <WelcomeText>
        <p>
          I've created this special calendar just for you, filled with daily surprises 
          while I'm away. Each day brings something new - from videos and photos to 
          games and special messages. I hope these little gifts make you smile and 
          remind you how much I care about you! 
        </p>
      </WelcomeText>
      
      <VideoPlayer 
        videoId="uXdTQj2Sq18"
        title="Welcome Message"
      />
    </ContentLayout>
  );
}

export default Day1; 