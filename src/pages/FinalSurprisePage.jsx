import React from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useUnlock } from '../context/UnlockContext';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const SurpriseContent = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: #f8f8f8;
  border-radius: 8px;
`;

function FinalSurprisePage() {
  const { unlockedPages } = useUnlock();

  // Redirect if not all pages are unlocked
  if (unlockedPages.length < 18) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageContainer>
      <h1>🎉 Congratulations! 🎉</h1>
      <SurpriseContent>
        <h2>You've Unlocked the Final Surprise!</h2>
        {/* Placeholder for final surprise content */}
        <div className="video-section">
          <h3>Final Video Message</h3>
          <div className="video-placeholder">
            {/* Video embed will go here */}
          </div>
        </div>
      </SurpriseContent>
    </PageContainer>
  );
}

export default FinalSurprisePage; 