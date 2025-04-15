import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  useTheme 
} from '@mui/material';

const PromoSlide = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        textAlign: 'center',
        p: 6,
        background: `linear-gradient(135deg, ${theme.palette.error.light}, ${theme.palette.error.main})`,
        borderRadius: 2,
        boxShadow: 3,
        color: 'common.white',
      }}
    >
      <Typography 
        variant="h2" 
        component="h1"
        sx={{ 
          mb: 2,
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        عرض خاص
      </Typography>
      
      <Box
        sx={{
          bgcolor: 'background.paper',
          display: 'inline-block',
          px: 4,
          py: 1,
          borderRadius: 20,
          my: 2,
        }}
      >
        <Typography 
          variant="h3" 
          component="h2"
          sx={{ 
            color: 'error.main',
            fontWeight: 'bold',
          }}
        >
          25% خصم
        </Typography>
      </Box>
      
      <Typography variant="h6" sx={{ mt: 3 }}>
        استخدم كود الخصم: 
        <Box 
          component="span" 
          sx={{ 
            bgcolor: 'background.paper',
            color: 'error.main',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            ml: 1,
            fontWeight: 'bold',
          }}
        >
          SSS25
        </Box>
      </Typography>
      
      <Button
        variant="contained"
        sx={{
          mt: 3,
          px: 6,
          py: 1.5,
          borderRadius: 20,
          bgcolor: 'background.paper',
          color: 'error.main',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: 'background.default',
          }
        }}
      >
        تسوق الآن
      </Button>
      
      <Typography variant="caption" sx={{ mt: 4, display: 'block' }}>
        * الخصم على المنتجات كاملة السعر فقط | الشروط والأحكام تطبق
      </Typography>
    </Paper>
  );
};

export default PromoSlide;