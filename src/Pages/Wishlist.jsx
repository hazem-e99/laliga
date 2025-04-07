import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  Container,
} from '@mui/material';
import { Star, ShoppingCart, Delete, ClearAll } from '@mui/icons-material';

const initialProducts = [
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

const Wishlist = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleRemove = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setProducts([]);
  };

  return (
    <Box sx={{ bgcolor: '#f3f7f7', py: 4 }}>
      <Container maxWidth="md">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
          mb={4}
        >
          <Typography variant="h5" fontWeight="bold">
            Favorite Products
          </Typography>
          {products.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<ClearAll />}
              sx={{
                borderRadius: '12px',
                borderWidth: 2,
                fontWeight: 500,
                textTransform: 'none',
              }}
              onClick={handleClearAll}
            >
              Remove All
            </Button>
          )}
        </Stack>

        {products.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No favorite products yet.
          </Typography>
        ) : (
          products.map((product) => (
            <Box
              key={product.id}
              sx={{
                bgcolor: 'white',
                borderRadius: '16px',
                p: 2,
                mb: 3,
                boxShadow: '0px 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2} alignItems="center" flex={1}>
                  <Avatar
                    variant="rounded"
                    src={product.imageCover}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box>
                    <Typography fontWeight="bold" fontSize="1.1rem">
                      {product.title}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      <Typography fontSize={14}>Rate:</Typography>
                      <Star sx={{ fontSize: 18, color: '#facc15' }} />
                      <Typography fontSize={14}>{product.rate}</Typography>
                    </Box>

                    <Typography fontWeight="bold" sx={{ color: '#0299e2', mt: 0.5 }}>
                      Price: EGP {product.price}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {product.category} | {product.brand} |{' '}
                      <Typography
                        component="span"
                        color={product.available ? 'green' : 'red'}
                        fontWeight="500"
                      >
                        {product.available ? 'Available' : 'Unavailable'}
                      </Typography>
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1} mt={{ xs: 2, sm: 0 }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    sx={{
                      borderRadius: '50px',
                      backgroundColor: '#0299e2',
                      textTransform: 'none',
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    sx={{ borderRadius: '50px', textTransform: 'none' }}
                    onClick={() => handleRemove(product.id)}
                  >
                    Remove
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
};

export default Wishlist;
