import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const CarouselWindow = styled.div`
  position: relative;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const VideoContainer = styled.div`
  position: relative;
  padding-top: 56.25%; // 16:9 Aspect Ratio
`;

const VideoFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const NavButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(33, 150, 243, 0.3);

  &:hover {
    background: #1976D2;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const VideoInfo = styled.div`
  text-align: center;
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  
  h3 {
    color: #2196F3;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const Thumbnails = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Thumbnail = styled.div`
  width: 120px;
  height: 67.5px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${props => props.$isActive ? '#2196F3' : 'transparent'};
  transition: all 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

const videos = [
  {
    id: "VIDEO_ID_1",
    title: "Baby Saif",
    description: "My adorable baby moments 👶",
    thumbnail: "URL_TO_THUMBNAIL_1",
    year: "1995"
  },
  {
    id: "VIDEO_ID_2",
    title: "Baby Zoya",
    description: "Your precious childhood memories 🎀",
    thumbnail: "URL_TO_THUMBNAIL_2",
    year: "1998"
  },
  // Add more videos as needed
];

function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  return (
    <CarouselContainer>
      <CarouselWindow>
        <VideoContainer>
          <VideoFrame
            src={`https://www.youtube.com/embed/${videos[currentIndex].id}`}
            title={videos[currentIndex].title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoContainer>
      </CarouselWindow>

      <VideoInfo>
        <h3>{videos[currentIndex].title}</h3>
        <p>{videos[currentIndex].description}</p>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>{videos[currentIndex].year}</p>
      </VideoInfo>

      <Navigation>
        <NavButton onClick={handlePrevious}>
          ← Previous
        </NavButton>
        <NavButton onClick={handleNext}>
          Next →
        </NavButton>
      </Navigation>

      <Thumbnails>
        {videos.map((video, index) => (
          <Thumbnail 
            key={video.id}
            $isActive={currentIndex === index}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={video.thumbnail} alt={video.title} />
          </Thumbnail>
        ))}
      </Thumbnails>
    </CarouselContainer>
  );
}

export default VideoCarousel; 