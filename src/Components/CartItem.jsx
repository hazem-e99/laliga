import React, { useContext } from 'react';
import { Box, Typography, IconButton, Container, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { CartContext } from '../Contexts/cartContext';
import { useTranslation } from 'react-i18next';

const CartItem = () => {
  const { cart, removeSpecificItem, updateItem } = useContext(CartContext);
  const { t, i18n } = useTranslation(); 
  const language = i18n.language;

  return (
    <Box sx={{ bgcolor: '#f3f7f7', py: 4 }}>
      <Container maxWidth="lg">
        {cart.length === 0 ? (
          <Box
            className="m-4 md:m-0 md:my-10 flex flex-col items-center gap-y-4 rounded-md p-5 bg-slate-200"
          >
            <Typography variant="h6" align="center">
              {t('cart.emptyMessage')}
            </Typography>
            <Box
              component={Link}
              to="/"
              className="btn bg-primary-700 w-fit text-white hover:bg-primary-800"
              sx={{
                px: 3,
                py: 1,
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'white',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              {t('cart.backToHome')}
            </Box>
          </Box>
        ) : (
          <Stack spacing={3}>
            {cart.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                    alignItems: 'center',
                    gap: 2,
                    bgcolor: 'white',
                    borderRadius: '16px',
                    px: 2,
                    py: 2,
                    position: 'relative',
                  }}
                >
                  <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={() => removeSpecificItem(item.id)}
                    aria-label={t('cart.removeItem')}
                  >
                    <CloseIcon />
                  </IconButton>

                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title[language] || t('cart.noTitle')}
                    sx={{
                      width: 160,
                      height: 160,
                      borderRadius: '16px',
                      objectFit: 'contain',
                    }}
                  />

                  <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography fontWeight="bold" fontSize="1.2rem">
                      {item.title[language] || t('cart.noTitle')}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {item.category[language]} |{' '}
                      <span style={{ color: item.isBestSeller ? 'green' : 'red' }}>
                        {item.isBestSeller ? t('cart.bestSeller') : t('cart.newProduct')}
                      </span>
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
                      <Typography fontSize={14}>{t('cart.rate')} :</Typography>
                      <StarIcon sx={{ fontSize: 18, color: '#facc15' }} />
                      <Typography fontSize={14}>
                        {item?.rating?.rate || item?.rate ? item?.rating?.rate || item?.rate : t('cart.noRating')}
                      </Typography>
                    </Box>

                    <Typography sx={{ mt: 1 }}>
                      {t('cart.price')}:{' '}
                      <Typography component="span" sx={{ color: '#0299e2' }}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                      </Typography>
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton
                      onClick={() => updateItem(item.id, item.count - 1)}
                      disabled={item.count === 1}
                      aria-label={t('cart.decreaseQuantity')}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.count}</Typography>
                    <IconButton
                      onClick={() => updateItem(item.id, item.count + 1)}
                      aria-label={t('cart.increaseQuantity')}
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>

                  <Box sx={{ minWidth: 100, textAlign: 'center' }}>
                    <Typography fontSize={14}>{t('cart.totalPrice')}</Typography>
                    <Typography color="#0299e2">
                      EGP {(item.price * item.count).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default CartItem;
