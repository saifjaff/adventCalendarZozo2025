import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import SharedGoals from '../../components/content/SharedGoals';
import MessageText from '../../components/content/MessageText';
import { saveToSheetDB } from '../../utils/sheetDB';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

// Goals
const handleGoalSubmit = async (goals) => {
  await saveToSheetDB(8, 'goals', {
    goals
  });
};

function Day8() {
  return (
    <ContentLayout dayNumber={8}>
      <MessageText>
        Our Shared Dreams & Goals 🎯
      </MessageText>

      <VideoPlayer 
        videoId="YMNZeX_Hdi4"
        title="Goals Introduction"
      />
      
      <ActivityContainer>
        <SharedGoals />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day8; 