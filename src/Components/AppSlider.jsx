// استبدل محتوى الملف AppSlider.js بـ:

import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AppSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://wayupsports.com/cdn/shop/files/adidas_new_arrivals_main_banner.jpg?v=1744020941&width=1800',
      title: 'Summer Collection',
      description: 'Discover our new summer arrivals with 30% discount'
    },
    {
      image: 'https://wayupsports.com/cdn/shop/files/Nike_4_b2d141dc-c24b-4ac9-b6c2-cfcbceb9b925.jpg?v=1743079742&width=1800',
      title: 'Winter Essentials',
      description: 'Stay warm with our premium winter collection'
    },
    {
      image: 'https://wayupsports.com/cdn/shop/files/speedo.jpg?v=1743081267&width=1800',
      title: 'Spring Fashion',
      description: 'Fresh styles for the new season'
    },
    {
      image: 'https://www.intersport.com.eg/cdn/shop/files/ADIDAS.png?v=1744309761&width=2000',
      title: 'Autumn Specials',
      description: 'Cozy outfits for fall days'
    },
    {
      image: 'https://www.adidas.com.eg/dw/image/v2/BFNL_PRD/on/demandware.static/-/Library-Sites-AdidasSharedLibrary/default/dwef2abe37/MENA_Local_Activations/MENA-APR-MAY-JUNE/emc-theoriginal_rev-originals-ss25-hp-mh-d.jpg',
      title: 'Autumn Specials',
      description: 'Cozy outfits for fall days'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
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
      height: { xs: '45vh', md: '75vh' },
      overflow: 'hidden',
      borderRadius: 3,
      boxShadow: 4,
      backgroundColor: '#f5f5f5',
    }}>
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
            }}
          >
            <Box
              component="img"
              src={slide.image}
              alt={`Slide ${index + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              p: 3,
              textAlign: 'center',
              backdropFilter: 'blur(3px)',
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

      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0,0,0,0.6)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.9)'
          },
          zIndex: 2
        }}
      >
        <ArrowBackIosIcon fontSize="medium" />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0,0,0,0.6)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.9)'
          },
          zIndex: 2
        }}
      >
        <ArrowForwardIosIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default AppSlider;
