import React from 'react';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  margin: 2rem auto;
  max-width: 800px;
  padding: 1rem;

  iframe {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #2196F3;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

function MusicPlayer() {
  return (
    <PlayerContainer>
      <Title>Our Love Playlist 💝</Title>
      <iframe 
        style={{ borderRadius: "12px" }} 
        src="https://open.spotify.com/embed/playlist/7wHIHT64cW8kTK42eyF80Y?utm_source=generator" 
        width="100%" 
        height="352" 
        frameBorder="0" 
        allowFullScreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
      />
    </PlayerContainer>
  );
}

export default MusicPlayer; 