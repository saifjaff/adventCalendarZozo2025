import React from 'react';
import styled from 'styled-components';
import ContentLayout from '../../components/layout/ContentLayout';
import VideoPlayer from '../../components/content/VideoPlayer';
import Quiz from '../../components/content/Quiz';
import MessageText from '../../components/content/MessageText';
import { saveToSheetDB } from '../../utils/sheetDB';

const ActivityContainer = styled.div`
  margin-top: 2rem;
`;

const quizQuestions = [
  {
    question: "When did we start talking?",
    options: [
      "August 7th 2023",
      "July 5th 2024",
      "September 1st 2023",
      "June 15th 2024"
    ],
    correctAnswer: "July 5th 2024"
  },
  {
    question: "How many times did I slide in your DMs?",
    options: [
      "1 time",
      "2 times",
      "3 times",
      "4 times"
    ],
    correctAnswer: "3 times"
  },
  {
    question: "When did I come visit you first?",
    options: [
      "October 15th 2024",
      "October 20th 2024",
      "October 27th 2024",
      "November 1st 2024"
    ],
    correctAnswer: "October 27th 2024"
  },
  {
    question: "How many kids are we having?",
    options: [
      "3",
      "3",
      "3",
      "3"
    ],
    correctAnswer: "3"
  }
];

// Love Letter responses
const handleSubmit = async (answers) => {
  await saveToSheetDB(2, 'love_letter', {
    answers
  });
};

function Day2() {
  const handleQuizComplete = async (quizData) => {
    console.log('Quiz completed:', quizData); // Debug log
  };

  return (
    <ContentLayout dayNumber={2}>
      <MessageText>
        How Well Do You Know Us? 💕
      </MessageText>

      <VideoPlayer 
        videoId="5iE_NzFIxlg"
        title="Quiz Introduction"
      />
      
      <ActivityContainer>
        <Quiz 
          questions={quizQuestions} 
          onComplete={handleQuizComplete}
        />
      </ActivityContainer>
    </ContentLayout>
  );
}

export default Day2; 