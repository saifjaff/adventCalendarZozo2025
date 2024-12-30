import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import TriviaGame from '../../components/content/TriviaGame';
import MessageText from '../../components/content/MessageText';
import { saveToSheetDB } from '../../utils/sheetDB';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

// Trivia answers
const handleAnswerSubmit = async (questionId, answer, isCorrect, score) => {
  await saveToSheetDB(10, 'trivia', {
    questionId,
    answer,
    isCorrect,
    score
  });
};

function Day10() {
  return (
    <ContentLayout dayNumber={10}>
      <MessageText>
        Love Trivia Challenge! 💝
      </MessageText>

      <VideoPlayer 
        videoId="5RkG8N0eB1o"
        title="Trivia Introduction"
      />
      
      <ActivityContainer>
        <TriviaGame />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day10; 