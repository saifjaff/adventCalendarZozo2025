import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import Gallery from '../../components/content/Gallery';
import MessageText from '../../components/content/MessageText';
import { dateImages } from '../../config/dateImages';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

const DateSection = styled.div`
  margin: 3rem 0;
`;

const DateTitle = styled.h2`
  text-align: center;
  color: #2196F3;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
`;

const dates = {
  date1: {
    title: 'Our First Date - October 27, 2024',
    images: dateImages.date1
  },
  date2: {
    title: 'Our Second Date - November 3, 2024',
    images: dateImages.date2
  },
  date3: {
    title: 'Our Third Date - November 10, 2024',
    images: dateImages.date3
  },
  date4: {
    title: 'Toronto Adventures - November 17, 2024',
    images: dateImages.date4
  },
  date5: {
    title: 'Our Fifth Date - November 24, 2024',
    images: dateImages.date5
  }
};

function Day3() {
  return (
    <ContentLayout dayNumber={3}>
      <MessageText>
        Memory Lane: Our Journey Together 📸
      </MessageText>

      <VideoPlayer 
        videoId="2Oa2dhMZ86o"
        title="Memory Lane Introduction"
      />
      
      <ActivityContainer>
        {Object.entries(dates).map(([dateKey, dateData]) => (
          <DateSection key={dateKey}>
            <DateTitle>{dateData.title}</DateTitle>
            <Gallery images={dateData.images} />
          </DateSection>
        ))}
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day3; 