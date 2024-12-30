import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import ThrowbackGallery from '../../components/content/ThrowbackGallery';
import BabyGallery from '../../components/content/BabyGallery';
import MessageText from '../../components/content/MessageText';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #2196F3;
  margin: 3rem 0 1rem;
  font-size: 1.5rem;
`;

function Day13() {
  return (
    <ContentLayout dayNumber={13}>
      <MessageText>
        Our Beautiful Memories 📸
      </MessageText>

      <VideoPlayer 
        videoId="ytIIQyh_HdU"
        title="Throwback Introduction"
      />
      
      <ActivityContainer>
        <SectionTitle>Our Baby Photos 👶</SectionTitle>
        <BabyGallery />
        
        <SectionTitle>Our Recent Memories 💕</SectionTitle>
        <ThrowbackGallery />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day13; 