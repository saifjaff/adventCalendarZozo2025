import React, { useState } from 'react';
import styled from 'styled-components';
import { saveToSheetDB } from '../../utils/sheetDB';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Question = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const QuestionText = styled.h3`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
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
  
  &:hover {
    background: ${props => props.$showResult ? 'none' : '#f5f5f5'};
  }
`;

const Result = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
  color: ${props => props.$correct ? '#4CAF50' : '#f44336'};
  font-weight: bold;
  font-size: 1.1rem;
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
  
  &:hover {
    background: #1976D2;
  }
`;

const ScoreDisplay = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  color: #333;
`;

const calculateScore = (answers, questions) => {
  return Object.entries(answers).reduce((score, [questionIndex, answer]) => {
    if (answer === questions[questionIndex].correctAnswer) {
      return score + 1;
    }
    return score;
  }, 0);
};

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    if (!showResult) {
      setSelectedAnswer(answer);
      setShowResult(true);
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: answer
      }));
      if (answer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      try {
        const result = await saveToSheetDB(2, 'quiz', {
          answers,
          totalQuestions: questions.length,
          correctAnswers: score,
          completed: true
        });

        if (result) {
          console.log('Quiz results saved successfully');
        } else {
          console.error('Failed to save quiz results');
        }
      } catch (error) {
        console.error('Error saving quiz results:', error);
      }
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <QuizContainer>
        <ScoreDisplay>
          <h2>Quiz Completed! 🎉</h2>
          <p>Your Score: {score} out of {questions.length}</p>
          {score === questions.length && <p>Perfect Score! 🌟</p>}
        </ScoreDisplay>
      </QuizContainer>
    );
  }

  const question = questions[currentQuestion];

  return (
    <QuizContainer>
      <ScoreDisplay>
        Question {currentQuestion + 1} of {questions.length}
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
          <>
            <Result $correct={selectedAnswer === question.correctAnswer}>
              {selectedAnswer === question.correctAnswer ? 
                '✨ Correct! ✨' : 
                `Incorrect! The right answer was: ${question.correctAnswer}`}
            </Result>
            <NextButton onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </NextButton>
          </>
        )}
      </Question>
    </QuizContainer>
  );
}

export default Quiz; 