import React, { useState } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const ImageCard = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    display: block;
    padding-top: 100%; // Square aspect ratio
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
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

  ${ImageCard}:hover & {
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

function Gallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <GalleryContainer>
        {images.map((image, index) => (
          <ImageCard key={index} onClick={() => setSelectedImage(image)}>
            <Image src={image.url} alt={image.caption} loading="lazy" />
            <Caption>
              <div>{image.caption}</div>
              {image.date && (
                <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {new Date(image.date).toLocaleDateString()}
                </div>
              )}
            </Caption>
          </ImageCard>
        ))}
      </GalleryContainer>

      {selectedImage && (
        <Modal onClick={() => setSelectedImage(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedImage(null)}>&times;</CloseButton>
            <ModalImage src={selectedImage.url} alt={selectedImage.caption} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default Gallery; 