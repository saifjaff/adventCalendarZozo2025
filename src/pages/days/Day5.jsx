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
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlaylistWrapper = styled.div`
  iframe {
    width: 100%;
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
              src="https://open.spotify.com/embed/playlist/7wHIHT64cW8kTK42eyF80Y?utm_source=generator" 
              height="352" 
              frameBorder="0" 
              allowFullScreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </PlaylistWrapper>

          <PlaylistWrapper>
            <PlaylistTitle>More Music 🎵</PlaylistTitle>
            <iframe 
              src="https://open.spotify.com/embed/playlist/YOUR_SECOND_PLAYLIST_ID?utm_source=generator" 
              height="352" 
              frameBorder="0" 
              allowFullScreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </PlaylistWrapper>
        </PlaylistsContainer>
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day5; 