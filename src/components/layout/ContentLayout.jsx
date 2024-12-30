import React from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useUnlock } from '../../context/UnlockContext';
import { isPageUnlocked, DAY_CONTENT } from '../../utils/dateUtils';

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ContentHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const ContentBody = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

function ContentLayout({ dayNumber, children }) {
  const { masterUnlock } = useUnlock();
  const content = DAY_CONTENT[dayNumber];
  const isUnlocked = masterUnlock || isPageUnlocked(dayNumber);

  if (!isUnlocked) {
    return <Navigate to="/" replace />;
  }

  return (
    <ContentContainer>
      <ContentHeader>
        <h1>
          <span>{content.icon}</span>
          <span>Day {dayNumber}</span>
        </h1>
      </ContentHeader>
      <ContentBody>
        {children}
      </ContentBody>
    </ContentContainer>
  );
}

export default ContentLayout; 