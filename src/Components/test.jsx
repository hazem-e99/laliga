
// // import React, { useContext, useEffect } from 'react';
// // import { Box, Typography, IconButton, Container, Stack, Button } from '@mui/material';
// // import CloseIcon from '@mui/icons-material/Close';
// // import StarIcon from '@mui/icons-material/Star';
// // import { Link, useParams } from 'react-router-dom';
// // import { CartContext } from '../Contexts/cartContext';
// // import { useTranslation } from 'react-i18next';

// // const ProductDetail = () => {
// //   const { cart, addItemToCart, removeSpecificItem } = useContext(CartContext);
// //   const { t, i18n } = useTranslation();
// //   const { id } = useParams();  
// //   const language = i18n.language;

// //   // تحديد المنتج بناءً على المعرف
// //   const product = cart.find(item => item.id.toString() === id);

// //   useEffect(() => {
// //     console.log("المنتج المحدد:", product);
// //   }, [product]);

// //   return (
// //     <Box sx={{ bgcolor: '#f3f7f7', py: 4 }}>
// //       <Container maxWidth="lg">
// //         {!product ? (
// //           <Box
// //             className="m-4 md:m-0 md:my-10 flex flex-col items-center gap-y-4 rounded-md p-5 bg-slate-200"
// //           >
// //             <Typography variant="h6" align="center">
// //               {t('product.notFound')}
// //             </Typography>
// //             <Box
// //               component={Link}
// //               to="/"
// //               className="btn bg-primary-700 w-fit text-white hover:bg-primary-800"
// //               sx={{
// //                 px: 3,
// //                 py: 1,
// //                 borderRadius: '8px',
// //                 textDecoration: 'none',
// //                 color: 'white',
// //                 backgroundColor: '#1976d2',
// //                 '&:hover': {
// //                   backgroundColor: '#115293',
// //                 },
// //               }}
// //             >
// //               {t('product.backToHome')}
// //             </Box>
// //           </Box>
// //         ) : (
// //           <Stack spacing={3}>
// //             <Box
// //               sx={{
// //                 display: 'flex',
// //                 flexDirection: { xs: 'column', sm: 'column', md: 'row' },
// //                 alignItems: 'center',
// //                 gap: 2,
// //                 bgcolor: 'white',
// //                 borderRadius: '16px',
// //                 px: 2,
// //                 py: 2,
// //                 position: 'relative',
// //               }}
// //             >
// //               <IconButton
// //                 sx={{ position: 'absolute', top: 8, right: 8 }}
// //                 onClick={() => removeSpecificItem(product.id)}
// //                 aria-label={t('cart.removeItem')}
// //               >
// //                 <CloseIcon />
// //               </IconButton>

// //               <Box
// //                 component="img"
// //                 src={product.image}
// //                 alt={product.title[language] || t('product.noTitle')}
// //                 sx={{
// //                   width: 250,
// //                   height: 250,
// //                   borderRadius: '16px',
// //                   objectFit: 'contain',
// //                 }}
// //               />

// //               <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
// //                 <Typography fontWeight="bold" fontSize="1.5rem">
// //                   {product.title[language] || t('product.noTitle')}
// //                 </Typography>

// //                 <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
// //                   {product.category[language]} |{' '}
// //                   <span style={{ color: product.isBestSeller ? 'green' : 'red' }}>
// //                     {product.isBestSeller ? t('cart.bestSeller') : t('cart.newProduct')}
// //                   </span>
// //                 </Typography>

// //                 <Box
// //                   sx={{
// //                     display: 'flex',
// //                     justifyContent: { xs: 'center', sm: 'flex-start' },
// //                     alignItems: 'center',
// //                     gap: 1,
// //                     mt: 0.5,
// //                   }}
// //                 >
// //                   <Typography fontSize={14}>{t('rate')} :</Typography>
// //                   <StarIcon sx={{ fontSize: 18, color: '#facc15' }} />
// //                   <Typography fontSize={14}>
// //                     {product?.rating?.rate || product?.rate ? product?.rating?.rate || product?.rate : t('product.noRating')}
// //                   </Typography>
// //                 </Box>

// //                 <Typography sx={{ mt: 1 }}>
// //                   {t('price')}:{' '}
// //                   <Typography component="span" sx={{ color: '#0299e2' }}>
// //                     {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
// //                   </Typography>
// //                 </Typography>

// //                 <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
// //                   <Button
// //                     onClick={() => addItemToCart(product.id, 1)}
// //                     variant="contained"
// //                     color="primary"
// //                   >
// //                     {t('add_to_cart')}
// //                   </Button>
// //                 </Stack>
// //               </Box>
// //             </Box>
// //           </Stack>
// //         )}
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default ProductDetail;
// import {
//     Box,
//     Button,
//     Container,
//     Stack,
//     TextField,
//     Typography,
//     Paper,
//   } from '@mui/material';
//   import CreditCardIcon from '@mui/icons-material/CreditCard';
//   import { useNavigate } from 'react-router-dom';
//   import { useState } from 'react';
//   import { useContext } from 'react';
// import { CartContext } from '../Contexts/cartContext';
// import { useTranslation } from 'react-i18next';
//   const Payment = () => {
//     const navigate = useNavigate();
//     const [isPaid, setIsPaid] = useState(false);
//      const { t } = useTranslation(); 
//     const [cardNumber, setCardNumber] = useState('');
//     const [cardHolder, setCardHolder] = useState('');
//     const [expiry, setExpiry] = useState('');
//     const [cvv, setCvv] = useState('');
  
//     const [errors, setErrors] = useState({});
//     const { clearCart } = useContext(CartContext); 

//     const validate = () => {
//       const newErrors = {};
//       if (!/^\d{16}$/.test(cardNumber)) {
//         newErrors.cardNumber = 'Card number must be 16 digits';
//       }
//       if (cardHolder.trim().length < 3) {
//         newErrors.cardHolder = 'Enter full cardholder name';
//       }
//       if (!/^\d{2}\/\d{2}$/.test(expiry)) {
//         newErrors.expiry = 'Expiry must be in MM/YY format';
//       }
//       if (!/^\d{3,4}$/.test(cvv)) {
//         newErrors.cvv = 'CVV must be 3 or 4 digits';
//       }
//       return newErrors;
//     };
  
//     const handlePayment = () => {
//       const validationErrors = validate();
//       setErrors(validationErrors);
//       if (Object.keys(validationErrors).length === 0) {
//         setIsPaid(true);
//         clearCart(); 
//         setTimeout(() => {
//           navigate('/');
//         }, 2000);
//       }
//     };
  
//     return (
//       <Container maxWidth="sm" sx={{ mt: 6 }}>
//         <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
//           <Stack direction="row" spacing={1} alignItems="center" mb={3}>
//             <CreditCardIcon color="primary" />
//             <Typography variant="h6" fontWeight="bold">
//             {t('payment_details')}
//             </Typography>
//           </Stack>
  
//           {!isPaid ? (
//             <Box display="flex" flexDirection="column" gap={3}>
//           <TextField
//   label={t('card_number')}
//   placeholder={t('card_number_placeholder')}
//   helperText={errors.cardNumber && t('card_number_error')}
// />
  
// <TextField
//   label={t('card_holder_name')}
//   placeholder={t('card_holder_placeholder')}
//   helperText={errors.cardHolder && t('card_holder_error')}
// />
  
//               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
               
// <TextField
//   label={t('expiry_date')}
//   placeholder={t('expiry_placeholder')}
//   helperText={errors.expiry && t('expiry_error')}
// />
  
// <TextField
//   label={t('cvv')}
//   placeholder={t('cvv_placeholder')}
//   helperText={errors.cvv && t('cvv_error')}
// />
//               </Stack>
  
//               <Button
//                 variant="contained"
//                 color="success"
//                 size="large"
//                 sx={{ mt: 2 }}
//                 onClick={handlePayment}
//               >
//                  {t('pay_now')}
//               </Button>
//             </Box>
//           ) : (
//             <Box textAlign="center" mt={5}>
//               <Typography variant="h5" color="green" fontWeight="bold" mb={2}>
//               {t('payment_success')}
//               </Typography>
//               <Typography variant="body1">
//               {t('payment_thank_you')}
//               </Typography>
//             </Box>
//           )}
//         </Paper>
//       </Container>
//     );
//   };
  
//   export default Payment;
  