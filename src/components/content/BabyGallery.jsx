import React, { useState } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const PhotoCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  aspect-ratio: 1;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Caption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  text-align: center;

  ${PhotoCard}:hover & {
    transform: translateY(0);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const babyPhotos = [
  {
    url: "URL_TO_BABY_PHOTO_1",
    caption: "Baby Saif 👶",
    year: "1995"
  },
  {
    url: "URL_TO_BABY_PHOTO_2",
    caption: "Baby Zoya 🎀",
    year: "1998"
  },
  // Add more baby photos here
];

function BabyGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <GalleryContainer>
      <PhotoGrid>
        {babyPhotos.map((photo, index) => (
          <PhotoCard key={index} onClick={() => setSelectedPhoto(photo)}>
            <Photo src={photo.url} alt={photo.caption} loading="lazy" />
            <Caption>
              <div>{photo.caption}</div>
              <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{photo.year}</div>
            </Caption>
          </PhotoCard>
        ))}
      </PhotoGrid>

      {selectedPhoto && (
        <Modal onClick={() => setSelectedPhoto(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedPhoto(null)}>&times;</CloseButton>
            <ModalImage src={selectedPhoto.url} alt={selectedPhoto.caption} />
          </ModalContent>
        </Modal>
      )}
    </GalleryContainer>
  );
}

export default BabyGallery; 