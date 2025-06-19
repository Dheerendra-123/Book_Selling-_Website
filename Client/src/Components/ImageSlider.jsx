import React, { useState } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ImageSlider = ({ bookData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = bookData.images || [];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Box position="relative" display="inline-block">
        {images.length > 0 && (
          <Paper
            elevation={1}
            component="img"
            src={images[currentIndex]}
            alt={`previewImg-${currentIndex}`}
            sx={{
              height: 400,
              width: 600,
              objectFit: 'fill',
              borderRadius: 2
            }}
          />
        )}

        {/* Navigation Buttons */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
          }}
        >
          <ArrowBackIcon sx={{ fontSize: '35px', color: '#1976D2' }} />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
          }}
        >
          <ArrowForwardIcon sx={{ fontSize: '35px', color: '#1976D2' }} />
        </IconButton>

        {/* Image Counter */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 15,
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          {currentIndex + 1} / {images.length}
        </Box>
      </Box>

      {/* Thumbnail Preview */}
      <Box mt={2} width={600}>
        <Stack direction="row" spacing={1} justifyContent="center">
          {images.map((image, thumbIndex) => (
            <Paper
              key={thumbIndex}
              component="img"
              src={image}
              alt={`thumbnail-${thumbIndex}`}
              onClick={() => handleThumbnailClick(thumbIndex)}
              sx={{
                width: 70,
                height: 50,
                objectFit: 'cover',
                cursor: 'pointer',
                border: currentIndex === thumbIndex ? '3px solid #1976D2' : '2px solid transparent',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 2
                }
              }}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default ImageSlider;
