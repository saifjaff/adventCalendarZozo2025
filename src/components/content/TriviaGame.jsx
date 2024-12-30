import React, { useState } from 'react';
import styled from 'styled-components';
import ScratchCard from './ScratchCard';
import { saveToSheetDB } from '../../utils/sheetDB';

const TriviaContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Question = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const QuestionText = styled.h3`
  color: #333;
  margin-bottom: 1.5rem;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Option = styled.button`
  padding: 1rem;
  border: 2px solid ${props => {
    if (props.$showResult) {
      if (props.$isCorrect) return '#4CAF50';
      if (props.$selected) return '#f44336';
    }
    return props.$selected ? '#2196F3' : '#ddd';
  }};
  border-radius: 8px;
  background: ${props => {
    if (props.$showResult) {
      if (props.$isCorrect) return '#e8f5e9';
      if (props.$selected) return '#ffebee';
    }
    return props.$selected ? '#e3f2fd' : 'white';
  }};
  cursor: ${props => props.$showResult ? 'default' : 'pointer'};
  transition: all 0.2s;
`;

const NextButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`;

const ScoreDisplay = styled.div`
  text-align: center;
  margin: 2rem 0;
  font-size: 1.2rem;
  color: #333;
`;

const RewardSection = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const triviaQuestions = [
  {
    question: "What's our favorite shared activity?",
    options: [
      "Watching Movies",
      "Cooking Together",
      "Going for Walks",
      "Playing Games"
    ],
    correctAnswer: "Watching Movies"
  },
  {
    question: "What's my favorite food that you cook?",
    options: [
      "Pasta",
      "Biryani",
      "Curry",
      "Steak"
    ],
    correctAnswer: "Biryani"
  },
  {
    question: "Where was our first date?",
    options: [
      "Restaurant",
      "Park",
      "Movie Theater",
      "Coffee Shop"
    ],
    correctAnswer: "Restaurant"
  },
  {
    question: "What's our shared dream destination?",
    options: [
      "Paris",
      "Tokyo",
      "New York",
      "Dubai"
    ],
    correctAnswer: "Paris"
  },
  {
    question: "What's our favorite movie genre together?",
    options: [
      "Romance",
      "Action",
      "Comedy",
      "Horror"
    ],
    correctAnswer: "Romance"
  }
];

const rewards = {
  perfect: {
    title: "Shopping Spree!",
    description: "Shopping Spree up to $400 USD! 🛍️",
    emoji: "🛍️"
  },
  excellent: {
    title: "Dinner Date",
    description: "Dinner + Dessert Date! 🍽️🍰",
    emoji: "🍽️"
  },
  good: {
    title: "Lunch Date",
    description: "Lunch Date! 🥪",
    emoji: "🥪"
  },
  okay: {
    title: "Breakfast Date",
    description: "Breakfast Date! ☕️🥐",
    emoji: "☕️"
  },
  try_again: {
    title: "Coffee Break",
    description: "Free Coffee! ☕️",
    emoji: "☕️"
  }
};

function TriviaGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [reward, setReward] = useState(null);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    if (!showResult) {
      setSelectedAnswer(answer);
      setShowResult(true);
      if (answer === triviaQuestions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = async () => {
    if (currentQuestion < triviaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameCompleted(true);
      const earnedReward = getRewardBasedOnScore(score);
      
      // Save results to SheetDB
      try {
        await saveToSheetDB(10, 'trivia', {
          answers,
          totalQuestions: triviaQuestions.length,
          score,
          reward: {
            name: earnedReward.title,
            description: earnedReward.description,
            emoji: earnedReward.emoji
          },
          questionResults: Object.entries(answers).map(([questionIndex, answer]) => ({
            question: triviaQuestions[questionIndex].question,
            userAnswer: answer,
            correctAnswer: triviaQuestions[questionIndex].correctAnswer,
            isCorrect: answer === triviaQuestions[questionIndex].correctAnswer
          }))
        });
        console.log('Trivia results saved successfully');
      } catch (error) {
        console.error('Error saving trivia results:', error);
      }

      // Set reward and complete game
      setReward(earnedReward);
    }
  };

  const getRewardBasedOnScore = (score) => {
    if (score === 5) return rewards.perfect;
    if (score === 4) return rewards.excellent;
    if (score === 3) return rewards.good;
    if (score === 2) return rewards.okay;
    return rewards.try_again;
  };

  const handleAnswerSubmit = async (answer) => {
    try {
      await saveToSheetDB(10, 'trivia', {
        questionId: currentQuestion,
        answer,
        isCorrect: answer === triviaQuestions[currentQuestion].correctAnswer,
        score
      });
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  if (gameCompleted) {
    const earnedReward = getRewardBasedOnScore(score);
    return (
      <TriviaContainer>
        <ScoreDisplay>
          <h2>Quiz Completed! 🎉</h2>
          <p>Your Score: {score} out of {triviaQuestions.length}</p>
          <p>Scratch below to reveal your reward!</p>
        </ScoreDisplay>
        <div style={{ marginTop: '2rem' }}>
          <ScratchCard 
            rewards={[earnedReward]}
          />
        </div>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3>Your Answers:</h3>
          {Object.entries(answers).map(([questionIndex, answer]) => {
            const question = triviaQuestions[questionIndex];
            const isCorrect = answer === question.correctAnswer;
            return (
              <div 
                key={questionIndex}
                style={{
                  margin: '1rem 0',
                  padding: '1rem',
                  background: isCorrect ? '#e8f5e9' : '#ffebee',
                  borderRadius: '8px',
                  color: isCorrect ? '#2e7d32' : '#c62828'
                }}
              >
                <p><strong>Q{Number(questionIndex) + 1}:</strong> {question.question}</p>
                <p>Your answer: {answer}</p>
                {!isCorrect && <p>Correct answer: {question.correctAnswer}</p>}
              </div>
            );
          })}
        </div>
      </TriviaContainer>
    );
  }

  const question = triviaQuestions[currentQuestion];

  return (
    <TriviaContainer>
      <ScoreDisplay>
        Question {currentQuestion + 1} of {triviaQuestions.length}
      </ScoreDisplay>
      <Question>
        <QuestionText>{question.question}</QuestionText>
        <Options>
          {question.options.map((option, index) => (
            <Option
              key={index}
              onClick={() => handleAnswer(option)}
              $selected={selectedAnswer === option}
              $showResult={showResult}
              $isCorrect={showResult && option === question.correctAnswer}
              disabled={showResult}
            >
              {option}
            </Option>
          ))}
        </Options>
        {showResult && (
          <NextButton onClick={handleNext}>
            {currentQuestion < triviaQuestions.length - 1 ? 'Next Question' : 'See Reward'}
          </NextButton>
        )}
      </Question>
    </TriviaContainer>
  );
}

export default TriviaGame; 