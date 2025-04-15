import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, IconButton, Container, Stack, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../Contexts/cartContext';
import { WishlistContext } from '../Contexts/wishlistContext';
import { useTranslation } from 'react-i18next';
import sportsData from '../sports_products.json';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductDetail = () => {
  const { cart, addProductToCart, removeSpecificItem } = useContext(CartContext);
  const { wishlist, toggleWishlist, isProductInWishlist } = useContext(WishlistContext);
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const language = i18n.language;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const product = sportsData.products.find(item => item.id.toString() === id);
    setProduct(product);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addProductToCart(product);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      toggleWishlist(product);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f3f7f7', py: 4 }}>
      <Container maxWidth="lg">
        {!product ? (
          <Box
            className="m-4 md:m-0 md:my-10 flex flex-col items-center gap-y-4 rounded-md p-5 bg-slate-200"
          >
            <Typography variant="h6" align="center">
              {t('product.notFound')}
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
              {t('product.backToHome')}
            </Box>
          </Box>
        ) : (
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'stretch',
                gap: 4,
                bgcolor: 'white',
                borderRadius: '16px',
                px: 4,
                py: 4,
                position: 'relative',
                width: '100%',
              }}
            >
            

              <Box
                component="img"
                src={product.image}
                alt={product.title[language] || t('product.noTitle')}
                sx={{
                  width: 300,
                  height: 300,
                  borderRadius: '16px',
                  objectFit: 'contain',
                  flexShrink: 0,
                }}
              />

              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Typography fontWeight="bold" fontSize="1.5rem">
                    {product.title[language] || t('product.noTitle')}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {product.category[language]} |{' '}
                    <span style={{ color: product.isBestSeller ? 'green' : 'red' }}>
                      {product.isBestSeller ? t('cart.bestSeller') : t('cart.newProduct')}
                    </span>
                  </Typography>

                  <Typography sx={{ mt: 2 }}>
                    {product.description?.[language] || t('product.noDescription')}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <Typography fontSize={14}>{t('rate')} :</Typography>
                    <StarIcon sx={{ fontSize: 18, color: '#facc15' }} />
                    <Typography fontSize={14}>
                      {product?.rating?.rate || product?.rate ? product?.rating?.rate || product?.rate : t('product.noRating')}
                    </Typography>
                  </Box>

                  <Typography sx={{ mt: 2 }}>
                    {t('price')}:{' '}
                    <Typography component="span" sx={{ color: '#0299e2' }}>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                    </Typography>
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    color="primary"
                    sx={{ flex: 1 }}
                  >
                    {t('add_to_cart')}
                  </Button>
                  <IconButton
                    onClick={handleAddToWishlist}
                    color={isProductInWishlist(product) ? 'error' : 'default'}
                    sx={{ fontSize: 32 }}
                    aria-label={t('wishlist.addToWishlist')}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetail;
