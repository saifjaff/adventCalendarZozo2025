import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import MessageText from '../../components/content/MessageText';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

const PlaylistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    max-width: 660px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 1.5rem;
  }
`;

const PlaylistWrapper = styled.div`
  iframe {
    width: 100%;
    max-width: 660px;
    margin: 0 auto;
    display: block;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const PlaylistTitle = styled.h3`
  text-align: center;
  color: #2196F3;
  margin-bottom: 1rem;
  font-size: 1.4rem;
`;

function Day5() {
  return (
    <ContentLayout dayNumber={5}>
      <MessageText>
        Our Special Playlist 🎵
      </MessageText>

      <VideoPlayer 
        videoId="7XBNk93nJq0"
        title="Playlist Introduction"
      />
      
      <ActivityContainer>
        <PlaylistsContainer>
          <PlaylistWrapper>
            <PlaylistTitle>Our Love Songs 💝</PlaylistTitle>
            <iframe 
              allow="autoplay *; encrypted-media *;" 
              frameBorder="0" 
              height="450" 
              style={{
                width: '100%',
                maxWidth: '660px',
                overflow: 'hidden',
                background: 'transparent'
              }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
              src="https://embed.music.apple.com/ca/playlist/bebos-dedicated-playlist/pl.u-GM9gh8jrBAJ"
            />
          </PlaylistWrapper>

          <PlaylistWrapper>
            <PlaylistTitle>Turn Up Playlist 🎵</PlaylistTitle>
            <iframe 
              allow="autoplay *; encrypted-media *;" 
              frameBorder="0" 
              height="450" 
              style={{
                width: '100%',
                maxWidth: '660px',
                overflow: 'hidden',
                background: 'transparent'
              }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
              src="https://embed.music.apple.com/ca/playlist/bebo-turn-up/pl.u-jqBJFqMVL8r"
            />
          </PlaylistWrapper>
        </PlaylistsContainer>
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day5; 