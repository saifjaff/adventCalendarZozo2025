import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 Aspect Ratio
`;

const VideoFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
`;

function VideoPlayer({ videoId, title }) {
  return (
    <VideoContainer>
      <VideoFrame
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </VideoContainer>
  );
}

export default VideoPlayer; 