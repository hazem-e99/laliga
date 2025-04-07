import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Container,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

const CartItem = () => {
  const cartItems = [
    {
      id: '1',
      title: 'Adidas Al Rihla Match Ball',
      brand: 'Adidas',
      category: 'Football Equipment',
      price: 1699,
      rate: 4.7,
      available: true,
      imageCover:
        'https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/26/306982/1.jpg?1054',
      count: 1,
    },
    {
      id: '2',
      title: 'SoccerBibl',
      brand: 'Nike',
      category: 'Football Apparel',
      price: 499,
      rate: 4.3,
      available: true,
      imageCover:
        'https://www.soccerbible.com/media/167546/ifktab-min.jpg',
      count: 1,
    },
    {
      id: '3',
      title: 'adidas unisex-adult X CRAZYFAST.3 FG Sneaker',
      brand: 'Adidas',
      category: 'Football Shoes',
      price: 1199,
      rate: 4.5,
      available: false,
      imageCover:
        'https://contents.mediadecathlon.com/p2293034/7ee706b92957b5bc87d6b7683989722b/p2293034.jpg?format=auto&quality=70&f=768x0',
      count: 1,
    },
  ];

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return (
    <Box sx={{ bgcolor: '#f3f7f7', py: 4 }}>
      <Container maxWidth="lg">
     

        {/* Cart Items */}
        <Stack spacing={3}>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 2,
                bgcolor: 'white',
                borderRadius: '16px',
                px: 2,
                py: 2,
                position: 'relative',
              }}
            >
              {/* زر الحذف */}
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* صورة المنتج */}
              <Box
                component="img"
                src={item.imageCover}
                alt={item.title}
                sx={{
                  width: 160,
                  height: 160,
                  borderRadius: '16px',
                  objectFit: 'contain',
                  alignSelf: 'center',
                }}
              />

              {/* معلومات المنتج */}
              <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography fontWeight="bold" fontSize="1.2rem">
                  {item.title}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                    alignItems: 'center',
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <Typography fontSize={14}>Rate :</Typography>
                  <StarIcon sx={{ fontSize: 18, color: '#facc15' }} />
                  <Typography fontSize={14}>{item.rate}</Typography>
                </Box>

                <Typography sx={{ mt: 1 }}>
                  Price:{' '}
                  <Typography component="span" sx={{ color: '#0299e2' }}>
                    EGP {item.price}
                  </Typography>
                </Typography>

                <Typography sx={{ mt: 1, fontSize: 14, color: '#666' }}>
                  {item.category} | {item.brand} |{' '}
                  <Typography component="span" sx={{ color: item.available ? 'green' : 'red' }}>
                    {item.available ? 'Available' : 'Out of Stock'}
                  </Typography>
                </Typography>
              </Box>

              {/* تحكم الكمية */}
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.count}</Typography>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Stack>

              {/* إجمالي السعر */}
              <Box sx={{ minWidth: 100, textAlign: 'center' }}>
                <Typography fontSize={14}>Total Price</Typography>
                <Typography color="#0299e2">EGP {item.price * item.count}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default CartItem;
