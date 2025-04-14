import React, { useContext } from 'react';
import { Box, Typography, Avatar, Button, Stack, Container } from '@mui/material';
import { Star, ShoppingCart, Delete, ClearAll } from '@mui/icons-material';
import { WishlistContext } from '../Contexts/wishlistContext';
import { CartContext } from '../Contexts/cartContext';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Wishlist = () => {
  const { t, i18n } = useTranslation(); // استخدم i18n للوصول إلى اللغة الحالية
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addProductToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <Box sx={{ bgcolor: '#f3f7f7', py: 4 }}>
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h5" fontWeight="bold">{t('favorite_product')}</Typography>
          {wishlist.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<ClearAll />}
              sx={{ borderRadius: '12px', borderWidth: 2 }}
              onClick={clearWishlist}
            >
              {t('remove_all')}
            </Button>
          )}
        </Stack>

        {wishlist.length === 0 ? (
          <Box className='m-4 md:m-0 md:my-10 flex flex-col items-center gap-y-4 rounded-md p-5 bg-slate-200'>
            <h2>{t('wishlist_empty_message')}</h2>
            <NavLink 
              to='/' 
              className="btn bg-blue-600 w-fit text-white hover:bg-blue-800"
              sx={{
                backgroundColor: '#1d4ed8', 
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: '#1e40af'
                }
              }}
            >
              {t('back_to_home')}
            </NavLink>
          </Box>
        ) : (
          wishlist.map((product, index) => (
            <Box key={index} sx={{
              bgcolor: 'white', 
              borderRadius: '16px', 
              p: 2, 
              mb: 3,
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              boxShadow: 2, 
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            }}>
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{
                  width: 160,
                  height: 160,
                  borderRadius: '16px',
                  objectFit: 'contain',
                }}
              />

              <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography fontWeight="bold" fontSize="1.2rem">
                  {product.title[i18n.language]} {/* استخدام اللغة الحالية لعرض العنوان */}
                </Typography>
                <Box sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  alignItems: 'center',
                  gap: 1,
                  mt: 0.5,
                }}>
                  <Typography fontSize={14}>{t('rate')}:</Typography>
                  <Star sx={{ fontSize: 18, color: '#facc15' }} />
                  <Typography fontSize={14}>{product?.rating?.rate || t('no_rating')}</Typography>
                </Box>

                <Typography sx={{ mt: 1 }}>
                  {t('price')}: 
                  <Typography component="span" sx={{ color: '#0299e2' }}>
                    $ {product.price}
                  </Typography>
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  sx={{ borderRadius: '50px', backgroundColor: '#0299e2' }}
                  onClick={() => handleAddToCart(product)}
                >
                  {t('add_to_cart')}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  sx={{ borderRadius: '50px' }}
                  onClick={() => removeFromWishlist(product.id)}
                >
                  {t('remove')}
                </Button>
              </Stack>
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
};

export default Wishlist;
