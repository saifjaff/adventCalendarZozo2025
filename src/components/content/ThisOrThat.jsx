import React, { useState } from 'react';
import styled from 'styled-components';
import { saveToSheetDB } from '../../utils/sheetDB';

const ChoiceContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
  max-width: 800px;
  margin: 2rem auto;
`;

const Choice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: ${props => {
    if (!props.$submitted) {
      return props.$selected ? '#e3f2fd' : '#f8f9fa';
    }
    if (props.$isMatch) {
      return '#e8f5e9';  // Green background for matches
    }
    if (props.$selected || props.$isCorrect) {
      return '#ffebee';  // Red background for mismatches
    }
    return '#f8f9fa';
  }};
  border: 2px solid ${props => {
    if (!props.$submitted) {
      return props.$selected ? '#2196F3' : 'transparent';
    }
    if (props.$isMatch) {
      return '#4CAF50';  // Green border for matches
    }
    if (props.$selected || props.$isCorrect) {
      return '#f44336';  // Red border for mismatches
    }
    return 'transparent';
  }};
  
  &:hover {
    transform: ${props => props.$submitted ? 'none' : 'translateY(-5px)'};
  }
`;

const SubmitButton = styled.button`
  margin: 2rem auto;
  padding: 1rem 2rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;

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

const ComparisonSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
`;

const ResultRow = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CategoryTitle = styled.h3`
  text-align: center;
  color: #2196F3;
  margin-bottom: 1rem;
`;

const ChoicesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
  text-align: center;
`;

const PersonChoice = styled.div`
  padding: 0.8rem;
  background: ${props => props.$isMatch ? '#e8f5e9' : '#f5f5f5'};
  border-radius: 8px;
  font-weight: ${props => props.$isMatch ? 'bold' : 'normal'};
  color: ${props => props.$isMatch ? '#2e7d32' : '#333'};
`;

const Versus = styled.div`
  font-weight: bold;
  color: #9e9e9e;
`;

const ChoiceImage = styled.div`
  position: relative;
  width: 60%;
  padding-bottom: 60%;
  border-radius: 8px;
  margin: 0 auto 1rem auto;
  overflow: hidden;
  background-color: #e0e0e0;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #f8f9fa;
  }

  &::after {
    content: ${props => props.$placeholder || "'🖼️'"};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    color: #9e9e9e;
    display: ${props => props.$image ? 'none' : 'block'};
  }
`;

const choices = [
  {
    category: "Dream House Style",
    options: [
      { 
        text: "Modern House 🏢",
        image: "/images/day17/modernhome.jpg",
        placeholder: "'🏢'"
      },
      { 
        text: "Victorian House 🏰",
        image: "/images/day17/Victorian_Home.jpeg",
        placeholder: "'🏰'"
      }
    ],
    yourChoice: "Modern House 🏢"
  },
  {
    category: "Dream Car",
    options: [
      { 
        text: "Luxury Car 🚘",
        image: "/images/day17/luxury car.png",
        placeholder: "'🚘'"
      },
      { 
        text: "Sports Car 🏎️",
        image: "/images/day17/Sportscard.jpg",
        placeholder: "'🏎️'"
      }
    ],
    yourChoice: "Luxury Car 🚘"
  },
  {
    category: "Adventure Preference",
    options: [
      { 
        text: "Beach Paradise 🏖️",
        image: "/images/day17/beachvacation.png",
        placeholder: "'🏖️'"
      },
      { 
        text: "Mountain Trek ⛰️",
        image: "/images/day17/adventure.jpg",
        placeholder: "'⛰️'"
      }
    ],
    yourChoice: "Beach Paradise 🏖️"
  },
  {
    category: "Home Decor Style",
    options: [
      { 
        text: "Chic & Modern ✨",
        image: "/images/day17/chich.png",
        placeholder: "'✨'"
      },
      { 
        text: "Cozy & Warm 🛋️",
        image: "/images/day17/cozy.jpg",
        placeholder: "'🛋️'"
      }
    ],
    yourChoice: "Chic & Modern ✨"
  },
  {
    category: "Perfect Date",
    options: [
      { 
        text: "Fancy Restaurant 🍷",
        image: "/images/day17/fancy.jpeg",
        placeholder: "'🍷'"
      },
      { 
        text: "Cozy Home Date 🏠",
        image: "/images/day17/cozy.jpg",
        placeholder: "'🏠'"
      }
    ],
    yourChoice: "Cozy Home Date 🏠"
  }
];

function ThisOrThat() {
  const [selectedChoices, setSelectedChoices] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);

  const handleChoice = (category, choice) => {
    setSelectedChoices(prev => ({
      ...prev,
      [category]: choice
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedChoices).length === choices.length) {
      await saveToSheetDB(17, 'this_or_that', selectedChoices);
      setSubmitted(true);
      
      // Create results array
      const newResults = choices.map(item => ({
        category: item.category,
        yourChoice: item.yourChoice,
        theirChoice: selectedChoices[item.category]
      }));

      setResults(newResults);
    }
  };

  const allChoicesSelected = Object.keys(selectedChoices).length === choices.length;

  return (
    <div>
      {choices.map((item, index) => (
        <div key={index}>
          <h3>{item.category}</h3>
          <ChoiceContainer>
            {item.options.map((option, optIndex) => (
              <Choice
                key={optIndex}
                onClick={() => !submitted && handleChoice(item.category, option.text)}
                $selected={selectedChoices[item.category] === option.text}
                $submitted={submitted}
                $isMatch={submitted && selectedChoices[item.category] === option.text && option.text === item.yourChoice}
                $isCorrect={submitted && option.text === item.yourChoice}
              >
                <ChoiceImage 
                  $image={option.image}
                  $placeholder={option.placeholder}
                >
                  {option.image && <img src={option.image} alt={option.text} />}
                </ChoiceImage>
                <div>{option.text}</div>
                {submitted && (
                  <div style={{ 
                    marginTop: '0.5rem', 
                    color: option.text === item.yourChoice ? '#4CAF50' : '#f44336',
                    fontSize: '1.2rem'
                  }}>
                    {option.text === item.yourChoice ? '✓' : '✗'}
                  </div>
                )}
              </Choice>
            ))}
          </ChoiceContainer>
        </div>
      ))}

      {!submitted && (
        <SubmitButton 
          onClick={handleSubmit}
          disabled={!allChoicesSelected}
        >
          Submit My Choices 💝
        </SubmitButton>
      )}

      {submitted && (
        <ComparisonSection>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Saify vs Zoey 💝</h2>
          {results.map((result, index) => (
            <ResultRow key={index}>
              <CategoryTitle>{result.category}</CategoryTitle>
              <ChoicesContainer>
                <PersonChoice $isMatch={result.yourChoice === result.theirChoice}>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Saify</div>
                  {result.yourChoice}
                </PersonChoice>
                <Versus>VS</Versus>
                <PersonChoice $isMatch={result.yourChoice === result.theirChoice}>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Zoey</div>
                  {result.theirChoice || '...'}
                </PersonChoice>
              </ChoicesContainer>
              {result.yourChoice === result.theirChoice && (
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '1rem',
                  color: '#4CAF50',
                  fontWeight: 'bold'
                }}>
                  Perfect Match! 💝
                </div>
              )}
            </ResultRow>
          ))}
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            Let's see how our choices align! 💝
          </p>
        </ComparisonSection>
      )}
    </div>
  );
}

export default ThisOrThat; 