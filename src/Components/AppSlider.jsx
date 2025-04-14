import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AppSlider = () => {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: './img/slider1.jpg',
      title: 'Summer Collection',
      description: 'Discover our new summer arrivals with 30% discount'
    },
    {
      image: './img/slider2.jpg',
      title: 'Winter Essentials',
      description: 'Stay warm with our premium winter collection'
    },
    {
      image: './img/slider3.jpg',
      title: 'Spring Fashion',
      description: 'Fresh styles for the new season'
    },
    {
      image: './img/slider4.jpg',
      title: 'Autumn Specials',
      description: 'Cozy outfits for fall days'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: { xs: '50vh', md: '80vh' },
      overflow: 'hidden',
      borderRadius: 2,
      boxShadow: 3,
      backgroundColor: '#f5f5f5', // خلفية احتياطية إذا كانت الصورة غير موجودة
    }}>
      {/* Slides container */}
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        transition: 'transform 0.5s ease-in-out',
        transform: `translateX(-${currentSlide * 100}%)`
      }}>
        {slides.map((slide, index) => (
          <Box 
            key={index}
            sx={{
              minWidth: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Image container with proper scaling */}
            <Box
              component="img"
              src={slide.image}
              alt={`Slide ${index + 1}`}
              sx={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain', // تغيير من 'cover' إلى 'contain'
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
            
            {/* Caption overlay */}
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              p: 3,
              textAlign: 'center',
              backdropFilter: 'blur(2px)',
              zIndex: 1
            }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                {slide.title}
              </Typography>
              <Typography variant="h6">
                {slide.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Navigation buttons */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0,0,0,0.5)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.8)'
          },
          zIndex: 2
        }}
      >
        <ArrowBackIosIcon fontSize="large" />
      </IconButton>
      
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0,0,0,0.5)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.8)'
          },
          zIndex: 2
        }}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>

      {/* Slide indicators */}
      <Box sx={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 1.5,
        zIndex: 2
      }}>
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: currentSlide === index ? theme.palette.primary.main : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.2)'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AppSlider;